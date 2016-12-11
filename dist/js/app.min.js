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
                scope.$on("askToSayHi", this.AskToSayHi.bind(this));
            }
            AppController.prototype.AskToSayHi = function () {
                this.scope.$broadcast("sayHi");
            };
            AppController.prototype.AddNewHero = function () {
                this.heroes.unshift(new Hero("<Hero Name>", HeroClass.Warlock, 400, 300));
            };
            return AppController;
        }());
        AppController.$inject = ["$scope"];
        controllers.AppController = AppController;
        app.mainModule.controller("AppController", AppController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
function EditableField() {
    return {
        restrict: "E",
        scope: {
            value: "=",
            enum: "<"
        },
        template: "\n            <span ng-click=\"fieldCtrl.Edit($event)\">{{ fieldCtrl.GetValue() }}</span>\n            <input ng-model=\"value\" ng-blur=\"fieldCtrl.BlurTriggered($event)\" hidden=\"true\" />\n            <select ng-model=\"value\" hidden=\"true\" ng-blur=\"fieldCtrl.BlurTriggered($event)\">\n                <option ng-repeat=\"(heroClass, heroClassName) in enum\" value=\"{{ heroClass }}\">{{ heroClassName }}</option>\n            </select>\n        ",
        controller: "EditableFieldController",
        controllerAs: "fieldCtrl"
    };
}
app.mainModule.directive("editableField", EditableField);
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var EditableFieldController = (function () {
            function EditableFieldController(scope) {
                this.scope = scope;
            }
            EditableFieldController.prototype.Edit = function ($event) {
                var el;
                if (this.scope.enum) {
                    el = $event.target.parentElement.querySelector("select");
                }
                else {
                    el = $event.target.parentElement.querySelector("input");
                }
                $event.target.hidden = true;
                el.hidden = false;
                el.focus();
            };
            EditableFieldController.prototype.BlurTriggered = function ($event) {
                var el = $event.target;
                el.hidden = true;
                el.parentElement.querySelector("span").hidden = false;
            };
            EditableFieldController.prototype.GetValue = function () {
                if (this.scope.enum) {
                    return this.scope.enum[this.scope.value];
                }
                else {
                    return this.scope.value;
                }
            };
            return EditableFieldController;
        }());
        EditableFieldController.$inject = ["$scope"];
        app.mainModule.controller("EditableFieldController", EditableFieldController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
function HeroDetails() {
    return {
        restrict: "EA",
        scope: {
            hero: "<"
        },
        template: "\n            <div>\n                <hr />\n                <h3>Hero Details</h3>\n                <label>Name: </label><b><editable-field value=\"hero.name\"></editable-field></b><br />\n                <label>Class: </label><editable-field enum=\"heroCtrl.HeroClass\" value=\"hero.heroClass\"></editable-field><br />\n                <label>Health: </label><editable-field value=\"hero.health\"></editable-field><br />\n                <label>Mana: </label><editable-field value=\"hero.mana\"></editable-field><br />\n                <button ng-click=\"sayHello()\">Say Hello!</button>\n                <button ng-click=\"askToSayHi()\">Ask to say hi!</button>\n            </div>\n        ",
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
                this.HeroClass = HeroClass;
                $scope.sayHello = this.SayHello.bind(this);
                $scope.askToSayHi = this.AskToSayHi.bind(this);
                $scope.$on("sayHi", this.SayHello.bind(this));
            }
            HeroDetailsController.prototype.SayHello = function () {
                console.log("Hello from " + this.$scope.hero.name + "!");
            };
            HeroDetailsController.prototype.AskToSayHi = function () {
                this.$scope.$emit("askToSayHi");
            };
            HeroDetailsController.prototype.EditName = function ($event) {
                var el = $event.target.nextElementSibling;
                el.hidden = false;
                el.focus();
            };
            HeroDetailsController.prototype.BlurTriggered = function ($event) {
                var el = $event.target;
                el.hidden = true;
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
