'use strict';

// Declare app level module which depends on views, and components
angular.module('casusMIT3', [
    'ngRoute',
    'casusMIT3.index',
    'casusMIT3.results',
    'ui.bootstrap',
    'AdalAngular',
    'ngMaterial'
]).config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', '$sceDelegateProvider', function ($routeProvider, $httpProvider, adalAuthenticationServiceProvider, $sceDelegateProvider) {

    $routeProvider.otherwise({
        redirectTo: '/index'
    });

    adalAuthenticationServiceProvider.init({
            tenant: "4c4da4a8-6a78-4ea2-8593-ae0608a6200b", // microsoft.onmicrosoft.com
            clientId: "39596d89-8c4a-49ad-b299-69dbc7a7cd28", // Power BI AngularJS SPA
            redirectUri: "vwoudenberg.onmicrosoft.com/api",
            endpoints: {
                'https://api.powerbi.com': "https://analysis.windows.net/powerbi/api",
                'https://moviewebapi.azurewebsites.net':"d8e0d928-a0b5-494f-9ea2-d3878d9362fa"
            },
            requireADLogin: true,
            cacheLocation: 'localStorage'
        },
        $httpProvider
    );

    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://*.powerbi.com/**'
    ]);

}]);
