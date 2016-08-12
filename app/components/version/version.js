'use strict';

angular.module('zippyGig.version', [
  'zippyGig.version.interpolate-filter',
  'zippyGig.version.version-directive'
])

.value('version', '0.1');
