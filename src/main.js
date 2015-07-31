
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
	//
};

chMain.prototype.updateMarkers = function() {
	if( this.sizer.hasResized() ) {
		this.config.modifier = this.calculator.calcModifier();
		this.config.browserHeight = this.sizer.findBrowserHeight();
		this.config.pageHeight = this.sizer.findPageHeight();
		this.config.markers = this.calculator.calcAllMarkerPos();
		this.config.scrollerHeight = this.calculator.calcScrollerHeight();

		this.painter.removeMarkers();
		this.painter.removeScroller();
		this.painter.paintAllHeaders();
		this.painter.paintScroller( this.calculator.calcScrollerPos( this.scroller.prevPos ) );
	}
};

chMain.prototype.updateScroller = function() {
	if( this.scroller.hasMoved() ) {
		this.painter.removeScroller();
		this.painter.paintScroller( this.calculator.calcScrollerPos( this.scroller.prevPos ) );
	}
};
