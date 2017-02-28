'use strict';

(function () {
    describe('appController', function () {
        var scope, vmAppController, httpService, $location, toast;
        beforeEach(function () {
            module('app');
            module(function ($provide) {
                $provide.value('httpService', {
                    get: function (url) {
                        switch (url) {
                            case '/categoryList':
                                return {
                                    then: function (cb) {
                                        cb({data: [{}, {}, {}]});
                                    }
                                };
                            default:
                                return {then: function (cb) { cb({}); }};
                        }
                    }
                });
            });
        });
        beforeEach(inject (function ($rootScope, $controller, _httpService_, _$location_, _toast_) {
            httpService = _httpService_;
            $location = _$location_;
            toast = _toast_;
            vmAppController = $controller('appController', {$scope: $rootScope.$new()});
        }));
        describe('function.init', function () {
            it('should be defined', function () {
                expect(vmAppController).toBeDefined();
                expect(vmAppController.categoryList.length).toBe(3);
            });
        });
        describe('function.login', function () {
            it('should get user\'s data', function () {
                spyOn(httpService, 'get').and.returnValue({then: function (cb) { cb({data: {name: 'John Doe'}}); }});
                vmAppController.login();
                expect(httpService.get).toHaveBeenCalledWith('/user');
                expect(vmAppController.user.name).toBe('John Doe');
            });
            it('should redirect to my account page, if user is on the login page', function () {
                spyOn(httpService, 'get').and.callThrough();
                spyOn($location, 'path').and.returnValue('/login');
                vmAppController.login();
                expect($location.path).toHaveBeenCalledWith('/account');
            });
            it('should not redirect to my account page, if user is not on the login page', function () {
                spyOn(httpService, 'get').and.callThrough();
                spyOn($location, 'path').and.returnValue('/not-the-login-page');
                vmAppController.login();
                expect($location.path).not.toHaveBeenCalledWith('/account');
            });
        });
        describe('function.logout', function () {
            it('should remove user\'s data', function () {
                vmAppController.user = {name: 'John Doe'};
                vmAppController.logout();
                expect(vmAppController.user).toBe(null);
            });
            it('should redirect to my home page, if user is on the my account page', function () {
                spyOn($location, 'path').and.returnValue('/account');
                vmAppController.logout();
                expect($location.path).toHaveBeenCalledWith('/');
            });
            it('should not redirect to home page, if user is not on the my account page', function () {
                spyOn($location, 'path').and.returnValue('/not-the-my-account-page');
                vmAppController.logout();
                expect($location.path).not.toHaveBeenCalledWith('/');
            });
        });
        describe('function.seach', function () {
            it('should redirect to search page with query parameters', function () {
                vmAppController.searchQuery = 'some product name';
                spyOn($location, 'path');
                vmAppController.search();
                expect($location.path).toHaveBeenCalledWith('/search/' + vmAppController.searchQuery);
            });
        });
        describe('function.sucscribeNewsletter', function () {
            // TODO: TYPO in the function name needs to be fixed
            // TODO: service name should be toastService to be consistent with others
            it('should display success toast', function () {
                spyOn(toast, 'success');
                vmAppController.sucscribeNewsletter();
                expect(toast.success).toHaveBeenCalledWith('Subscribed!!');
            });
        });
    });
})();