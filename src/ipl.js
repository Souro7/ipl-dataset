//get number of matches played per year of all the years in IPL
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

//matches won of all teams over all the years of IPL
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

//the extra runs conceded per team for a given year
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


//get data of matches played for a given year
function getMatchesOfAYear(matches, year) {
    return matches.reduce((matchesYear, match) => {
        if (match.season == year)
            matchesYear[match.id] = match.season
        return matchesYear
    }, {})
}

//get the total runs given and total balls bowled by a bowler for a given year
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

            }
            else {
                bowlerStats[delivery.bowler]["runs"] += parseInt(delivery["batsman_runs"]) + parseInt(delivery["wide_runs"]) + parseInt(delivery["noball_runs"])
                if (delivery["wide_runs"] === '0' && delivery["noball_runs"] === '0') {
                    bowlerStats[delivery.bowler]["balls"] += 1
                }

            }

        }
        return bowlerStats
    }, {})

}

//get the economy rate of each bowler for a given year
function getBowlersEconomyForYear(matches, deliveries, year) {
    let bowlerStats = getBowlerStatsForYear(matches, deliveries, year)
    let bowlerEcon = {}
    Object.keys(bowlerStats).map((bowler) => {
        bowlerEcon[bowler] = {}
        bowlerEcon[bowler] = bowlerStats[bowler]["runs"] / bowlerStats[bowler]["balls"] * 6
        return bowlerEcon
    })
    return bowlerEcon
}

module.exports = { getNoOfMatchesPlayed, getNoOfMatchesWonPerTeamPerYear, getExtraRunsPerTeamForYear, getBowlersEconomyForYear }