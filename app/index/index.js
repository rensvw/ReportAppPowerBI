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

        $scope.movieNamesLoad = function() {
            // Use timeout to simulate a 650ms request.
            return $timeout(function() {
                $scope.movieNames =  $scope.movieNames  || [
                        { id: 1, Name: 'Scooby Doo',  },
                        { id: 2, Name: 'Shaggy Rodgers' },
                        { id: 3, Name: 'Fred Jones' },
                        { id: 4, Name: 'Daphne Blake' },
                        { id: 5, Name: 'Velma Dinkley' }
                    ];

            }, 650);
        };

        $scope.movieBoxOfficesLoad = function() {
            // Use timeout to simulate a 650ms request.
            return $timeout(function() {

                $scope.movieBoxOffices =  $scope.movieBoxOffices  || [
                        { id: 1, BoxOffice: 5634,  },
                        { id: 2, BoxOffice: 43565463 },
                        { id: 3, BoxOffice: 234254 },
                        { id: 4, BoxOffice: 3456347 },
                        { id: 5, BoxOffice: 354667 }
                    ];

            }, 650);
        };

        $scope.movieRatingsLoad = function() {
            // Use timeout to simulate a 650ms request.
            return $timeout(function() {

                $scope.movieRatings =  $scope.movieRatings  || [
                        { id: 1, Rating: 1,  },
                        { id: 2, Rating: 2 },
                        { id: 3, Rating: 3 },
                        { id: 4, Rating: 4 },
                        { id: 5, Rating: 5 }
                    ];
            }, 650);
        };

        $scope.createMovie = function createMovie(movie){
            return $http.post('http://moviewebapi.azurewebsites.net/api/movies', movie)
                .succes(alert("Movie has been created!!"));
        };

        $scope.alert = function alert(movie){
            return alert(movie);
        };

    }]);
