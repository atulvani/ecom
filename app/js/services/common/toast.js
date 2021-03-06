'use strict';

(function () {
    angular
        .module('app')
        .factory('toastService', toastService);

    toastService.$inject = ['$compile', '$rootScope'];
    function toastService ($compile, $rootScope) {
        var html = '<div class="toast" uib-alert ng-class="className" dismiss-on-timeout="5000" close="close()">{{content}}</div>';
        return {
            success: function (content) {
                var scope = $rootScope.$new(true),
                    compiledHtml;

                scope.content = content;
                scope.className = 'alert-success';
                scope.close = function () { angular.element(compiledHtml).remove(); };

                compiledHtml = angular.element($compile(html)(scope)).appendTo('body');
            }
        };
    }
})();
