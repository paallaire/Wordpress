<?php
/**
 * Single page template
 *
 */

$context = Timber::get_context();

// Get last posts (3)
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

Timber::render('single/index.twig', $context);




