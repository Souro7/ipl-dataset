const iplModule = require('./ipl')
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
                //console.time('Test')
                // un comment below lines to test each function
                //console.log(iplModule.getNoOfMatchesPlayed(matchesJson));
                //console.log(iplModule.getNoOfMatchesWonPerTeamPerYear(matchesJson));
                //console.timeEnd('Test')
                //console.log(iplModule.getExtraRunsPerTeamForYear(matchesJson, deliveriesJson, '2016'));
                //console.log(iplModule.getBowlersEconomyForYear(matchesJson, deliveriesJson, '2015'));




            })
    })