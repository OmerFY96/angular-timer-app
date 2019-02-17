'use strict'

angular.module("myApp").config(["$routeProvider",
    function config($routeProvider){
        $routeProvider.when("/home-page", {
            template: "<home-page></home-page>"
        }).
        when("/add-remove-company", {
            template: "<add-remove-company></add-remove-company>"
        }).
        when("/add-remove-task", {
            template: "<add-remove-task></add-remove-task>"
        }).
        when("/change-company-task", {
            template: "<change-company-task></change-company-task>"
        }).
        when("/show-stats", {
            template: "<show-stats></show-stats>"
        }).
        when("/clear-data", {
            template: "<clear-data></clear-data>"
        }).
        otherwise("/home-page")
    }]);