<?php
/**
 * The template for displaying 404 pages (Not Found)
 *
 * Methods for TimberHelper can be found in the /functions sub-directory
 *
 */

$context = Timber::get_context();
Timber::render( 'pages/404.twig', $context );