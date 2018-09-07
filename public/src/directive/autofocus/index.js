(function(){
  'use strict';

  angular
  .module('angularApp')
  .directive('autofocus', autofocusDirective);

  autofocusDirective.$inject = ["$timeout", "$interval"];

  function autofocusDirective($timeout, $interval){
    return {
      restrict: 'A',
      link: function ($scope, $element) {
        $timeout(function(){
          $element[0].focus();
        });

        $interval(function(){
          $element[0].focus();
        }, 500);

        $element.on('blur', function(){
          $element[0].focus();
        });
      }
    }
  }
})();