/**
 * Affix for Nut.
 * @author Shengjie.Yu
 * @returns {Affix}
 * @constructor
 */
(function() {
  'use strict';

  var prefixTestList = ['', '-webkit-', '-ms-', '-moz-', '-o-'];
  var stickyTestElement = document.createElement('div');
  for (var i = 0, l = prefixTestList.length; i < l; i++) {
    stickyTestElement.style.position = prefixTestList[i] + 'sticky';
  }
  if(stickyTestElement.style.position.length > 0) {
    return false;
  }

  var Affix = function(element, options) {
    this.options = options;
    this.$el = element;
    $(window).on('scroll', $.proxy(this.onScroll, this));
  };

  Affix.prototype = {
    constructor: Affix,

    onScroll: function() {
      var scrollTop = document.body.scrollTop;
      var $self = $(this.$el);
      var top = $self.offset().top;
      var affixTop = $self.data('affixTop');
      affixTop = affixTop != null ? parseInt(affixTop, 10) : 0;
      var initTop = this.options.initTop;

      if(scrollTop + affixTop < initTop) {
        $self.removeClass('fixed');
      } else {
        $self.addClass('fixed');  
      }
    }
  };

  $(window).on('load', function() {
    $('[data-spy="affix"]').each(function() {
      var $spy = $(this);
      var options = {};
      var initTop = $spy.offset().top;
      options.initTop = initTop;

      $spy.data('affix', new Affix(this, options));
    });
  });
})();