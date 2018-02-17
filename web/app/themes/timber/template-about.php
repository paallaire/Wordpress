<?php
/**
 * Template Name: About
 *
 */
$context = Timber::get_context();

$templates = array( 'pages/about.twig' );
Timber::render( $templates, $context );

