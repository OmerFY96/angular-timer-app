'use strict';

angular.module("core").service("common", function (localStorageService, moment) {

    /*
     * - The current company name is saved in the local storage 
     *   with the key "comp.curCompanyName".
     * - The current duration of the timer is saved in the local storage 
     *   with the the key "comp.currentDuration".
     * - The current state of the timer (running/paused) is saved in the local storage
     *   with the key "comp.isRunning".
     */

    // return array of company objects stored in the local storage
    this.getCompanies = () => {
        return localStorageService.keys().filter(k => k.substring(0, 5) !== "comp.").
            map(i => localStorageService.get(i));
    };

    // store a new company object in the local storage
    this.setCompany = (name, company) => {
        localStorageService.set(name, company);
    };

    // set the currently selected company
    this.setCurrentCompany = (name) => {
        localStorageService.set("comp.curCompanyName", name);
    };

    // return the name of the currently selected company
    this.getCurrentCompanyName = () => {
        return localStorageService.get("comp.curCompanyName");
    };

    // return the current company object from the local storage
    this.getCurrentCompany = () => {
        return localStorageService.get(this.getCurrentCompanyName());
    };

    // return the tasks of the current company
    // return empty array if no company is selected
    this.getTasks = () => {
        if (this.getCurrentCompany() === null) {
            return [];
        }
        else {
            return this.getCurrentCompany().tasks;
        }
    };

    // change the taskNum of the current company to n
    this.setCurrentTaskNum = (n) => {
        let c = this.getCurrentCompany();
        c.taskNum = n;
        this.setCompany(c.name, c);
    };

    // return the index of the current task
    this.getCurrentTaskNum = () => {
        if (this.getCurrentCompany() === null) {
            return null;
        }
        else {
            return this.getCurrentCompany().taskNum;
        }
    };

    // return the name of the currently selected task of the company
    // if the company has no tasks or there is no company selected return "No tasks"
    this.getCurrentTaskName = () => {
        if (this.getCurrentCompany() === null || this.getCurrentCompany().tasks.length === 0) {
            return "No tasks";
        }
        else {
            return this.getCurrentCompany().tasks[this.getCurrentTaskNum()].taskName;
        }
    };

    // set the current timer duration to d (milliseconds)
    this.setCurrentDuration = (d) => {
        localStorageService.set("comp.currentDuration", d);
    };

    // return the duration of the timer (milliseconds)
    this.getCurrentDuration = () => {
        return localStorageService.get("comp.currentDuration");
    };

    // add d to the total duration of the current task
    this.addTotalDuration = (d) => {
        let c = this.getCurrentCompany();
        try {
            c.tasks[this.getCurrentTaskNum()].totalDuration += d;
        }
        catch (e) { }
        this.setCompany(c.name, c);
    };

    // add d to the current duration of the timer
    this.addToCurrentDuration = (d) => {
        this.addTotalDuration(d);
        let total = this.getCurrentDuration() + d;
        this.setCurrentDuration(total);
    };

    // return the state of the timer (true if running, false if paused)
    this.getTimerRunning = () => {
        return localStorageService.get("comp.isRunning");
    };

    // set the state of the timer
    this.setTimerRunning = (b) => {
        localStorageService.set("comp.isRunning", b);
    };
});