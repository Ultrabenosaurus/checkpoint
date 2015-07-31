
/**
 * checkpoint
 *   chMain
 *
*/

function chMain( chConf ) {
	this.config = chConf;
	this.sizer;
	this.finder;
	this.painter;
	this.calculator;
};

chMain.prototype.setMarkers = function( markers ) {
	//
};

chMain.prototype.init = function() {
	this.sizer = new chSizer( this.config );
	this.config.browserHeight = this.sizer.findBrowserHeight();
	this.config.pageHeight = this.sizer.findPageHeight();

	this.finder = new chFinder( this.config );
	this.config.offsets = this.finder.findAllOffsets();

	this.calculator = new chCalculator( this.config );
	this.config.modifier = this.calculator.calcModifier();
	this.config.markers = this.calculator.calcAllMarkerPos();

	this.painter = new chPainter( this.config );
	this.painter.paintContainer();
	this.painter.paintAllHeaders();
};

chMain.prototype.bindings = function() {
	//
};
