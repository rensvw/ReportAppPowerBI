/**
 * Created by rensvanw on 4/7/2016.
 */
angular.module('casusMIT3')
    .factory('powerBi', ['$http', function ($http) {

        var urlBase = 'https://api.powerbi.com/v1.0/myorg';
        var powerBi = {};

        /// List Dashboards ///

        powerBi.listAllDashboards = function () {
            return $http.get(urlBase + '/dashboards');
        };

        /// Get tiles ///

        powerBi.listAllTiles = function (dashboardID) {
            return $http.get(urlBase + '/' + dashboardID + '/tiles');
        };

        powerBi.getTile = function (dashboardID, tileID) {
            return $http.get(urlBase + '/' + dashboardID + '/tiles/' + tileID);
        };

        /// Get Reports //

        powerBi.listAllReports = function () {
            return $http.get(urlBase + '/reports');
        };

        /// DataSet Get + Post functions ///

        powerBi.listAllDataSets = function () {
            return $http.get(urlBase + '/datasets');
        };

        powerBi.CreateDataSet = function (dataset) {
            return $http.post(urlBase + '/datasets?defaultRetentionPolicy=None', dataset);
        };

        /// Table functions ///

        powerBi.listAllTables = function (id) {
            return $http.get(urlBase + '/datasets/' + id + '/tables');
        };

        powerBi.addRowToTable = function (id, tableName, row) {
            return $http.post(urlBase + '/datasets/' + id + '/tables/' + tableName + '/rows', row);

        };

        powerBi.updateExistingTable = function (id, tableName, item) {
            return $http.put(urlBase + '/datasets/' + id + '/tables/' + tableName, item);
        };

        powerBi.clearRowsTable = function (id, tableName) {
            return $http.delete(urlBase + '/datasets/' + id + '/tables/' + tableName + '/rows');
        };

        /// List Groups (Tile collections) ///

        powerBi.listAllGroups = function () {
            return $http.get(urlBase + '/groups');
        };

        return powerBi;

    }


    ]);

