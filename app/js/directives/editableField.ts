
function EditableField() {

    return {
        restrict: "E",
        scope: {
            value: "=",
            enum: "<"
        },
        template: `
            <span ng-click="fieldCtrl.Edit($event)">{{ fieldCtrl.GetValue() }}</span>
            <input ng-model="value" ng-blur="fieldCtrl.BlurTriggered($event)" hidden="true" />
            <select ng-model="value" hidden="true" ng-blur="fieldCtrl.BlurTriggered($event)">
                <option ng-repeat="(heroClass, heroClassName) in enum" value="{{ heroClass }}">{{ heroClassName }}</option>
            </select>
        `,
        controller: "EditableFieldController",
        controllerAs: "fieldCtrl"
    };

}

app.mainModule.directive("editableField", EditableField);

namespace app.controllers {

    class EditableFieldController {
        static $inject = ["$scope"];

        constructor(public scope) {}

        Edit($event: JQueryEventObject): void {
            let el: HTMLElement;
            if (this.scope.enum) {
                el = $event.target.parentElement.querySelector("select") as HTMLElement;
            } else {
                el = $event.target.parentElement.querySelector("input") as HTMLElement;
            }
            ($event.target as HTMLElement).hidden = true;
            el.hidden = false;
            el.focus();
        }

        BlurTriggered($event: JQueryEventObject): void {
            let el = $event.target as HTMLElement;
            el.hidden = true;
            (el.parentElement.querySelector("span") as HTMLElement).hidden = false;
        }

        GetValue(): void {
            if (this.scope.enum) {
                return this.scope.enum[this.scope.value];
            } else {
                return this.scope.value;
            }
        }
    }

    app.mainModule.controller("EditableFieldController", EditableFieldController);

}
