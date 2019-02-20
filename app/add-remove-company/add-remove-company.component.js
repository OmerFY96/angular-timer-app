'use strict';

angular.module("addRemoveCompany").component("addRemoveCompany", {
    templateUrl: "add-remove-company/add-remove-company.template.html",
    controller: ["localStorageService", "common", function AddRemoveCompanyController(localStorageService, common) {

        this.newCompany = "";
        this.companies = common.getCompanies();

        // return a new company object with the given name
        this.makeNewCompany = (cName) => {
            return {
                "name": cName,
                "toBeRemoved": false,
                "taskNum": null,
                "tasks": []
            };
        };

        // add a new company object to the local storage
        this.addCompany = () => {
            let newComp = this.makeNewCompany(this.newCompany);
            common.setCompany(this.newCompany, newComp);
            common.setCurrentCompany(this.newCompany);
            common.setCurrentTaskNum(null);
            common.setCurrentDuration(null);
            this.companies = common.getCompanies();
            this.newCompany = "";
        };

        // remove all the companies with toBeRemoved === true
        this.removeCompanies = () => {
            // remove the selected companies
            this.companies.forEach((comp) => {
                if (comp.toBeRemoved) {
                    localStorageService.remove(comp.name);
                }
            });
            this.companies = common.getCompanies();

            // if the current company is removed
            if (common.getCurrentCompany() === null) {
                // if there are no more companies left, set the current company to "No company"
                if (this.companies.length === 0) {
                    common.setCurrentCompany("No company");
                }
                // otherwise set the current company to the one at index 0
                else {
                    common.setCurrentCompany(this.companies[0].name);
                }
                common.setCurrentDuration(null);
            }
        };
    }]
});