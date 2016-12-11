
function HeroDetails() {

    return {
        restrict: "EA",
        scope: {
            hero: "<"
        },
        template: `
            <div>
                <h3>Hero Details</h3>
                <label>Name: </label><b>{{ hero.name }}</b><br />
                <label>Class: </label>{{ hero.GetClass() }}<br />
                <label>Health: </label>{{ hero.health }}<br />
                <label>Mana: </label>{{ hero.mana }}<br />
                <button ng-click="sayHello()">Say Hello!</button>
            </div>
        `,
        controller: "HeroDetailsController",
        controllerAs: "heroCtrl"

    };

}

app.mainModule.directive("heroDetails", HeroDetails);

namespace app.controllers {

    class HeroDetailsController {
        static $inject = ["$scope"];

        constructor(public $scope) {
            $scope.sayHello = this.SayHello.bind(this);
            $scope.$on("sayHi", this.SayHello.bind(this));
        }

        SayHello(): void {
            console.log(`Hello from ${this.$scope.hero.name}!`);
        }

    }

    app.mainModule.controller("HeroDetailsController", HeroDetailsController);

}