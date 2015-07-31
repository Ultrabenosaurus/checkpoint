/*! checkpoint.js - v0.1.0 - 2015-07-31
* https://github.com/Ultrabenosaurus/checkpoint
* Copyright (c) 2015 Dan Bennett; Licensed BSD-3-Clause */
var chConf = {
	jquery: true,
	headers: {
		h1: "#000",
		h2: "#000",
		h3: "#000",
		h4: "#000",
		h5: "#000",
		h6: "#000"
	}
};

if( typeof $ == 'undefined' ) {
	chConf.jquery = false;
}

function chSizer( conf ) {
	this.conf = conf;
	this.browserWidth = this.findBrowserWidth();
	this.pageWidth = this.findPageWidth();
	this.paintWidth = this.calcWidth();
	this.browserHeight = this.findBrowserHeight();
	this.pageHeight = this.findPageHeight();
	this.paintHeight = this.calcHeight();
};

chSizer.prototype.findBrowserWidth = function() {
	w = false;
	if( typeof window.innerWidth != 'undefined' ) {
		w = window.innerWidth;
	} else if( typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0 ){
		w = document.documentElement.clientWidth;
	} else {
		w = document.getElementsByTagName('body')[0].clientWidth;
	}

	return w;
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

chSizer.prototype.findPageWidth = function() {
	w = false;
	if( typeof document.body != 'undefined' && typeof document.body.scrollWidth != undefined ){
		w = Math.max( document.body.scrollWidth, document.documentElement.scrollWidth );
	} else {
		b = document.getElementsByTagName('body')[0];
		d = document.getElementsByTagName('html')[0];
		w = Math.max( b.scrollWidth, d.scrollWidth );
	}

	return w;
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

chSizer.prototype.calcWidth = function() {
	// not sure if this will ever be dynamic, maybe for mobile? though I think checkpoint shouldn't be visible on mobile
	return 10;
};

chSizer.prototype.calcHeight = function() {
	return ( this.browserHeight / this.pageHeight );
};

function chFinder( conf ) {
	this.conf = conf;
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

chFinder.prototype.findAllOffsets = function( patts ) {
	offs = {};
	for( pattern in patts ) {
		if( patts.hasOwnProperty( pattern ) ) {
			f = this.findHeaders( pattern );
			offs[pattern] = this.findHeaderOffsets( f );
		}
	};

	return offs;
};

function chMain( chConf ) {
	this.conf = chConf;
	this.sizer;
	this.finder;
};

chMain.prototype.setMarkers = function( markers ) {
	//
};

chMain.prototype.init = function() {
	this.sizer = new chSizer( this.conf );
	this.finder = new chFinder( this.conf );
	this.conf.offsets = this.finder.findAllOffsets( this.conf.headers );
	this.conf.markers = this.calcAllMarkerPos( this.conf.headers );
};

chMain.prototype.calcMarkerPos = function( offs ) {
	m = [];
	for (var i = headers.length - 1; i >= 0; i--) {
		m[i] = Math.ceil( offs[i] * this.sizer.paintHeight );
	};

	return m;
};

chMain.prototype.calcAllMarkerPos = function( headers ) {
	marks = {};
	for( pattern in headers ) {
		if( headers.hasOwnProperty( pattern ) ) {
			marks[pattern] = this.calcMarkerPos( headers.pattern );
		}
	};

	return marks;
};

var checkpoint = new chMain( chConf );
checkpoint.init();
