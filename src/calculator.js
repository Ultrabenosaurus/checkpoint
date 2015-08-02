
/**
 * checkpoint
 *   chCalculator
 *
*/

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
