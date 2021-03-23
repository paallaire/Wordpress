<?php
namespace THEME_WP\Plugins;

/**
 * Overrides settings coming from any plugins
 *
 * @return void
 */
function setup() {
	$n = function ( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	// Move Yoast to bottom
	add_filter( 'wpseo_metabox_prio', $n('yoasttobottom') );

	// Remove wpautop from contact form 7
	add_filter( 'wpcf7_autop_or_not', '__return_false' );
}

function yoasttobottom() {
	return 'low';
}