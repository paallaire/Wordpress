<?php 

/**
 * Defining global constants
 */
define( 'THEME_VERSION',      '1.0.0' );
define( 'THEME_URL',          get_stylesheet_directory_uri() );
define( 'THEME_TEMPLATE_URL', get_template_directory_uri() );
define( 'THEME_PATH',         dirname( __FILE__ ) . '/' );
define( 'THEME_INC',          THEME_PATH . 'includes/' );
define( 'THEME_ASSETS',       THEME_TEMPLATE_URL . '/assets/' );

/**
 * THEME_DEBUG is used when enqueuing scripts and styles
 * False will use the minified version (will not work when npm run prod was run.)
 */
define( 'THEME_DEBUG', true );

require_once THEME_INC . 'core.php';
require_once THEME_INC . 'menus.php';
require_once THEME_INC . 'post-types.php';
require_once THEME_INC . 'plugins.php';
require_once THEME_INC . 'comments.php';
require_once THEME_INC . 'cleaner.php';
require_once THEME_INC . 'timber.php';
require_once THEME_INC . 'acf.php';
require_once THEME_INC . 'polylang.php';

THEME_WP\Core\setup();
THEME_WP\Menus\setup();
THEME_WP\Post_Types\setup();
THEME_WP\Plugins\setup();
THEME_WP\Comments\setup();
THEME_WP\Cleaner\setup();
THEME_WP\ACF\setup();
THEME_WP\Polylang\setup();

function cc_mime_types($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

