'use strict';

describe('zippyGig.version module', function() {
  beforeEach(module('zippyGig.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
