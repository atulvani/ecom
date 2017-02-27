'use strict';

(function () {
    angular
        .module('app')
        .controller('authController', authController);

    authController.$inject =[];
    function authController () {
        var vmAuthController = this;

        vmAuthController.isForgotPassword = false;
    }
})();
