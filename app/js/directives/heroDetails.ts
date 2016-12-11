
function HeroDetails() {

    return {
        restrict: "EA",
        scope: {
            hero: "<"
        },
        template: `
            <div>
                <hr />
                <h3>Hero Details</h3>
                <label>Name: </label><b><editable-field value="hero.name"></editable-field></b><br />
                <label>Class: </label>{{ hero.GetClass() }}<br />
                <label>Health: </label><editable-field value="hero.health"></editable-field><br />
                <label>Mana: </label><editable-field value="hero.mana"></editable-field><br />
                <button ng-click="sayHello()">Say Hello!</button>
                <button ng-click="askToSayHi()">Ask to say hi!</button>
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
            $scope.askToSayHi = this.AskToSayHi.bind(this);
            $scope.$on("sayHi", this.SayHello.bind(this));
        }

        SayHello(): void {
            console.log(`Hello from ${this.$scope.hero.name}!`);
        }

        AskToSayHi(): void {
            this.$scope.$emit("askToSayHi");
        }

        EditName($event: JQueryEventObject): void {
            let el = $event.target.nextElementSibling as HTMLElement;
            el.hidden = false;
            el.focus();
        }

        BlurTriggered($event: JQueryEventObject): void {
            let el = $event.target as HTMLElement;
            el.hidden = true;
        }

    }

    app.mainModule.controller("HeroDetailsController", HeroDetailsController);

}