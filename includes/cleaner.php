<?php
namespace THEME_WP\Cleaner;

/**
 * Set up cleaner (Remove autoloading, disable unnecessary stuff from loading and bloating)
 *
 * @return void
 */
function setup() {
	$n = function ( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	add_filter( 'style_loader_src', $n('remove_cssjs_ver'), 10, 2 );
	add_filter( 'script_loader_src', $n('remove_cssjs_ver'), 10, 2 );
	add_action( 'wp_default_scripts', $n('remove_jquery_migrate') );

	/* Register a new image size. */
	update_option( 'thumbnail_size_w', 160 );
	update_option( 'thumbnail_size_h', 160 );
	update_option( 'thumbnail_crop', 1 );
}

/**
 * Clean WordPress
 */
add_action('after_setup_theme', function(){
	remove_action('wp_head', 'rsd_link');
	remove_action('wp_head', 'wlwmanifest_link');
	remove_action('wp_head', 'wp_generator');
	remove_action('wp_head', 'start_post_rel_link');
	remove_action('wp_head', 'index_rel_link');
	remove_action('wp_head', 'adjacent_posts_rel_link');
	remove_action('wp_head', 'print_emoji_detection_script', 7 );
	remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0 );
	remove_action('wp_head', 'wp_oembed_add_discovery_links');
	remove_action('wp_head', 'wp_oembed_add_host_js');
	remove_action('wp_head', 'rest_output_link_wp_head', 10);
	remove_action('admin_print_scripts', 'print_emoji_detection_script' );
	remove_action('admin_print_styles', 'print_emoji_styles');
	remove_action('wp_print_styles', 'print_emoji_styles');
	remove_action('template_redirect', 'wp_shortlink_header', 11 );
	remove_action('template_redirect', 'rest_output_link_header', 11, 0);
	remove_action('rest_api_init', 'wp_oembed_register_route');
	remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);
});

function remove_jquery_migrate( $scripts ) {
	if ( ! is_admin() && isset( $scripts->registered['jquery'] ) ) {
		$script = $scripts->registered['jquery'];
		
	 	if ( $script->deps ) { // Check whether the script has any dependencies
		 	$script->deps = array_diff( $script->deps, array( 'jquery-migrate' ) );
	 	}
	}
}

function remove_cssjs_ver( $src ) {
	if( strpos( $src, '?ver=' ) )
		$src = remove_query_arg( 'ver', $src );
	return $src;
}

add_action('wp_footer', function(){
  	wp_dequeue_script('wp-embed');
});

add_action('init', function(){
  	add_filter( 'rewrite_rules_array', function($rules) {
  		foreach($rules as $rule => $rewrite){
	    	if(false !== strpos($rewrite,'embed=true'))
	      		unset($rules[ $rule ]);
	  	}
	  	return $rules;
  	} );
  	add_filter( 'embed_oembed_discover', '__return_false' );
  	remove_filter( 'pre_oembed_result', 'wp_filter_pre_oembed_result', 10 );
}, 9999 );

/**
 * Sanitize file uploads to prevent issues
 */
add_filter('wp_handle_upload_prefilter', function($file){
	$info = pathinfo($file['name']);
	$ext  = empty($info['extension']) ? '' : '.' . $info['extension'];
	$name = basename($file['name'], $ext);

	$file['name'] = sanitize_title($name) . $ext; 

	return $file;
}, 1, 1);

/**
 * Hiding admin menu items in Wordpress
 */
add_action( 'admin_init', function() {
	remove_menu_page('edit.php'); // Posts´
	remove_menu_page('edit-comments.php'); // Comments

	// 	 remove_menu_page('edit.php'); // Posts
	// 	 remove_menu_page('upload.php'); // Media
	// 	 remove_menu_page('link-manager.php'); // Links
	// 	 remove_menu_page('edit-comments.php'); // Comments
	// 	 remove_menu_page('edit.php?post_type=page'); // Pages
	// 	 remove_menu_page('plugins.php'); // Plugins
	// 	 remove_menu_page('themes.php'); // Appearance
	// 	 remove_menu_page('users.php'); // Users
	// 	 remove_menu_page('tools.php'); // Tools
	// 	 remove_menu_page('options-general.php'); // Settings
	// 	 remove_menu_page('edit.php'); // Posts
	// 	 remove_menu_page('upload.php'); // Media
});

/**
 * Remove Block Library CSS
 */
add_action( 'wp_enqueue_scripts', function() {
	wp_dequeue_style( 'wp-block-library' );
});

/**
 * Remove Block Library CSS
 */
add_action( 'wp_enqueue_scripts', function() {
	if(!is_admin()) {
		wp_deregister_script( 'jquery' );
	}
});
