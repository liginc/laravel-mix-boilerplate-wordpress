<?php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Laravel Mix Boilerplate for WordPress</title>
    <link rel="shortcut icon"
          href="<?php echo get_stylesheet_directory_uri() . mix('/assets/images/favicon.ico'); ?>"
    >
    <link rel="apple-touch-icon-precomposed"
          href="<?php echo get_stylesheet_directory_uri() . mix('/assets/images/apple-touch-icon-precomposed.png'); ?>"
    >
    <link
            rel="stylesheet"
            href="<?php echo get_stylesheet_directory_uri() . mix('/assets/css/app.css'); ?>"
    >
</head>
<body>
<?php echo file_get_contents(get_stylesheet_directory() . '/assets/svg/sprite.svg'); ?>
<div class="js-target">
    <ul>
        <li class="svg-a">
            <svg>
                <title>SAMPLE-A.SVG</title>
                <use xlink:href="#sprite-sample-a"></use>
            </svg>
        </li>
        <li class="svg-b">
            <svg>
                <title>SAMPLE-B.SVG</title>
                <use xlink:href="#sprite-sample-b"></use>
            </svg>
        </li>
    </ul>
    <h1>Laravel Mix Boilerplate for WordPress</h1>
</div>
<script src="<?php echo get_stylesheet_directory_uri() . mix('/assets/js/app.js'); ?>"></script>
</body>
</html>
