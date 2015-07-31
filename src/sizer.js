
/**
 * checkpoint
 *   chSizer
 *
*/

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
