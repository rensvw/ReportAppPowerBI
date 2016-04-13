'use strict';

angular.module('casusMIT3.index', ['ngRoute', 'AdalAngular'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/index', {
            templateUrl: 'index/index.html',
            controller: 'indexCtrl'
        });
    }])


    .controller('indexCtrl', ['adalAuthenticationService', '$http', '$scope', '$timeout', function (adalService, $http, $scope,$timeout) {

        $scope.reports;
        $scope.selectedReport;
        $scope.movie;
        $scope.movies;
        $scope.error;

        $http.get("https://moviewebapi.azurewebsites.net/api/movies").success(function (data) {
                $scope.movies = data;
                $scope.loading = false;
            })
            .error(function () {
                $scope.error = "An Error has occured while loading projects!";
                $scope.loading = false;
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
                        { Name: 'Scooby Doo'  },
                        { Name: 'Shaggy Rodgers' },
                        { Name: 'Fred Jones' },
                        { Name: 'Daphne Blake' },
                        { Name: 'Velma Dinkley' }
                    ];

            }, 650);
        };

        $scope.movieBoxOfficesLoad = function() {
            // Use timeout to simulate a 650ms request.
            return $timeout(function() {

                $scope.movieBoxOffices =  $scope.movieBoxOffices  || [
                        { BoxOffice: 5634 },
                        { BoxOffice: 43565463 },
                        { BoxOffice: 234254 },
                        { BoxOffice: 3456347 },
                        { BoxOffice: 354667 }
                    ];

            }, 650);
        };

        $scope.movieRatingsLoad = function() {
            // Use timeout to simulate a 650ms request.
            return $timeout(function() {

                $scope.movieRatings =  $scope.movieRatings  || [
                        { Rating: 1 },
                        { Rating: 2 },
                        { Rating: 3 },
                        { Rating: 4 },
                        { Rating: 5 }
                    ];
            }, 650);
        };



        $scope.createMovie = function () {
            $scope.loading = true;
            $scope.movie = this.movie;
            $http.post("https://moviewebapi.azurewebsites.net/api/movies", this.newproject)
                .success(function (data) {
                    alert("Added Successfully!!");
                    $scope.addMode = false;
                    $scope.loading = false;
                }).error(function (data) {
                alert("Something went wrong, Error message: " + JSON.stringify(data));
                $scope.loading = false;
            });
        };

        $scope.alert = function(){
            $scope.movie = this.movie;
            return alert(this.movie);
        };

    }]);
