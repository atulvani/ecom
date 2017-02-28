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
        }).when('/account', {
            templateUrl: 'account/account.html',
            controller: 'accountController',
            controllerAs: 'vmAccountController'
        }).when('/search', {
            templateUrl: 'search/search.html',
            controller: 'searchController',
            controllerAs: 'vmSearchController'
        }).when('/search/:query', {
            templateUrl: 'search/search.html',
            controller: 'searchController',
            controllerAs: 'vmSearchController'
        }).when('/login', {
            templateUrl: 'auth/auth.html',
            controller: 'authController',
            controllerAs: 'vmAuthController'
        }).otherwise('/');
    }

    appController.$inject = ['httpService', 'cartService', '$location', 'toastService'];
    function appController (httpService, cartService, $location, toastService) {
        var vmAppController = this;

        vmAppController.isNavCollapsed = true;
        vmAppController.categoryList = [];
        vmAppController.featuredProductList = [];
        vmAppController.cart = cartService;

        vmAppController.login = login;
        vmAppController.logout = logout;
        vmAppController.search = search;
        vmAppController.subscribeNewsletter = subscribeNewsletter;

        init();

        function init () {
            httpService.get('/categoryList').then(function(response) {
                vmAppController.categoryList = response.data;
            });
        }

        function login () {
            httpService.get('/user').then(function(response) {
                vmAppController.user = response.data;
                if ($location.path() === '/login') { $location.path('/account'); }
            });
        }

        function logout () {
            vmAppController.user = null;
            if ($location.path() === '/account') { $location.path('/'); }
        }

        function search () {
            $location.path('/search/' + vmAppController.searchQuery);
        }

        function subscribeNewsletter () {
            toastService.success('Subscribed!!');
        }
    }
})();
