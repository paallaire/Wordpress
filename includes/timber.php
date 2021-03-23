<?php

// Check if Timber is not activated
if (!class_exists('Timber')) {

    add_action('admin_notices', function () {
        echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url(admin_url('plugins.php#timber')) . '">' . esc_url(admin_url('plugins.php')) . '</a></p></div>';
    });
    return;
}

// Add the directory of templates in include path
Timber::$dirname = array('templates');

/**
 * Extend TimberSite with site wide properties
 */
class TimberThemeBase extends TimberSite
{

    function __construct()
    {
        add_filter('timber/context', array($this, 'add_to_context'));
        add_filter('get_twig', array($this, 'add_to_twig'));
        parent::__construct();
    }

    function add_to_context($context)
    {
     
        /* Menu 
         -------------------------------------------- */
        $context['primary_navigation'] = new \Timber\Menu('primary_navigation');
        $context['mobile_menu'] = new \Timber\Menu('mobile_menu');
     
        /* Site info 
         -------------------------------------------- */
        $context['site'] = $this;
        $context['dist'] = get_template_directory_uri() . '/dist';
        $context['sprite'] = get_template_directory_uri() . '/dist/svg/symbol-defs.svg';
        $context['is_404'] = is_404();
        
        /* Current post 
         -------------------------------------------- */
        $post = Timber::query_post();
        $context['post'] = $post;
        $context['page_template'] = $post->_wp_page_template;
        $context['post_type'] = get_post_type();

        /* Pages 
         -------------------------------------------- */
        //$context['options']['page_histoirque'] = Timber::get_post($context['options']['page_histoirque']->ID);

        /* Options ACF 
        -------------------------------------------- */
        $context['options'] = get_fields('options');

        /* Polylang
        -------------------------------------------- */
        $languages = [];

        if(function_exists('icl_get_languages')) {

            $context["home_url"] = pll_home_url();
            $context["current_lang"] = pll_current_language();

            foreach (icl_get_languages('skip_missing=0&orderby=id') as $item) {
                $tmp['language_code'] = $item['language_code'];
                $tmp['url'] = $item['url'];
                $tmp['active'] = $item['active'];
                $tmp['native_name'] = $item['native_name'];
                array_push($languages, $tmp);
            }
            $context['languages'] = $languages;
            $context['current_language_code'] = ICL_LANGUAGE_CODE;

        }

        return $context;
    }

    function add_to_twig($twig)
    {

        if(function_exists('icl_get_languages')) {

            $function = new \Twig_SimpleFunction('option', function ($field_name) {
                return get_field($field_name . "_" . pll_current_language(), "option");
            });
            $twig->addFunction($function);
    
            $twig->addFilter('t', new \Twig_Filter_Function('pll__'));

        }

        return $twig;
    }
}
new TimberThemeBase();
