'use strict';

angular.module("changeCompanyTask").component("changeCompanyTask", {
    templateUrl: "change-company-task/change-company-task.template.html",
    controller: ["localStorageService", "common", function ChangeCompanyTaskController(localStorageService, common) {

        this.companies = common.getCompanies();
        this.selectedCompanyName = common.getCurrentCompanyName();

        this.tasks = common.getTasks();
        this.selectedTaskName = common.getCurrentTaskName();

        this.changeCurrentCompany = () => {
            common.setCurrentCompany(this.selectedCompanyName);
            common.setCurrentDuration(null);
        };

        this.changeCurrentTask = () => {
            for (let i = 0; i < this.tasks.length; ++i) {
                if (this.tasks[i].taskName === this.selectedTaskName) {
                    common.setCurrentTaskNum(i);
                    common.setCurrentDuration(null);
                    return;
                }
            }
        };

        this.updateTasks = () => {
            this.tasks = common.getTasks();
            this.selectedTaskName = common.getCurrentTaskName();
        };
    }]
});