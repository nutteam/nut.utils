/**
 * A/B test component for nut.
 * @param {String} name: test name.
 * @author Shengjie.Yu
 * @returns {ABTest}
 * @constructor
 * @example
 *   ABTest('you abtest name')
 *     // standard,only one
 *     .standard(function() {
 *
 *     })
 *     // variant,one or more
 *     .variant(function() {
 *
 *     })
 *     .variant(function() {
 *
 *     })
 *     // start the A/B test
 *     .start();
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['$'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('$'));
  } else {
    root.ABTest = factory($);
  }
}(this, function($) {
  'use strict';

  var AB = function(name) {
    if (!name) {
      throw new Error('need A/B test name.');
    }

    if (!(this instanceof AB)) {
      return new AB(name);
    }

    this.name = name;
    this.sources = [];
  };

  AB.prototype = {
    constructor: AB,

    // standard
    standard: function(fn) {
      this.sources.push(fn);
      return this;
    },

    // variants
    variant: function(fn) {
      this.sources.push(fn);
      return this;
    },

    // A/B test start
    start: function() {
      var self = this,
        sourceLength = this.sources.length,
        random,
        testInfos,
        testInfo,
        isCache;

      var abtest = localStorage.getItem('abtest');
      if (!abtest) {
        sourceLength = this.sources.length;
        random = AB.createRandom(sourceLength);
        testInfos = [{
          name: self.name,
          random: random
        }];
        localStorage.setItem('abtest', JSON.stringify(testInfos));
      } else {
        var testInfos = JSON.parse(abtest);
        for (var i = 0, len = testInfos.length; i < len; i++) {
          testInfo = testInfos[i];
          var name = testInfo.name;

          if (name === self.name) {
            isCache = true;
            random = testInfo.random;
            break;
          }
        }

        if (!isCache) {
          random = AB.createRandom(sourceLength);
          var addTestInfo = {
            name: self.name,
            random: random
          };

          testInfos.push(addTestInfo);
          localStorage.setItem('abtest', JSON.stringify(testInfos));
        }
      }

      var source = this.sources[random];
      if (typeof source === 'function') {
        source();
      }

      return this;
    }
  };

  /**
   * Create a number between 0 and sourceLength.
   * @param {Int} sourceLength
   * @returns {number}
   */
  AB.createRandom = function(sourceLength) {
    return Math.floor(Math.random() * sourceLength);
  };

  return AB;
}));
