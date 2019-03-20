const iplModule = require('./ipl')
const fs = require('fs')
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
                //number of matches played
                writeJSONFile("data/number_of_matches.json", JSON.stringify(iplModule.getNoOfMatchesPlayed(matchesJson), undefined, 2))

                //number of matches won per team per year
                writeJSONFile("data/matches_won_per_team.json", JSON.stringify(iplModule.getNoOfMatchesWonPerTeamPerYear(matchesJson), undefined, 2))

                //get extra runs per team for a year
                writeJSONFile("data/extra_runs_per_team.json", JSON.stringify(iplModule.getExtraRunsPerTeamForYear(matchesJson, deliveriesJson, '2016'), undefined, 2))

                //get bowlers economy for a year
                writeJSONFile("data/bowlers_economy.json", JSON.stringify(iplModule.getBowlersEconomyForYear(matchesJson, deliveriesJson, '2015'), undefined, 2))
            })
    })

function writeJSONFile(path, data) {
    fs.writeFile(path, data, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("Output JSON file has been saved.");
    })
}