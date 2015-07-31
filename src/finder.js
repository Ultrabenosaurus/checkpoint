
/**
 * checkpoint
 *   chFinder
 *
*/

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
