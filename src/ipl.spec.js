import {
  getNoOfMatchesPlayed,
  getNoOfMatchesWonPerTeamPerYear,
  getExtraRunsPerTeamForYear,
  getBowlersEconomyForYear
} from "./ipl";

describe("IPL module", () => {
  describe("No. of matches played per team for all years, getNoOfMatchesPlayed", () => {
    const matchesSample = [
      {
        season: 2008
      },
      {
        season: 2009
      },
      {
        season: 2008
      }
    ];
    const expectedResult = {
      2008: 2,
      2009: 1
    };
    test("should exist", () => {
      expect(getNoOfMatchesPlayed).toBeDefined();
    });
    test("should return an object", () => {
      expect(getNoOfMatchesPlayed(matchesSample)).toBeDefined();
      expect(typeof getNoOfMatchesPlayed(matchesSample)).toEqual("object");
      expect(getNoOfMatchesPlayed(matchesSample)).toEqual(expectedResult);
    });
  });

  describe("No. of matches won per team per year, getNoOfMatchesWonPerTeamPerYear", () => {
    const matchesSample = [
      {
        season: 2009,
        result: 'normal',
        winner: 'Royal Challangers Bangalore'
      },
      {
        season: 2008,
        result: 'normal',
        winner: 'Deccan Chargers'
      },
      {
        season: 2008,
        result: 'normal',
        winner: 'Deccan Chargers'
      },
      {
        season: 2007,
        result: 'normal',
        winner: 'Deccan Chargers'
      }
    ];
    const expectedResult = {
      'Royal Challangers Bangalore': { '2009': 1 },
      'Deccan Chargers': { '2008': 2, '2007': 1 }
    };

    test("should exist", () => {
      expect(getNoOfMatchesWonPerTeamPerYear).toBeDefined();
    });
    test("should return an object", () => {
      expect(getNoOfMatchesWonPerTeamPerYear(matchesSample)).toBeDefined();
      expect(typeof getNoOfMatchesWonPerTeamPerYear(matchesSample)).toEqual("object");
      expect(getNoOfMatchesWonPerTeamPerYear(matchesSample)).toEqual(expectedResult);
    });
  });


  describe("Extra runs conceeded per team for year, getExtraRunsPerTeamForYear", () => {
    const year = '2016'
    const deliveriesSample = [{
      match_id: '1',
      bowling_team: 'Deccan chargers',
      extra_runs: '1'
    },
    {
      match_id: '1',
      bowling_team: 'Deccan chargers',
      extra_runs: '2'
    }]
    const matchesSample = [{
      season: '2016',
      id: '1'
    }]
    const expectedResult = { 'Deccan chargers': 3 }
    test("should exist", () => {
      expect(getExtraRunsPerTeamForYear).toBeDefined();
    });
    test("should return an object", () => {
      expect(getExtraRunsPerTeamForYear(matchesSample, deliveriesSample, year)).toBeDefined();
      expect(typeof getExtraRunsPerTeamForYear(matchesSample, deliveriesSample, year)).toEqual("object");
      expect(getExtraRunsPerTeamForYear(matchesSample, deliveriesSample, year)).toEqual(expectedResult);
    });
  });


  describe("Bowlers economy for year, getBowlersEconomyForYear", () => {
    const year = '2015'
    const deliveriesSample = [{
      match_id: '1',
      bowler: 'Ashok Dinda',
      batsman_runs: '2',
      wide_runs: '0',
      noball_runs: '0'
    },
    {
      match_id: '1',
      bowler: 'Ashok Dinda',
      batsman_runs: '1',
      wide_runs: '0',
      noball_runs: '0'
    },
    {
      match_id: '1',
      bowler: 'Trent Boult',
      batsman_runs: '1',
      wide_runs: '0',
      noball_runs: '0'
    },
    {
      match_id: '1',
      bowler: 'Trent Boult',
      batsman_runs: '1',
      wide_runs: '0',
      noball_runs: '1'
    }]
    const matchesSample = [{
      season: '2015',
      id: '1'
    }]
    const expectedResult = { 'Ashok Dinda': 9, 'Trent Boult': 18 }
    test("should exist", () => {
      expect(getBowlersEconomyForYear).toBeDefined();
    });
    test("should return an object", () => {
      expect(getBowlersEconomyForYear(matchesSample, deliveriesSample, year)).toBeDefined();
      expect(typeof getBowlersEconomyForYear(matchesSample, deliveriesSample, year)).toEqual("object");
      expect(getBowlersEconomyForYear(matchesSample, deliveriesSample, year)).toEqual(expectedResult);
    });
  });
});
