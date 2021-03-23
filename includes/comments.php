<?php
namespace THEME_WP\Comments;

/**
 * Set up comments (mainly removing them)
 *
 * @return void
 */
function setup() {
	$n = function ( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	add_action( 'admin_menu', $n( 'remove_comments_menu' ) );
	add_action( 'admin_init', $n( 'disable_comments_admin_menu_redirect' ) );
	add_action( 'admin_init', $n( 'remove_comments_support' ) );
	add_action( 'wp_before_admin_bar_render', $n( 'remove_admin_bar_comments' ) );

	// Close comments on the front-end
	add_filter( 'comments_open', '__return_false', 20, 2 );
	add_filter( 'pings_open', '__return_false', 20, 2 );
}

/**
 * Remove items from the admin sidebar menu
 */
function remove_comments_menu() {
	remove_menu_page( 'edit-comments.php' );
}

/**
 * Redirect people who visit edit-comments.php directly
 */
function disable_comments_admin_menu_redirect() {
	global $pagenow;

	if ( $pagenow === 'edit-comments.php' ) {
		wp_redirect( admin_url() );
		exit;
	}
}

/**
 * Remove comments/trackback support from posts
 */
function remove_comments_support() {
	foreach ( get_post_types() as $post_type ) {
		remove_post_type_support( $post_type, 'comments' );
		remove_post_type_support( $post_type, 'trackbacks' );
	}
}

/**
 * Remove comments from the admin bar
 */
function remove_admin_bar_comments() {
	global $wp_admin_bar;
	$wp_admin_bar->remove_menu( 'comments' );
}