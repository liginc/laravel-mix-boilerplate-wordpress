<?php

if (!function_exists('mix_resolve')) {
  /**
   * Get absolute URL of specified "$path" under theme directory.
   *
   * @param  string  $path
   * @param  string  $manifestDirectory
   * @return string
   */
  function mix_resolve($path, $manifestDirectory = '')
  {
    return get_stylesheet_directory_uri() . mix($path, $manifestDirectory);
  }
}