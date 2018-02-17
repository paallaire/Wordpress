<?php
/**
 * The template for displaying Author Archive pages
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 */
global $wp_query;

$context = Timber::get_context();
$context['posts'] = Timber::get_posts();
if ( isset( $wp_query->query_vars['author'] ) ) {
	$author = new TimberUser( $wp_query->query_vars['author'] );
	$context['author'] = $author;
	$context['title'] = 'Author Archives: ' . $author->name();
}
Timber::render( array( 'pages/author.twig', 'pages/archive.twig', 'pages/index.twig' ), $context );