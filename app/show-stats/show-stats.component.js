'use strict';

angular.module("showStats").component("showStats", {
    templateUrl: "show-stats/show-stats.template.html",
    controller: ["localStorageService", "common", "moment", function ShowStatsController(localStorageService, common, moment) {

        this.companyName = common.getCurrentCompanyName();
        this.tasks = common.getTasks();

        this.showDuration = (td) => {
            let d = moment.duration(td);
            return d.humanize();
        };

        this.chartConfig = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: '<b>Time Distribution of Tasks for ' + this.companyName + '</b>'
            },
            tooltip: {
                pointFormat: '{point.hours} - <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: { enabled: false },
                    showInLegend: true,
                    point: {
                        events: {
                            legendItemClick: function (e) {
                                e.preventDefault();
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'Tasks',
                colorByPoint: true,
                data: this.tasks.map(t => ({ "name": t.taskName, 
                                             "y": t.totalDuration, 
                                             "hours": this.showDuration(t.totalDuration)}))
            }],
            credits: false,
            exporting: false
        };
    }]
});