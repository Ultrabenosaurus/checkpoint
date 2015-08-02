/*! checkpoint.js - v0.1.0 - 2015-08-02
* https://github.com/Ultrabenosaurus/checkpoint
* Copyright (c) 2015 Dan Bennett; Licensed BSD-3-Clause */
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
	if( "undefined" != typeof this.config.useClass && this.config.useClass ) {
		pattern = "." + pattern;
	}
	return document.querySelectorAll( pattern );
};

chFinder.prototype.findHeaderOffsets = function( headers ) {
	h = [];
	for (var i = headers.length - 1; i >= 0; i--) {
		h[i] = [];
		h[i][0] = headers[i].offsetTop;

		if( "undefined" != typeof this.config.markerClickable && this.config.markerClickable ) {
			hid = "ch" + this.random();
			headers[i].id = hid;
			h[i][1] = hid;
		}
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

chFinder.prototype.random = function() {
	return Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
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
		m[i] = Math.ceil( offs[i][0] * this.config.modifier );
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

chPainter.prototype.paintMarker = function( offset, colour, ids ) {
	m = document.createElement( "a" );
	m.className += " chMarker";

	m.style.position = "absolute";
	m.style.backgroundColor = colour;
	m.style.right = 0;
	m.style.top = offset + "px";
	m.style.width = this.config.markerWidth + "px";
	m.style.height = this.config.markerHeight + "px";

	if( "undefined" != typeof this.config.markerClickable && this.config.markerClickable ) {
		m.style.cursor = "pointer";
		m.setAttribute( "data-checkpoint-target", "#" + ids[1]);
		m.onclick = function() {
			b = ( ( typeof document.body != 'undefined' ) ? document.body : document.getElementsByTagName('body')[0] );
			t = document.querySelectorAll( this.getAttribute( "data-checkpoint-target" ) )[0];
			b.scrollTop = t.offsetTop;
			return false;
		};
	}

	this.c.appendChild( m );
	return m;
};

chPainter.prototype.paintHeader = function( pattern ) {
	headers =  this.config.headers;
	markers =  this.config.markers;
	offsets =  this.config.offsets;
	for(var i = markers[pattern].length - 1; i >= 0; i--) {
		this.paintMarker( markers[pattern][i], headers[pattern], offsets[pattern][i] );
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

function cp( chConf ) {
	this.config = chConf;
	this.sizer;
	this.finder;
	this.calculator;
	this.painter;
	this.scroller;

	this.init();
};

cp.prototype.init = function() {
	if( "undefined" == typeof chSizer || "undefined" == typeof chFinder || "undefined" == typeof chCalculator || "undefined" == typeof chPainter ) {
		if( window.console && console.log ) console.log( "ERROR", "checkpoint: one or more core modules are missing, check your build settings and try again" );
		return false;
	}

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

	if( "undefined" != typeof this.config.scrollerVisible && this.config.scrollerVisible ) {
		if( "undefined" != typeof chScroller && "undefined" != typeof scrolling ) {
			this.scroller = new chScroller( this.config );
			this.scroller.hasMoved();
			this.painter.paintScroller( this.calculator.calcScrollerPos( this.scroller.prevPos ) );
			scrolling(window, this.updateScroller);
		} else {
			if( window.console && console.log ) console.log( "WARNING", "checkpoint: scroll indicator requested but module not found" );
		}
	}

	this.bindings();
};

cp.prototype.bindings = function() {
	window.addEventListener( "resize", function( event ){
		checkpoint.updateMarkers();
	} );
};

cp.prototype.updateMarkers = function() {
	checkpoint.config.modifier = checkpoint.calculator.calcModifier();
	checkpoint.config.browserHeight = checkpoint.sizer.findBrowserHeight();
	checkpoint.config.pageHeight = checkpoint.sizer.findPageHeight();
	checkpoint.config.markers = checkpoint.calculator.calcAllMarkerPos();
	checkpoint.config.scrollerHeight = checkpoint.calculator.calcScrollerHeight();

	checkpoint.painter.removeMarkers();
	checkpoint.painter.paintAllHeaders();
	checkpoint.updateScroller();
};

cp.prototype.updateScroller = function() {
	if( checkpoint.scroller.hasMoved() ) {
		checkpoint.painter.removeScroller();
		checkpoint.painter.paintScroller( checkpoint.calculator.calcScrollerPos( checkpoint.scroller.prevPos ) );
	}
};

var checkpoint = new cp( chConfig );
