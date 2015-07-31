
/**
 * checkpoint
 *   chMain
 *
*/

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
