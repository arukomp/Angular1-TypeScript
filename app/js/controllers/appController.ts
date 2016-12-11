namespace app.controllers {

    export class AppController {
        static $inject: Array<string> = ["$scope"];

        constructor(public scope: any) {
            scope.name = "Arunas";
            scope.$on("askToSayHi", this.AskToSayHi.bind(this));
        }

        public heroes: Array<Hero> = [
            new Hero("Draven", HeroClass.Hunter, 450, 200),
            new Hero("Janna", HeroClass.Priest, 350, 300),
            new Hero("Tryndamere", HeroClass.Warrior, 550, 0),
            new Hero("Vayne", HeroClass.Hunter, 430, 210)
        ];

        AskToSayHi(): void {
            this.scope.$broadcast("sayHi");
        }

        AddNewHero(): void {
            this.heroes.unshift(new Hero("<Hero Name>", HeroClass.Warlock, 400, 300));
        }

    }

    app.mainModule.controller("AppController", AppController);

}