'use strict';

angular.module('casusMIT3.results', ['ngRoute', 'AdalAngular', 'ngMaterial'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/results', {
            templateUrl: 'results/results.html',
            controller: 'resultsCtrl',
            requireADLogin: true
        });
    }])

    .controller('resultsCtrl', ['$scope', 'powerBi', 'adalAuthenticationService', '$http', function ($scope, powerBi,adal,$http) {

        var iframe = document.getElementById("report");
        iframe.addEventListener("load", function () {
            var token = adal.getCachedToken("https://analysis.windows.net/powerbi/api");
            iframe.contentWindow.postMessage(JSON.stringify({ action: "loadReport", accessToken: token }), "*");
        });

        // Get the list of workspaces
        $http.get('https://api.powerbi.com/beta/myorg/groups').then(function (response) {
            $scope.workspaces = [{ name: 'My Workspace', id: null }].concat(response.data.value);
        }, function (error) {
            $scope.workspaceError = error;
        });

        function addRowToTable() {
            powerBi.addRowToTable(id,tableName,row);
        }
        $scope.table = $scope.datasets;

        $scope.datasetID = powerBi.listAllDataSets().then(
            function (response) {
                $scope.datasetID = (response.data.value[0].id);
                console.log($scope.datasetID);
            }
        );

        function listAllDashboards() {
            powerBi.listAllDashboards()
                .then(function (response) {
                    $scope.dashboards = response.data.value;

                }, function (error) {
                    $scope.status = "Unable to load Dashboard data: " + error.message;

                })
        }

        function getDashboardTile() {
            powerBi.listAllTiles('a34b834a-8988-490e-ad29-3accf6270a98')
                .then(function (response) {
                    $scope.tile = response.data.value;

                }, function (error) {
                    $scope.status = "Unable to load Dashboard Tile data: " + error.message;

                });
        }

        function listAllDatasets() {
            powerBi.listAllDataSets()
                .then(function (response) {
                    $scope.datasets = response.data.value;

                }, function (error) {
                    $scope.status = "Unable to load Datasets Data: " + error.message;

                });
        }

        function listAllTables() {
            powerBi.listAllTables(encodeURIComponent('43d72d66-8ed4-43bb-b4d0-5285caaebdc9'))
                .then(function (response) {
                    $scope.tables = response.data;

                }, function (error) {
                    $scope.status = "Unable to load Table data: " + error.message;

                });

        }


        function listAllGroups() {
            powerBi.listAllGroups()
                .then(function (response) {
                    $scope.groups = response.data;

                }, function (error) {
                    $scope.status = "Unable to load Groups data: " + error.message;

                });
        }

        // Update reports when a new workspace is selected
        $scope.$watch('selectedWorkspace', function (selectedWorkspace) {

            $scope.selectedReport = null
            $scope.reports = null;

            // Get the list of reports
            $http.get('https://api.powerbi.com/beta/myorg/' + (selectedWorkspace ? 'groups/' + selectedWorkspace + '/reports' : 'reports')).then(function (response) {
                $scope.reports = response.data.value;
                $scope.selectedReport = $scope.reports[0].embedUrl;
            }, function (error) {
                $scope.reportError = error;
            });

        });

    }]);