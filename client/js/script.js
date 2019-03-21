console.log("test")

let numberOfMatchesPlayed, matchesWonPerTeam, extraRunsPerTeam, bowlersEconomies




fetch("http://127.0.0.1:5500/data/number_of_matches.json")
    .then((response) => response.json())
    .then((data) => numberOfMatchesPlayed = data)
    .then(() => {
        plotChart('number-of-matches', numberOfMatchesPlayed, 'Number of matches played per year')
    })

fetch("http://127.0.0.1:5500/data/matches_won_per_team.json")
    .then((response) => response.json())
    .then((data) => matchesWonPerTeam = data)
    .then(() => {
        let dataObj = []
        for (let key in matchesWonPerTeam) {
            for (let year = 2008; year < 2018; year++) {
                if (!Object.keys(matchesWonPerTeam[key]).includes(year.toString(10))) {
                    matchesWonPerTeam[key][year.toString(10)] = 0;
                }
            }
        }
        for (let key in matchesWonPerTeam) {
            dataObj.push({ name: key, data: Object.values(matchesWonPerTeam[key]) })
        }
        console.log(dataObj)


        document.addEventListener('DOMContentLoaded', function () {
            console.log('dom loaded')

            Highcharts.chart('matches-won', {

                title: {
                    text: 'Matches won per team per year in all years of IPL'
                },
                yAxis: {
                    title: {
                        text: 'Number of matches won'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2008
                    }
                },

                series: dataObj,

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }

            })
        })

    })


fetch("http://127.0.0.1:5500/data/extra_runs_per_team.json")
    .then((response) => response.json())
    .then((data) => extraRunsPerTeam = data)
    .then(() => {
        plotChart('extra-runs', extraRunsPerTeam, 'Extra runs per team in the year 2016')
    })


fetch("http://127.0.0.1:5500/data/bowlers_economy.json")
    .then((response) => response.json())
    .then((data) => bowlersEconomies = data)
    .then(() => {
        let arr = []
        for (bowler in bowlersEconomies) {
            arr.push([bowler, bowlersEconomies[bowler]])
        }
        arr.sort((a, b) => { return a[1] - b[1] })
        arr.length = 5
        return arr
    })
    .then((arr) => {
        let bowlers = arr.reduce((bowlers, bowler) => {
            bowlers.push(bowler[0])
            return bowlers
        }, [])
        console.log(bowlers)
        document.addEventListener('DOMContentLoaded', function () {
            Highcharts.chart('economical-bowlers', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Top five economical bowlers of the year 2015'
                },
                xAxis:
                {
                    categories: bowlers
                },
                series: [{
                    name: "bowler economy",
                    colorByPoint: "true",
                    data: arr
                }]

            })
        })
    })







function plotChart(element, data, title) {
    document.addEventListener('DOMContentLoaded', function () {
        Highcharts.chart(element, {
            chart: {
                type: 'column'
            },
            title: {
                text: title
            },
            xAxis:
            {
                categories: Object.keys(data)
            },
            series: [{
                name: title,
                colorByPoint: "true",
                data: Object.values(data)
            }]

        })
    })
}