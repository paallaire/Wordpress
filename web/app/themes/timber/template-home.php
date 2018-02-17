<?php
/**
 * Template Name: Home
 *
 */
$context = Timber::get_context();

// Get last (3) blog posts
$args = array(
	'posts_per_page'   => 3,
	'offset'           => 0,
	'orderby'          => 'date',
	'order'            => 'DESC',
	'post_type'        => 'post',
	'post_status'      => 'publish',
	'suppress_filters' => true 
);
$context['blog_posts'] = Timber::get_posts($args);

$templates = array( 'pages/home.twig' );
Timber::render( $templates, $context );

