'use strict';

angular.module('casusMIT3.index', ['ngRoute', 'AdalAngular'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/index', {
            templateUrl: 'index/index.html',
            controller: 'indexCtrl',
            requireADLogin: true
        });
    }])


    .controller('indexCtrl', ['adalAuthenticationService', '$http', '$scope', '$timeout', function (adalService, $http, $scope,$timeout) {

        $scope.reports;
        $scope.selectedReport;

        $http.get('https://api.powerbi.com/beta/myorg/reports').then(function (response) {
            $scope.reports = response.data.value;
            $scope.selectedReport = $scope.reports[0].embedUrl;
        });

        $scope.user = null;
        $scope.users = null;
        $scope.loadUsers = function() {
            // Use timeout to simulate a 650ms request.
            return $timeout(function() {
                $scope.users =  $scope.users  || [
                        { id: 1, name: 'Scooby Doo' },
                        { id: 2, name: 'Shaggy Rodgers' },
                        { id: 3, name: 'Fred Jones' },
                        { id: 4, name: 'Daphne Blake' },
                        { id: 5, name: 'Velma Dinkley' }
                    ];
            }, 650);
        };


    }]);
;