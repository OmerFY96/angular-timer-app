'use strict';

angular.module("clearData").component("clearData", {
    templateUrl: "clear-data/clear-data.template.html",
    controller: ["localStorageService", "$mdDialog",
        function ClearDataController(localStorageService, $mdDialog) {
            
            // delete the data in the local storage 
            this.clearAppData = (ev) => {
                localStorageService.clearAll();
                console.log("All data has been cleared.");
                this.showAlert(ev);
            };

            this.showAlert = (ev) => {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .textContent('All data has been cleared.')
                        .ariaLabel('Data cleared alert')
                        .ok('OK')
                        .targetEvent(ev)
                );
            };
        }]
});