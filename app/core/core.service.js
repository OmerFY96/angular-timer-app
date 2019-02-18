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

    // change the taskNum of the current company to n
    this.setCurrentTaskNum = (n) => {
        let c = this.getCurrentCompany();
        c.taskNum = n;
        this.setCompany(c.name, c);
    };

    // set the current timer duration to d (milliseconds)
    this.setCurrentDuration = (d) => {
        localStorageService.set("comp.currentDuration", d);
    };
});