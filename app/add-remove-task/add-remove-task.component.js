'use strict';

angular.module("addRemoveTask").component("addRemoveTask", {
    templateUrl: "add-remove-task/add-remove-task.template.html",
    controller: ["localStorageService", "common", "moment", function AddRemoveTaskController(localStorageService, common, moment) {

        // Return a new task object with the given name
        this.makeNewTask = (tName) => {
            return {
                "taskName": tName,
                "startTime": 0,
                "totalDuration": 0,
                "toBeRemoved": false
            };
        };

        // return the array of task objects for the current company from the local storage
        // if the company has no tasks return an empty array
        this.getTasks = () => {
            if (common.getCurrentCompany() === null) {
                return [];
            }
            else {
                return common.getCurrentCompany().tasks;
            }
        };

        this.newTask = "";
        this.tasks = this.getTasks();
        this.currentCompanyName = common.getCurrentCompanyName();

        // Add a new task to the tasks list of the current company
        this.addTask = () => {
            let curComp = common.getCurrentCompany();
            let newT = this.makeNewTask(this.newTask);
            curComp.tasks.unshift(newT);
            common.setCompany(curComp.name, curComp);
            common.setCurrentTaskNum(0);
            common.setCurrentDuration(null);
            this.newTask = "";
            this.tasks = this.getTasks();
        };

        // remove all the tasks with toBeRemoved === true from the current company
        this.removeTasks = () => {
            const curTaskName = common.getCurrentTaskName();
            let curComp = common.getCurrentCompany();
            let temp = [];
            this.tasks.forEach((task) => {
                if (!task.toBeRemoved) {
                    temp.push(task);
                }
            });
            curComp.tasks = temp;
            common.setCompany(curComp.name, curComp);
            this.tasks = this.getTasks();

            // if no tasks are left, set the currentTaskNum to null
            if (this.tasks.length === 0) {
                common.setCurrentTaskNum(null);
            }
            // if there are still tasks left
            else {
                // look for the previously selected task
                for (let i = 0; i < this.tasks.length; ++i) {
                    // if found, set the currentTaskNum to its index in the tasks array
                    if (this.tasks[i].taskName === curTaskName) {
                        common.setCurrentTaskNum(i);
                        return;
                    }
                }
                // otherwise (i.e. it was deleted, set the currentTaskNum to 0)
                common.setCurrentTaskNum(0);
            }
            common.setCurrentDuration(null);
        };
    }]
});