const csv = require('csvtojson')
let deliveriesJson = [];
let matchesJson = [];
csv()
    .fromFile('data/matches.csv')
    .then((jsonObj) => {
        matchesJson = jsonObj;
    }).then(() => {
        csv()
            .fromFile('data/deliveries.csv')
            .then((jsonObj1) => {
                deliveriesJson = jsonObj1;
            }).then(() => {
                // un comment below lines to test each function
                // console.log(getNoOfMatchesPlayed(matchesJson));
                // console.log(getNoOfMatchesWonPerTeamPerYear(matchesJson));
                // console.log(getExtraRunsPerTeamForYear(matchesJson, deliveriesJson, '2016'));
                // console.log(getBowlersEconomyForYear(matchesJson, deliveriesJson, '2015'));
            })
    })

function getNoOfMatchesPlayed(matches) {
    let numberMatches = {}
    matches.map((match) => {
        if (!numberMatches[match.season])
            numberMatches[match.season] = 1
        else
            numberMatches[match.season]++

    })
    return numberMatches
}

function getNoOfMatchesWonPerTeamPerYear(matches) {
    let matchesWon = {}
    matches.map((match) => {
        if (match.result != 'no result') {
            if (!matchesWon[match.winner]) {
                matchesWon[match.winner] = {}
                matchesWon[match.winner][match.season] = 1
            }
            else {
                if (!matchesWon[match.winner][match.season]) {
                    matchesWon[match.winner][match.season] = 1
                }
                else {
                    matchesWon[match.winner][match.season]++
                }
            }
        }

    })
    return matchesWon
}

function getExtraRunsPerTeamForYear(matches, deliveries, year) {
    let matches2016 = {}
    let extraRuns = {}
    matches.map(match => {
        if (match.season == year)
            matches2016[match.id] = match.season
    })
    deliveries.map(delivery => {
        if (matches2016[delivery.match_id]) {

            if (!extraRuns[delivery["bowling_team"]]) {
                extraRuns[delivery["bowling_team"]] = parseInt(delivery["extra_runs"], 10)
            }
            else {
                extraRuns[delivery["bowling_team"]] += parseInt(delivery["extra_runs"], 10)
            }


        }
    })
    return extraRuns
}

function getBowlersEconomyForYear(matches, deliveries, year) {
    let matchesForYear = {}
    let bowlerStats = {}
    let bowlersEconomy = {}
    matches.map((match) => {
        if (match.season == year)
            matchesForYear[match.id] = match.season
    })
    deliveries.map((delivery) => {
        if (matchesForYear[delivery.match_id]) {
            if (!bowlerStats[delivery.bowler]) {
                bowlerStats[delivery.bowler] = {}
                bowlerStats[delivery.bowler]["runs"] = parseInt(delivery["batsman_runs"]) + parseInt(delivery["wide_runs"]) + parseInt(delivery["noball_runs"])
                if (delivery["wide_runs"] === '0' && delivery["noball_runs"] === '0') {
                    bowlerStats[delivery.bowler]["balls"] = 1
                }
                else { bowlerStats[delivery.bowler]["balls"] = 0 }
                bowlersEconomy[delivery.bowler] = bowlerStats[delivery.bowler]["runs"] / bowlerStats[delivery.bowler]["balls"] * 6
            }
            else {
                bowlerStats[delivery.bowler]["runs"] += parseInt(delivery["batsman_runs"]) + parseInt(delivery["wide_runs"]) + parseInt(delivery["noball_runs"])
                if (delivery["wide_runs"] === '0' && delivery["noball_runs"] === '0') {
                    bowlerStats[delivery.bowler]["balls"] += 1
                }
                bowlersEconomy[delivery.bowler] = bowlerStats[delivery.bowler]["runs"] / bowlerStats[delivery.bowler]["balls"] * 6
            }

        }
    })
    return bowlersEconomy
}







// export const getNoOfMatchesPlayed = () => {};
// export const getNoOfMatchesWonPerTeamPerYear = () => {};
// export const getExtraRunsPerTeamForYear = () => {};
// export const getBowlersEconomyForYear = () => {};
