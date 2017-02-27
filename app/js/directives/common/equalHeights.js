'use strict';

(function () {
    angular
        .module('app')
        .directive('equalHeights', equalHeights);

    equalHeights.$inject = ['$timeout'];
    function equalHeights ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, elt) {
                $timeout(function () {
                    var maxHeight = 0;
                    elt.find('.thumbnail').each(function (i, elm) {
                        maxHeight = Math.max(maxHeight, angular.element(elm).height());
                    });
                    elt.find('.thumbnail').each(function (i, elm) {
                        angular.element(elm).css('height', maxHeight);
                    });
                }, 1000); // let's hope for the best
            }
        };
    }
})();
