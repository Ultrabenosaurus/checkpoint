
/**
 * checkpoint
 *   chPainter
 *
*/

function chPainter( conf ) {
	this.config = conf;
	this.b = ( ( typeof document.body != 'undefined' ) ? document.body : document.getElementsByTagName('body')[0] );
	this.c;
};

chPainter.prototype.paintContainer = function() {
	c = document.createElement( "div" );
	c.id = "chContainer";

	c.style.zIndex = 99997;
	c.style.position = "fixed";
	c.style.top = 0;
	c.style.right = 0;
	c.style.width = this.config.markerWidth + "px";
	c.style.height = this.config.browserHeight + "px";

	this.b.appendChild( c );
	this.c = c;
	return c;
};

chPainter.prototype.paintMarker = function( offset, colour, ids ) {
	m = document.createElement( "a" );
	m.className += " chMarker";

	m.style.zIndex = 99999;
	m.style.position = "absolute";
	m.style.backgroundColor = colour;
	m.style.right = 0;
	m.style.top = offset + "px";
	m.style.width = this.config.markerWidth + "px";
	m.style.height = this.config.markerHeight + "px";

	if( "undefined" != typeof this.config.markerClickable && this.config.markerClickable ) {
		m.style.cursor = "pointer";
		m.setAttribute( "data-checkpoint-target", "#" + ids[1]);
		m.onclick = function() {
			b = ( ( typeof document.body != 'undefined' ) ? document.body : document.getElementsByTagName('body')[0] );
			t = document.querySelectorAll( this.getAttribute( "data-checkpoint-target" ) )[0];
			b.scrollTop = t.offsetTop;
			return false;
		};
	}

	this.c.appendChild( m );
	return m;
};

chPainter.prototype.paintHeader = function( pattern ) {
	headers =  this.config.headers;
	markers =  this.config.markers;
	offsets =  this.config.offsets;
	for(var i = markers[pattern].length - 1; i >= 0; i--) {
		this.paintMarker( markers[pattern][i], headers[pattern], offsets[pattern][i] );
	};
};

chPainter.prototype.paintAllHeaders = function() {
	headers =  this.config.headers;
	for( pattern in headers ) {
		if( headers.hasOwnProperty( pattern ) ) {
			this.paintHeader( pattern );
		}
	};
};

chPainter.prototype.removeMarkers = function() {
	markers = document.querySelectorAll(".chMarker");
	for( var i = markers.length - 1; i >= 0; i-- ) {
		this.c.removeChild( markers[i] );
	};
};

chPainter.prototype.paintScroller = function( pos ) {
	s = document.createElement( "div" );
	s.id = "chScroller"

	s.style.position = "absolute";
	s.style.backgroundColor = this.config.scrollerColour;
	s.style.opacity = "0.5";
	s.style.right = 0;
	s.style.top = pos + "px";
	s.style.width = this.config.markerWidth + "px";
	s.style.height = this.config.scrollerHeight + "px";
	s.style.zIndex = 99998;

	this.c.appendChild( s );
};

chPainter.prototype.removeScroller = function() {
	scroller = document.querySelectorAll("#chScroller")[0];
	this.c.removeChild( scroller );
};
