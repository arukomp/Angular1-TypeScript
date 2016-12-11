
function EditableField() {

    return {
        restrict: "E",
        scope: {
            value: "="
        },
        template: `
            <span ng-click="fieldCtrl.Edit($event)">{{ value }}</span>
            <input ng-model="value" ng-blur="fieldCtrl.BlurTriggered($event)" hidden="true" />
        `,
        controller: "EditableFieldController",
        controllerAs: "fieldCtrl"
    };

}

app.mainModule.directive("editableField", EditableField);

namespace app.controllers {

    class EditableFieldController {
        static $inject = [];

        constructor() {}

        Edit($event: JQueryEventObject): void {
            let el = $event.target.nextElementSibling as HTMLElement;
            ($event.target as HTMLElement).hidden = true;
            el.hidden = false;
            el.focus();
        }

        BlurTriggered($event: JQueryEventObject): void {
            let el = $event.target as HTMLElement;
            el.hidden = true;
            (el.previousElementSibling as HTMLElement).hidden = false;
        }
    }

    app.mainModule.controller("EditableFieldController", EditableFieldController);

}
