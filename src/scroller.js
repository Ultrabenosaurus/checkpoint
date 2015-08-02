
/**
 * checkpoint
 *   chScroller
 *
*/

function chScroller( conf ) {
	this.config = conf;
	this.prevPos = 0;
};

chScroller.prototype.hasMoved = function() {
	pos = this.findPosition();
	if( pos != this.prevPos ) {
		this.prevPos = pos;
		return true;
	}
	return false;
};

chScroller.prototype.findPosition = function() {
	return window.scrollY;
};
