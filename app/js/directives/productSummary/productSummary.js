'use strict';

(function () {
    angular
        .module('app')
        .directive('productSummary', productSummary);

    productSummary.$inject = [];
    function productSummary () {
        return {
            scope: {
                product: '='
            },
            templateUrl: 'productSummary/productSummary.html'
        };
    }
})();
