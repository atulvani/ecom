'use strict';

(function () {
    angular
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['httpService'];
    function homeController (httpService) {
        var vmHomeController = this;

        vmHomeController.productList = [];

        init();

        function init () {
            httpService.get('/productList').then(function(response) {
                vmHomeController.featuredProductList = response.data;
            });
        }
    }
})();
