<?php
namespace THEME_WP\Polylang;

/**
 * Set up menus
 *
 * @return void
 */
function setup() {
	$n = function ( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	if(function_exists('icl_get_languages')) {

		add_action( 'pll_get_post_types', $n('add_cpt_to_pll'), 10, 2  );
		add_action( 'init', $n('translation_pll'), 0 );

	}
}

function translation_pll() {

	/* General
	-------------------------------------------- */
	pll_register_string('theme-hera', 'd/m/Y');
	pll_register_string('theme-hera', 'pageTitle_404');
	pll_register_string('theme-hera', 'pageText_404');

	/* News
	-------------------------------------------- */
	pll_register_string('theme-hera', 'BuildInQuebec');

	/* News
	-------------------------------------------- */
	pll_register_string('theme-hera', 'SliderNewsReadArticle');

	/* Products
	-------------------------------------------- */
	pll_register_string('theme-hera', 'SliderProductsBuy');

	/* Recipes
	-------------------------------------------- */
	pll_register_string('theme-hera', 'SliderRecipesIngredients');
	pll_register_string('theme-hera', 'SliderRecipesTools');
	pll_register_string('theme-hera', 'SliderRecipesSteps');
	pll_register_string('theme-hera', 'SliderRecipesNotes');

	/* Footer
	-------------------------------------------- */
	pll_register_string('theme-hera', 'footerContactTitle');
	pll_register_string('theme-hera', 'footerCopyRight');
	pll_register_string('theme-hera', 'footerNewsltterTitle');
	pll_register_string('theme-hera', 'footerNewsltterInputPlaceholder');
	pll_register_string('theme-hera', 'footerNewsltterBtnSubmit');
	pll_register_string('theme-hera', 'footerNoteDev');

		/* Footer
	-------------------------------------------- */
	pll_register_string('theme-hera', 'modalAgeTitle');
	pll_register_string('theme-hera', 'modalAgeText');
	pll_register_string('theme-hera', 'Yes');
	pll_register_string('theme-hera', 'No');
	pll_register_string('theme-hera', 'modalAgeNote');

}

function add_cpt_to_pll( $post_types, $is_settings ) {
    if ( $is_settings ) {
        // hides 'my_cpt' from the list of custom post types in Polylang settings
        unset( $post_types['news'] );
        unset( $post_types['recipes'] );
        unset( $post_types['products'] );
    } else {
        // enables language and translation management for 'my_cpt'
        $post_types['news'] = 'news';
        $post_types['recipes'] = 'recipes';
        $post_types['products'] = 'products';
    }
    return $post_types;
}

