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
        $scope.movie;



        $http.get('https://api.powerbi.com/beta/myorg/reports').then(function (response) {
            $scope.reports = response.data.value;
            $scope.selectedReport = $scope.reports[0].embedUrl;
        });


        $scope.movieNames = null;
        $scope.movieName = null;
        $scope.movieBoxOffices = null;
        $scope.movieBoxOffice = null;
        $scope.movieRatings = null;
        $scope.movieRating = null;

        $scope.loadUsers = function() {
            // Use timeout to simulate a 650ms request.
            return $timeout(function() {
                $scope.movieNames =  $scope.movieNames  || [
                        { id: 1, name: 'Scooby Doo',  },
                        { id: 2, name: 'Shaggy Rodgers' },
                        { id: 3, name: 'Fred Jones' },
                        { id: 4, name: 'Daphne Blake' },
                        { id: 5, name: 'Velma Dinkley' }
                    ];
                $scope.movieBoxOffices =  $scope.movieBoxOffices  || [
                        { id: 1, boxOffice: 5634,  },
                        { id: 2, boxOffice: 43565463 },
                        { id: 3, boxOffice: 234254 },
                        { id: 4, boxOffice: 3456347 },
                        { id: 5, boxOffice: 354667 }
                    ];
                $scope.movieRatings =  $scope.movieRatings  || [
                        { id: 1, rating: 1,  },
                        { id: 2, rating: 2 },
                        { id: 3, rating: 3 },
                        { id: 4, rating: 4 },
                        { id: 5, rating: 5 }
                    ];
            }, 650);
        };

        $scope.createMovie = function createMovie(movie){
            return $http.post('http://moviewebapi.azurewebsites.net/api/movies', movie)
                .succes(alert("Movie has been created!!"));
        }


    }]);
;