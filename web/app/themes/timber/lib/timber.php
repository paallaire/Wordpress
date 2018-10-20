<?php
use Roots\Sage\Setup;

// Check if Timber is not activated
if ( ! class_exists( 'Timber' ) ) {

    add_action( 'admin_notices', function() {
        echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
    } );
    return;

}

// Add the directory of templates in include path
Timber::$dirname = array('templates');

/**
 * Extend TimberSite with site wide properties
 */
class SageTimberTheme extends TimberSite {

    function __construct() {
        add_filter( 'timber_context', array( $this, 'add_to_context' ) );
        add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
        parent::__construct();
    }

    function add_to_context( $context ) {

        /* Menu */
        $context['menu_primary_navigation'] = new TimberMenu('primary_navigation');
        $context['menu_footer_navigation'] = new TimberMenu('footer_navigation');

        /* Site info */
        $context['site'] = $this;

        /* Current post */
        $post = Timber::query_post();
        $context['post'] = $post;

        /* Pages */
        //$context['options']['page_histoirque'] = Timber::get_post($context['options']['page_histoirque']->ID);

        /* Options ACF */
        $context['options'] = get_fields('options');

        if (function_exists('pll_the_languages')) { 
            $context['langs'] = pll_the_languages(array('raw'=>1));
            $context["home_url"] = pll_home_url();
            $context["current_lang"] = pll_current_language();
        }

        return $context;
    }

    function add_to_twig( $twig ) {
        $function = new \Twig_SimpleFunction( 'option', function ( $field_name ) {
            return get_field( $field_name . "_" . pll_current_language(), "option" );
        } );
        $twig->addFunction( $function );
    
        $twig->addFilter( 't', new \Twig_Filter_Function( 'pll__' ) );
    
        return $twig;
    }

}
new SageTimberTheme();
