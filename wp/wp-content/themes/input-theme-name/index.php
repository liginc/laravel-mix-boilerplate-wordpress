<?php
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Laravel Mix Boilerplate for WordPress</title>
  <link
    rel="stylesheet"
    href="<?php echo get_stylesheet_directory_uri() . mix('/assets/css/app.css'); ?>"
  >
</head>
<body>
  <?php echo file_get_contents(dirname(__FILE__) . '/assets/svg/sprite.svg'); ?>
  <div class="js-target">
    <h1>Laravel Mix Boilerplate for WordPress</h1>
    <ul>
      <li class="gif">
        <img
          src="<?php echo get_stylesheet_directory_uri() . mix('/assets/images/sample.gif'); ?>"
          alt="SAMPLE.GIF"
        >
      </li>
      <li class="jpeg">
        <img
          src="<?php echo get_stylesheet_directory_uri() . mix('/assets/images/sample.jpeg'); ?>"
          alt="SAMPLE.JPEG"
        >
      </li>
      <li class="jpg">
        <img
          src="<?php echo get_stylesheet_directory_uri() . mix('/assets/images/sample.jpg'); ?>"
          alt="SAMPLE.JPG"
        >
      </li>
      <li class="png">
        <img
          src="<?php echo get_stylesheet_directory_uri() . mix('/assets/images/sample.png'); ?>"
          alt="SAMPLE.PNG"
        >
      </li>
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
  </div>
  <script src="<?php echo get_stylesheet_directory_uri() . mix('/assets/js/app.js'); ?>"></script>
</body>
</html>
