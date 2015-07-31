
/**
 * checkpoint
 *   chMain
 *
*/

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
