var app = angular.module('app', []);

app.controller('AppController', AppController);

AppController.$inject = ['$scope', '$http'];
function AppController($scope, $http) {
    $scope.name = "Arunas";
}