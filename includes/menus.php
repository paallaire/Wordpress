<?php
namespace THEME_WP\Menus;

/**
 * Set up menus
 *
 * @return void
 */
function setup() {
	$n = function ( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	register_nav_menus( array(
		'primary_navigation' => 'Primary Nav Menu',
		'mobile_menu' => 'Mobile Menu',
	) );
}
