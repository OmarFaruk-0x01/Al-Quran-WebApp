/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'ico\'">' + entity + '</span>' + html;
	}
	var icons = {
		'ico-copy': '&#xe92c;',
		'ico-spinner': '&#xe982;',
		'ico-search': '&#xe986;',
		'ico-cogs': '&#xe995;',
		'ico-heart': '&#xe9da;',
		'ico-minus': '&#xea0b;',
		'ico-cross': '&#xea0f;',
		'ico-play': '&#xea1c;',
		'ico-pause': '&#xea1d;',
		'ico-facebook': '&#xea90;',
		'ico-instagram': '&#xea92;',
		'ico-twitter': '&#xea96;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/ico-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
