<?php
namespace THEME_WP\Core;

/**
 * Set up theme defaults and register supported WordPress features.
 *
 * @return void
 */
function setup() {
	$n = function ( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	add_action( 'wp_enqueue_scripts', $n( 'enqueue_scripts' ), true );
	add_action( 'wp_enqueue_scripts', $n( 'enqueue_styles' ), true );
	add_action( 'after_setup_theme', $n( 'after_setup_theme' ) );

	add_filter('show_admin_bar', '__return_false');
}

/**
 * Enqueue styles for front-end.
 * @param bool $debug Whether to enable loading uncompressed/debugging assets. Default false.
 * @return void
 */
function enqueue_styles( $debug = false ) {
	wp_enqueue_style('main', THEME_URL . "/dist/styles/main.css", array(), THEME_VERSION );
	wp_enqueue_style('tailwind', THEME_URL . "/dist/styles/tailwind.css", array(), THEME_VERSION );
}

/**
 * Enqueue scripts for front-end.
 * @param bool $debug Whether to enable loading uncompressed/debugging assets. Default false.
 * @return void
 */
function enqueue_scripts( $debug = false ) {
	wp_enqueue_script('manifest', THEME_URL . "/dist/scripts/manifest.js", array(), THEME_VERSION, true);
	wp_enqueue_script('vendor', THEME_URL . "/dist/scripts/vendor.js", array(), THEME_VERSION, true);
	wp_enqueue_script('main', THEME_URL . "/dist/scripts/main.js", array(), THEME_VERSION, true);
}

function after_setup_theme() {
	// Add theme supports
	add_theme_support( 'title-tag' );
  	add_theme_support( 'post-thumbnails' );
  	add_theme_support( 'menus' );
}

/**
 * Add favicon to WordPress back-end interface
 */
add_action('admin_head',function(){
	echo '<link href="' . THEME_URL. '/favicon.ico" rel="icon" type="image/x-icon">';
});
