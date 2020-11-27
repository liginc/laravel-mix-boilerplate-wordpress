<?php
get_header();
?>

<h1>Laravel Mix Boilerplate for WordPress</h1>
<ul class="sample">
  <li class="sample-item">
    <svg class="sample-image">
      <use xlink:href="#sprite-sample"></use>
    </svg>
  </li>
  <li class="sample-item">
    <img
      src="<?= resolve_uri('/assets/svg/sample.svg'); ?>"
      alt="Sample"
      class="sample-image"
    >
  </li>
  <li class="sample-item">
    <img
      src="<?= resolve_uri('/assets/images/sample.png'); ?>"
      alt="Sample"
      class="sample-image"
    >
  </li>
</ul>

<?php
get_footer();
?>