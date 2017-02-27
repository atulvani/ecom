'use strict';

(function () {
    angular
        .module('app')
        .controller('searchController', searchController);

    searchController.$inject = ['httpService', '$routeParams'];
    function searchController (httpService, $routeParams) {
        var vmSearchController = this;

        vmSearchController.searchQuery = $routeParams.query;
        vmSearchController.searchResultList = [];

        init();

        function init () {
            httpService.get('/productList').then(function (response) {
                vmSearchController.searchResultList = response.data;
            });
        }
    }
})();
