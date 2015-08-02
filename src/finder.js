
/**
 * checkpoint
 *   chFinder
 *
*/

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
