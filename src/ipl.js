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
                //console.log(getNoOfMatchesPlayed(matchesJson));
                //console.log(getNoOfMatchesWonPerTeamPerYear(matchesJson));
                //console.log(getExtraRunsPerTeamForYear(matchesJson, deliveriesJson, '2016'));
                console.log(getBowlersEconomyForYear(matchesJson, deliveriesJson, '2015'));
                //console.log(getBowlerStatsForYear(matchesJson, deliveriesJson, '2015'));




            })
    })

function getNoOfMatchesPlayed(matches) {
    return matches.reduce((numberMatches, match) => {
        if (!numberMatches[match.season]) {
            numberMatches[match.season] = 1
        }
        else {
            numberMatches[match.season]++
        }
        return numberMatches
    }, {})
}

function getNoOfMatchesWonPerTeamPerYear(matches) {
    return matches.reduce((matchesWon, match) => {
        if (match.result != 'no result') {
            if (matchesWon[match.winner]) {
                if (!matchesWon[match.winner][match.season]) {
                    matchesWon[match.winner][match.season] = 1
                }
                else {
                    matchesWon[match.winner][match.season]++

                }

            }
            else {
                matchesWon[match.winner] = {}
                matchesWon[match.winner][match.season] = 1
            }
        }
        return matchesWon

    }, {})
}

function getExtraRunsPerTeamForYear(matches, deliveries, year) {
    let matchesYear = getMatchesOfAYear(matches, year)

    return deliveries.reduce((extraRuns, delivery) => {
        if (matchesYear[delivery.match_id]) {

            if (!extraRuns[delivery["bowling_team"]]) {
                extraRuns[delivery["bowling_team"]] = parseInt(delivery["extra_runs"])
            }
            else {
                extraRuns[delivery["bowling_team"]] += parseInt(delivery["extra_runs"])
            }

        }
        return extraRuns
    }, {})
}

// function getBowlersEconomyForYear(matches, deliveries, year) {
//     let matchesForYear = {}
//     let bowlerStats = {}
//     let bowlersEconomy = {}
//     matches.map((match) => {
//         if (match.season == year)
//             matchesForYear[match.id] = match.season
//     })
//     deliveries.map((delivery) => {
//         if (matchesForYear[delivery.match_id]) {
//             if (!bowlerStats[delivery.bowler]) {
//                 bowlerStats[delivery.bowler] = {}
//                 bowlerStats[delivery.bowler]["runs"] = parseInt(delivery["batsman_runs"]) + parseInt(delivery["wide_runs"]) + parseInt(delivery["noball_runs"])
//                 if (delivery["wide_runs"] === '0' && delivery["noball_runs"] === '0') {
//                     bowlerStats[delivery.bowler]["balls"] = 1
//                 }
//                 else { bowlerStats[delivery.bowler]["balls"] = 0 }
//                 bowlersEconomy[delivery.bowler] = bowlerStats[delivery.bowler]["runs"] / bowlerStats[delivery.bowler]["balls"] * 6
//             }
//             else {
//                 bowlerStats[delivery.bowler]["runs"] += parseInt(delivery["batsman_runs"]) + parseInt(delivery["wide_runs"]) + parseInt(delivery["noball_runs"])
//                 if (delivery["wide_runs"] === '0' && delivery["noball_runs"] === '0') {
//                     bowlerStats[delivery.bowler]["balls"] += 1
//                 }
//                 bowlersEconomy[delivery.bowler] = bowlerStats[delivery.bowler]["runs"] / bowlerStats[delivery.bowler]["balls"] * 6
//             }

//         }
//     })
//     return bowlersEconomy
// }




function getMatchesOfAYear(matches, year) {
    return matches.reduce((matchesYear, match) => {
        if (match.season == year)
            matchesYear[match.id] = match.season
        return matchesYear
    }, {})
}

function getBowlerStatsForYear(matches, deliveries, year) {

    let matchesForYear = getMatchesOfAYear(matches, year)

    return deliveries.reduce((bowlerStats, delivery) => {
        if (matchesForYear[delivery.match_id]) {
            if (!bowlerStats[delivery.bowler]) {
                bowlerStats[delivery.bowler] = {}
                bowlerStats[delivery.bowler]["runs"] = parseInt(delivery["batsman_runs"]) + parseInt(delivery["wide_runs"]) + parseInt(delivery["noball_runs"])
                if (delivery["wide_runs"] === '0' && delivery["noball_runs"] === '0') {
                    bowlerStats[delivery.bowler]["balls"] = 1
                }
                else { bowlerStats[delivery.bowler]["balls"] = 0 }
                //bowlersEconomy[delivery.bowler] = bowlerStats[delivery.bowler]["runs"] / bowlerStats[delivery.bowler]["balls"] * 6
            }
            else {
                bowlerStats[delivery.bowler]["runs"] += parseInt(delivery["batsman_runs"]) + parseInt(delivery["wide_runs"]) + parseInt(delivery["noball_runs"])
                if (delivery["wide_runs"] === '0' && delivery["noball_runs"] === '0') {
                    bowlerStats[delivery.bowler]["balls"] += 1
                }
                //bowlersEconomy[delivery.bowler] = bowlerStats[delivery.bowler]["runs"] / bowlerStats[delivery.bowler]["balls"] * 6
            }

        }
        return bowlerStats
    }, {})

}

function getBowlersEconomyForYear(matches, deliveries, year) {
    let bowlerStats = getBowlerStatsForYear(matches, deliveries, year)

    // return Object.keys(bowlerStats).reduce((bowlerEcon, bowler) => {
    //     bowlerEcon[bowler] = bowlerStats[bowler][runs] / bowlerStats[bowler][balls] * 6
    //     return bowlerEcon
    // }, {})
    let bowlerEcon = {}
    Object.keys(bowlerStats).map((bowler) => {
        bowlerEcon[bowler] = {}
        bowlerEcon[bowler] = bowlerStats[bowler]["runs"] / bowlerStats[bowler]["balls"] * 6
        return bowlerEcon
    })
    return bowlerEcon

    //return bowlerStats
}












// export const getNoOfMatchesPlayed = () => {};
// export const getNoOfMatchesWonPerTeamPerYear = () => {};
// export const getExtraRunsPerTeamForYear = () => {};
// export const getBowlersEconomyForYear = () => {};
