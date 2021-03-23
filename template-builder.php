<?php
/**
 * Template Name: Page builder
 *
 */
$context = Timber::get_context();

// news
$args = array(
	'posts_per_page'   => 10,
	'offset'           => 0,
	'orderby'          => 'date',
	'order'            => 'DESC',
	'post_type'        => 'news',
	'post_status'      => 'publish',
	'suppress_filters' => true 
);
$context['newsSlider'] = Timber::get_posts($args);

// recipes
$args = array(
	'posts_per_page'   => 10,
	'offset'           => 0,
	'orderby'          => 'date',
	'order'            => 'DESC',
	'post_type'        => 'recipes',
	'post_status'      => 'publish',
	'suppress_filters' => true 
);
$context['recipesSlider'] = Timber::get_posts($args);

$templates = array( 'pages/builder.twig' );
Timber::render( $templates, $context );

