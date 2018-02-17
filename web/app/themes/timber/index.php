<?php
/**
 * The main template file
 *
 */

$context = Timber::get_context();
$context['posts'] = Timber::get_posts();
$templates = array( 'pages/index.twig' );

if ( is_home() ) {
	array_unshift( $templates, 'pages/home.twig' );
}

Timber::render( $templates, $context );