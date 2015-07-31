/*! checkpoint.js - v0.1.0 - 2015-07-31
* https://github.com/Ultrabenosaurus/checkpoint
* Copyright (c) 2015 Dan Bennett; Licensed BSD-3-Clause */
var chConf = {
	markerWidth: 20,
	markerHeight: 5,
	headers: {
		h1: "#5ebef9",
		h2: "#2daaf7",
		h3: "#0993e8",
		h4: "#0774b7",
		h5: "#055586",
		h6: "#033655"
	},
	scrollerColour: "#000"
};

function chSizer( conf ) {
	this.config = conf;
};

chSizer.prototype.findBrowserHeight = function() {
	h = false;
	if( typeof window.innerHeight != 'undefined' ) {
		h = window.innerHeight;
	} else if( typeof document.documentElement != 'undefined' && typeof document.documentElement.clientHeight != 'undefined' && document.documentElement.clientHeight != 0 ){
		h = document.documentElement.clientHeight;
	} else {
		h = document.getElementsByTagName('body')[0].clientHeight;
	}

	return h;
};

chSizer.prototype.findPageHeight = function() {
	h = false;
	if( typeof document.body != 'undefined' && typeof document.body.scrollHeight != undefined ){
		h = Math.max( document.body.scrollHeight, document.documentElement.scrollHeight );
	} else {
		b = document.getElementsByTagName('body')[0];
		d = document.getElementsByTagName('html')[0];
		h = Math.max( b.scrollHeight, d.scrollHeight );
	}

	return h;
};

chSizer.prototype.hasResized = function() {
	if( checkpoint.config.browserHeight != this.findBrowserHeight() || checkpoint.config.pageHeight != this.findPageHeight() ) {
		checkpoint.config.browserHeight = this.findBrowserHeight();
		checkpoint.config.pageHeight = this.findPageHeight();
		return true;
	}
	return false;
};

function chFinder( conf ) {
	this.config = conf;
};

chFinder.prototype.findHeaders = function( pattern ) {
	return document.querySelectorAll( pattern );
};

chFinder.prototype.findHeaderOffsets = function( headers ) {
	h = [];
	for (var i = headers.length - 1; i >= 0; i--) {
		h[i] = headers[i].offsetTop;
	};

	return h;
}

chFinder.prototype.findAllOffsets = function() {
	patts =  this.config.headers;
	offs = {};
	for( pattern in patts ) {
		if( patts.hasOwnProperty( pattern ) ) {
			f = this.findHeaders( pattern );
			offs[pattern] = this.findHeaderOffsets( f );
		}
	};

	return offs;
};

function chCalculator( conf ) {
	this.config = conf;
};

chCalculator.prototype.calcModifier = function() {
	return ( this.config.browserHeight / this.config.pageHeight );
};

chCalculator.prototype.calcMarkerPos = function( offs ) {
	m = [];
	for (var i = offs.length - 1; i >= 0; i--) {
		m[i] = Math.ceil( offs[i] * this.config.modifier );
	};

	return m;
};

chCalculator.prototype.calcAllMarkerPos = function() {
	offsets = this.config.offsets;
	marks = {};
	for( pattern in offsets ) {
		if( offsets.hasOwnProperty( pattern ) ) {
			marks[pattern] = this.calcMarkerPos( offsets[pattern] );
		}
	};

	return marks;
};

chCalculator.prototype.calcScrollerHeight = function() {
	return Math.ceil( this.config.modifier * this.config.browserHeight );
};

chCalculator.prototype.calcScrollerPos = function( pos ) {
	return Math.ceil( this.config.modifier * pos );
};

function chPainter( conf ) {
	this.config = conf;
	this.b = ( ( typeof document.body != 'undefined' ) ? document.body : document.getElementsByTagName('body')[0] );
	this.c;
};

chPainter.prototype.paintContainer = function() {
	c = document.createElement( "div" );
	c.id = "chContainer";

	c.style.position = "fixed";
	c.style.top = 0;
	c.style.right = 0;
	c.style.width = this.config.markerWidth + "px";
	c.style.height = this.config.browserHeight + "px";

	this.b.appendChild( c );
	this.c = c;
	return c;
};

chPainter.prototype.paintMarker = function( offset, colour ) {
	m = document.createElement( "div" );
	m.className += " chMarker"

	m.style.position = "absolute";
	m.style.backgroundColor = colour;
	m.style.right = 0;
	m.style.top = offset + "px";
	m.style.width = this.config.markerWidth + "px";
	m.style.height = this.config.markerHeight + "px";

	this.c.appendChild( m );
	return m;
};

chPainter.prototype.paintHeader = function( pattern ) {
	headers =  this.config.headers;
	markers =  this.config.markers;
	for(var i = markers[pattern].length - 1; i >= 0; i--) {
		this.paintMarker( markers[pattern][i], headers[pattern] );
	};
};

chPainter.prototype.paintAllHeaders = function() {
	headers =  this.config.headers;
	for( pattern in headers ) {
		if( headers.hasOwnProperty( pattern ) ) {
			this.paintHeader( pattern );
		}
	};
};

chPainter.prototype.removeMarkers = function() {
	markers = document.querySelectorAll(".chMarker");
	for( var i = markers.length - 1; i >= 0; i-- ) {
		this.c.removeChild( markers[i] );
	};
};

chPainter.prototype.paintScroller = function( pos ) {
	s = document.createElement( "div" );
	s.id = "chScroller"

	s.style.position = "absolute";
	s.style.backgroundColor = this.config.scrollerColour;
	s.style.opacity = "0.5";
	s.style.right = 0;
	s.style.top = pos + "px";
	s.style.width = this.config.markerWidth + "px";
	s.style.height = this.config.scrollerHeight + "px";
	s.style.zIndex = "-1";

	this.c.appendChild( s );
};

chPainter.prototype.removeScroller = function() {
	scroller = document.querySelectorAll("#chScroller")[0];
	this.c.removeChild( scroller );
};

function chScroller( conf ) {
	this.config = conf;
	this.prevPos = 0;
};

chScroller.prototype.hasMoved = function() {
	pos = this.findPosition();
	if( pos != this.prevPos ) {
		this.prevPos = pos;
		return true;
	}
	return false;
};

chScroller.prototype.findPosition = function() {
	return window.scrollY;
};

/*!
 * scrolling - v0.1.0
 *
 * Copyright (c) 2014, Guille Paz <guille87paz@gmail.com> (http://pazguille.me/)
 * Released under the MIT license.
 */
(function(window) {
'use strict';

/**
 * Privates
 */
var on = window.addEventListener !== undefined ? 'addEventListener' : 'attachEvent',
    off = window.removeEventListener !== undefined ? 'removeEventListener' : 'detachEvent',
    scrollEvent = on !== 'addEventListener' ? 'onscroll' : 'scroll',
    scrolled = false,
    requestAnimFrame = (function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    }()),
    scrolledElement,
    scroll,
    eve;


/**
 * Captures the scroll event and the element who emits it.
 * @function
 * @private
 */
function captureScroll(e) {
  // No changing, exit
  if (!scrolled) {
    scrolled = true;
    scrolledElement = this;
    eve = e || window.e;

    /**
     * requestAnimationFrame
     */
    requestAnimFrame(update);
  }
}

/**
 * If the scroll event exist, it will execute the scrolledElement listeners.
 * @function
 * @private
 */
function update() {

  var i = 0,
      listeners = scroll._collection[scrolledElement].listeners,
      len = listeners.length;

  for (i; i < len; i += 1) {
    if (listeners[i]) {
      listeners[i].call(scrolledElement, eve)
    }
  }

  scrolledElement = undefined;

  // Change scroll status
  scrolled = false;
}

/**
 * Scroll Constructor.
 * @constructor
 * @returns {scroll} Returns a new instance of Scroll.
 */
function Scroll() {
  this.initialize();
  return this;
}

/**
 * Initializes a new instance of Scroll.
 * @function
 * @returns {scroll} Returns a new instance of Scroll.
 */
Scroll.prototype.initialize = function () {
  this._collection = {};
  return this;
};

/**
 * Adds an el with a listener to the collection.
 * @memberof! Scroll.prototype
 * @function
 * @param {HTMLElement} [el] - A given HTMLElement to add to scroll.
 * @param {Funtion} listener - A given listener to execute when the given el is scrolled.
 * @returns {scroll}
 */
Scroll.prototype.add = function (el, listener) {

  if ('function' === typeof el) {
    listener = el;
    el = window;
  }

  if (this._collection[el] === undefined) {
    this._collection[el] = {
      'listeners': []
    };

    el[on](scrollEvent, captureScroll, false);
  }

  // Add listeners to an el collection
  this._collection[el].listeners.push(listener);

  return this;
};

/**
 * Removes a HTMLElement and its listener from the collection with the given el.
 * @memberof! Scroll.prototype
 * @function
 * @param {HTMLElement} el - A given HTMLElement to remove.
 * @param {Funtion} [listener] - A given listener to remove.
 * @returns {scroll}
 */
Scroll.prototype.remove = function (el, listener) {

  if (this._collection[el] == undefined) {
    return this;
  }

  var listeners = this._collection[el].listeners,
      i = 0,
      len = listeners.length;

  if (len !== undefined) {
    for (i; i < len; i += 1) {
      if (listeners[i] === listener) {
        listeners.splice(i, 1);
        break;
      }
    }
  }

  if (listeners.length === 0 || listener === undefined) {
    el[off](scrollEvent, captureScroll, false);
    delete this._collection[el];
  }

  return this;
};

// Defines a new instance of Scroll.
scroll = new Scroll();

/**
 * Adds an el with a listener to the collection.
 * @function
 * @param {HTMLElement} [el] - A given HTMLElement to add to scroll.
 * @param {Funtion} listener - A given listener to execute when the given el is scrolled.
 * @returns {scroll}
 */
function scrolling(el, listener) {
  scroll.add(el, listener);
  return scrolling;
}

/**
 * Removes a HTMLElement and its listener from the collection with the given el.
 * @function
 * @param {HTMLElement} el - A given HTMLElement to remove.
 * @param {Funtion} [listener] - A given listener to remove.
 * @returns {scrolling}
 */
scrolling.remove = function (el, listener) {
  scroll.remove(el, listener);
  return scrolling;
};

/**
 * Expose module
 */
// AMD
if (typeof window.define === 'function' && window.define.amd !== undefined) {
  window.define('scrolling', [], function () {
    return scrolling;
  });
// CommonJS
} else if (typeof module !== 'undefined' && module.exports !== undefined) {
  module.exports = scrolling;
// Browser
} else {
  window.scrolling = scrolling;
};

}(this));
function chMain( chConf ) {
	this.config = chConf;
	this.sizer;
	this.finder;
	this.calculator;
	this.painter;
	this.scroller;

	this.init();
	this.bindings();
};

chMain.prototype.init = function() {
	this.sizer = new chSizer( this.config );
	this.config.browserHeight = this.sizer.findBrowserHeight();
	this.config.pageHeight = this.sizer.findPageHeight();

	this.finder = new chFinder( this.config );
	this.config.offsets = this.finder.findAllOffsets();

	this.calculator = new chCalculator( this.config );
	this.config.modifier = this.calculator.calcModifier();
	this.config.scrollerHeight = this.calculator.calcScrollerHeight();
	this.config.markers = this.calculator.calcAllMarkerPos();

	this.painter = new chPainter( this.config );
	this.config.container = this.painter.paintContainer();
	this.painter.paintAllHeaders();

	this.scroller = new chScroller( this.config );
	this.scroller.hasMoved();
	this.painter.paintScroller( this.calculator.calcScrollerPos( this.scroller.prevPos ) );
};

chMain.prototype.bindings = function() {
	scrolling(window, this.updateScroller)
};

chMain.prototype.updateMarkers = function() {
	if( checkpoint.sizer.hasResized() ) {
		checkpoint.config.modifier = checkpoint.calculator.calcModifier();
		checkpoint.config.browserHeight = checkpoint.sizer.findBrowserHeight();
		checkpoint.config.pageHeight = checkpoint.sizer.findPageHeight();
		checkpoint.config.markers = checkpoint.calculator.calcAllMarkerPos();
		checkpoint.config.scrollerHeight = checkpoint.calculator.calcScrollerHeight();

		checkpoint.painter.removeMarkers();
		checkpoint.painter.paintAllHeaders();
		checkpoint.updateScroller();
	}
};

chMain.prototype.updateScroller = function() {
	if( checkpoint.scroller.hasMoved() ) {
		checkpoint.painter.removeScroller();
		checkpoint.painter.paintScroller( checkpoint.calculator.calcScrollerPos( checkpoint.scroller.prevPos ) );
	}
};

var checkpoint = new chMain( chConf );
