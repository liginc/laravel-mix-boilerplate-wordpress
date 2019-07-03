<?php
if (!function_exists('mix')) {
  /**
   * Get the path to a versioned Mix file.
   *
   * @param  string  $path
   * @param  string  $manifestDirectory
   * @return string
   * @throws Exception
   */
  function mix($path, $manifestDirectory = '')
  {
    static $manifests = [];
    // https://github.com/illuminate/support/blob/49110cc355532fb5f421ab996bb67669f35dc9ab/Str.php#L486
    $startsWith = function ($haystack, $needles) {
      foreach ((array) $needles as $n) {
        if ($n !== '' && substr($haystack, 0, strlen($n)) === (string) $n) {
          return true;
        }
      }
      return false;
    };
    // Set first letter of the argument values to /
    if (!$startsWith($path, '/')) {
      $path = "/{$path}";
    }
    if ($manifestDirectory && !$startsWith($manifestDirectory, '/')) {
      $manifestDirectory = "/{$manifestDirectory}";
    }
    // Return url without protocol, if hot directory exists
    $hotPath = get_stylesheet_directory() . $manifestDirectory . '/hot';
    if (file_exists($hotPath)) {
      $url = rtrim(file_get_contents($hotPath));
      if ($startsWith($url, [ 'http://', 'https://' ])) {
        $withoutProtocol = array_reverse(explode($url, ':', 2))[0].$path;
        return htmlspecialchars($withoutProtocol, ENT_QUOTES, 'UTF-8');
      }
      return htmlspecialchars("//localhost:8080{$path}", ENT_QUOTES, 'UTF-8');
    }
    // Return value retrieved from mix-manifest.json
    $manifestPath =
      get_stylesheet_directory() . $manifestDirectory . '/mix-manifest.json';
    if (!isset($manifests[$manifestPath])) {
      if (!file_exists($manifestPath)) {
        throw new Exception("The Mix manifest doesn't exist: {$manifestPath}");
      }
      $manifests[$manifestPath] =
        json_decode(file_get_contents($manifestPath), true);
    }
    $manifest = $manifests[$manifestPath];
    if (!isset($manifest[$path])) {
      throw new Exception("Unable to locate Mix file: {$path}.");
    }
    $result = $manifestDirectory . $manifest[$path];
    return htmlspecialchars($result, ENT_QUOTES, 'UTF-8');
  }
}
