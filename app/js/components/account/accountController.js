'use strict';

(function () {
    angular
        .module('app')
        .controller('accountController', accountController);

    accountController.$inject = ['httpService'];
    function accountController (httpService) {
        var vmAccountController = this;

        init();

        function init () {
            httpService.get('/account').then(function (response) {
                vmAccountController.user = response.data.user;
                vmAccountController.orderList = response.data.orderList;
            });
        }
    }
})();
