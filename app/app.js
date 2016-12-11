var app;
(function (app) {
    app.mainModule = angular.module("app", []);
})(app || (app = {}));
/// <reference path="./js/app.ts" /> 
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var AppController = (function () {
            function AppController(scope) {
                this.scope = scope;
                this.heroes = [
                    new Hero("Draven", HeroClass.Hunter, 450, 200),
                    new Hero("Janna", HeroClass.Priest, 350, 300),
                    new Hero("Tryndamere", HeroClass.Warrior, 550, 0),
                    new Hero("Vayne", HeroClass.Hunter, 430, 210)
                ];
                scope.name = "Arunas";
            }
            AppController.prototype.AskToSayHi = function () {
                this.scope.$broadcast("sayHi");
            };
            return AppController;
        }());
        AppController.$inject = ["$scope"];
        controllers.AppController = AppController;
        app.mainModule.controller("AppController", AppController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
function HeroDetails() {
    return {
        restrict: "EA",
        scope: {
            hero: "<"
        },
        template: "\n            <div>\n                <h3>Hero Details</h3>\n                <label>Name: </label><b>{{ hero.name }}</b><br />\n                <label>Class: </label>{{ hero.GetClass() }}<br />\n                <label>Health: </label>{{ hero.health }}<br />\n                <label>Mana: </label>{{ hero.mana }}<br />\n                <button ng-click=\"sayHello()\">Say Hello!</button>\n            </div>\n        ",
        controller: "HeroDetailsController",
        controllerAs: "heroCtrl"
    };
}
app.mainModule.directive("heroDetails", HeroDetails);
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var HeroDetailsController = (function () {
            function HeroDetailsController($scope) {
                this.$scope = $scope;
                $scope.sayHello = this.SayHello.bind(this);
                $scope.$on("sayHi", this.SayHello.bind(this));
            }
            HeroDetailsController.prototype.SayHello = function () {
                console.log("Hello from " + this.$scope.hero.name + "!");
            };
            return HeroDetailsController;
        }());
        HeroDetailsController.$inject = ["$scope"];
        app.mainModule.controller("HeroDetailsController", HeroDetailsController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
var HeroClass;
(function (HeroClass) {
    HeroClass[HeroClass["Warrior"] = 1] = "Warrior";
    HeroClass[HeroClass["Mage"] = 2] = "Mage";
    HeroClass[HeroClass["Rogue"] = 3] = "Rogue";
    HeroClass[HeroClass["Hunter"] = 4] = "Hunter";
    HeroClass[HeroClass["Warlock"] = 5] = "Warlock";
    HeroClass[HeroClass["Paladin"] = 6] = "Paladin";
    HeroClass[HeroClass["Priest"] = 7] = "Priest";
})(HeroClass || (HeroClass = {}));
var Hero = (function () {
    function Hero(name, heroClass, health, mana) {
        this.name = name;
        this.heroClass = heroClass;
        this.health = health;
        this.mana = mana;
    }
    Hero.prototype.Talk = function () {
        console.log("Hello from " + name + "!");
    };
    Hero.prototype.GetClass = function () {
        return HeroClass[this.heroClass];
    };
    return Hero;
}());
