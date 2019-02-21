'use strict';

angular.module("homePage").component("homePage", {
    templateUrl: "home-page/home-page.template.html",
    controller: ["$interval", "localStorageService", "common", "moment", function HomePageController($interval, localStorageService, common, moment) {

        // return the current duration of the timer from the local storage
        this.getCurrentDuration = () => {
            return moment.duration(common.getCurrentDuration());
        };

        // returns true if the timer is running
        this.isRunning = common.getTimerRunning;

        this.currentCompany = common.getCurrentCompany();
        this.currentTaskName = common.getCurrentTaskName();
        this.currentTaskNum = common.getCurrentTaskNum();

        if (common.getTimerRunning() === null) {
            common.setTimerRunning(false);
        }

        this.startTimer = () => {
            // if no company or task is selected, do not start the timer
            if(this.currentCompany === undefined || this.currentTaskName === "No tasks"){
                return;
            }
            // if this is the first run for the task, initialize its startTime to the current time
            if (this.currentCompany.tasks[this.currentTaskNum].startTime === 0) {
                this.currentCompany.tasks[this.currentTaskNum].startTime = moment().format("DD-MM-Y HH:mm:ss");
                common.setCompany(this.currentCompany.name, this.currentCompany);
            }

            // if the counter is being run for the first time or it has been reset
            if (common.getCurrentDuration() === null) {
                common.setCurrentDuration(0);
            }

            common.setTimerRunning(true);

            // temp variables to get the exact difference between two moments
            let curM;
            let prevM = moment();

            this.counter = $interval(() => {
                if (this.isRunning()) {
                    curM = moment();
                    common.addToCurrentDuration(curM.diff(prevM, "milliseconds"));
                    prevM = curM;
                    console.log(moment.duration(common.getCurrentDuration()).asSeconds());
                }
                else{
                    $interval.cancel(this.counter);
                }
            }, 1000);
        };

        this.stopTimer = () => {
            common.setTimerRunning(false);
        };

        this.resetTimer = () => {
            if (this.isRunning()) {
                this.stopTimer();
            }
            common.setCurrentDuration(null);
        };
    }]
});