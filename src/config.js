
/**
 * checkpoint.config
 *
*/

var chConf = {
	jquery: true,
	headers: {
		h1: "#000",
		h2: "#000",
		h3: "#000",
		h4: "#000",
		h5: "#000",
		h6: "#000"
	}
};

if( typeof $ == 'undefined' ) {
	chConf.jquery = false;
}
