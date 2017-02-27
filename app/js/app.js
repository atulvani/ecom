'use strict';

(function() {
    angular
        .module('app', ['ngRoute', 'ui.bootstrap', 'templates', 'jsf'])
        .config(config)
        .controller('appController', appController);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(false);
        $routeProvider.when('/', {
            templateUrl: 'home/home.html',
            controller: 'homeController',
            controllerAs: 'vmHomeController'
        }).when('/category/:categoryId', {
            templateUrl: 'category/category.html',
            controller: 'categoryController',
            controllerAs: 'vmCategoryController'
        }).when('/product/:productId', {
            templateUrl: 'product/product.html',
            controller: 'productController',
            controllerAs: 'vmProductController'
        }).when('/cart', {
            templateUrl: 'cart/cart.html',
            controller: 'cartController',
            controllerAs: 'vmCartController'
        }).otherwise('/');
    }

    appController.$inject = ['httpService', 'cartService'];
    function appController (httpService, cartService) {
        var vmAppController = this;

        vmAppController.isNavCollapsed = true;
        vmAppController.categoryList = [];
        vmAppController.featuredProductList = [];
        vmAppController.cart = cartService;

        vmAppController.login = login;

        init();

        function init () {
            httpService.get('/categoryList').then(function(response) {
                vmAppController.categoryList = response.data;
            });
        }

        function login () {
            httpService.get('/user').then(function(response) {
                vmAppController.user = response.data;
            });
        }
    }
})();
