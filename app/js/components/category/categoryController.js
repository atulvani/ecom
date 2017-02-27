'use strict';

(function () {
    angular
        .module('app')
        .controller('categoryController', categoryController);

    categoryController.$inject = ['httpService'];
    function categoryController (httpService) {
        var vmCategoryController = this;

        vmCategoryController.category = {};
        vmCategoryController.productList = [];

        init();

        function init () {
            httpService.get('/category').then(function (response) {
                vmCategoryController.category = response.data;
            });
            httpService.get('/productList').then(function (response) {
                vmCategoryController.productList = response.data;
            });
        }
    }
})();
