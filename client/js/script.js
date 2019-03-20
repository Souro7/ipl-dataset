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