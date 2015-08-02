
/**
 * checkpoint
 *   cp
 *
*/

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
