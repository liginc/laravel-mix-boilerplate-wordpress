<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title><?php wp_title(); ?></title>
  <link
    rel="shortcut icon"
    href="<?= resolve_uri('/assets/images/favicon.ico'); ?>"
  >
  <link
    rel="apple-touch-icon-precomposed"
    href="<?= resolve_uri('/assets/images/apple-touch-icon-precomposed.png'); ?>"
  >
  <link
    rel="stylesheet"
    href="<?= resolve_uri('/assets/css/app.css'); ?>"
  >
  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php // SVG sprite
$file = get_stylesheet_directory() . '/assets/svg/sprite.svg';
if (file_exists($file)) echo file_get_contents($file);
?>
