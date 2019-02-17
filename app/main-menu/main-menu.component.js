'use strict';

angular.module("mainMenu").component("mainMenu", {
    templateUrl: "main-menu/main-menu.template.html",
    controller: function MainMenuController($mdSidenav) {

        function buildToggler(componentId) {
            return function() {
                $mdSidenav(componentId).toggle();
            }
        };

        this.toggleLeft = buildToggler("left");
        this.pages = [
            {
                "name": "HOME", 
                "icon": "img/baseline-home-24px.svg", 
                "url": "#!/home-page", 
                "label": "Go to home page"
            },
            {
                "name": "ADD/REMOVE COMPANY", 
                "icon": "img/baseline-add_circle_outline-24px.svg", 
                "url": "#!/add-remove-company", 
                "label": "Go to add remove company page"
            },
            {
                "name": "ADD/REMOVE TASK", 
                "icon": "img/baseline-add_circle-24px.svg", 
                "url": "#!/add-remove-task", 
                "label": "Go to add remove task page"
            },
            {
                "name": "CHANGE COMPANY/TASK", 
                "icon": "img/baseline-autorenew-24px.svg", 
                "url": "#!/change-company-task", 
                "label": "Go to change company and task page"
            },
            {
                "name": "SHOW STATISTICS", 
                "icon": "img/baseline-trending_up-24px.svg", 
                "url": "#!/show-stats", 
                "label": "Go to statistics page"
            },
            {
                "name": "CLEAR DATA", 
                "icon": "img/baseline-delete-24px.svg", 
                "url": "#!/clear-data", 
                "label": "Clear app data"
            }
        ];
    }
});