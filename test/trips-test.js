import chai from 'chai';
const expect = chai.expect;
import Trips from '../src/trips';
import Destination from '../src/destinations';

describe('Trips',() => {

  let allTrips;
  let tripsData;
  let destinations;
  let destinationData;

  beforeEach(() => {
    tripsData = [{
      "id": 1,
      "userID": 25,
      "destinationID": 4,
      "travelers": 1,
      "date": "2022/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
      },
      {
      "id": 2,
      "userID": 35,
      "destinationID": 4,
      "travelers": 5,
      "date": "2021/10/04",
      "duration": 18,
      "status": "approved",
      "suggestedActivities": []
      },
      {
      "id": 3,
      "userID": 25,
      "destinationID": 4,
      "travelers": 4,
      "date": "2022/09/22",
      "duration": 17,
      "status": "pending",
      "suggestedActivities": []
      },
      {
      "id": 4,
      "userID": 43,
      "destinationID": 4,
      "travelers": 2,
      "date": "2021/02/25",
      "duration": 10,
      "status": "approved",
      "suggestedActivities": []
      },
      {
      "id": 5,
      "userID": 25,
      "destinationID": 4,
      "travelers": 3,
      "date": "2021/04/30",
      "duration": 18,
      "status": "approved",
      "suggestedActivities": []
    }];

    destinationData = [{
        "id": 4,
        "destination": "Cartagena, Colombia",
        "estimatedLodgingCostPerDay": 65,
        "estimatedFlightCostPerPerson": 350,
        "image": "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        "alt": "boats at a dock during the day time"
      }, 
      {
        "id": 25,
        "destination": "New York, New York",
        "estimatedLodgingCostPerDay": 175,
        "estimatedFlightCostPerPerson": 200,
        "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "people crossing the street during the day surrounded by tall buildings and advertisements"
    }];

    allTrips = new Trips(tripsData);
    destinations = new Destination(destinationData);
  });

  it('should include all trips in repo', () => {
    expect(allTrips.tripsRepo.length).to.equal(5)
  });

  it('should get all trips from a travelers id', () => {
    const allUsersTrips = allTrips.getAllTrips(25)
    expect(allUsersTrips.length).to.equal(3)
  });

  it('should not find any trips', () => {
    const allUsersTrips = allTrips.getAllTrips(7)
    expect(allUsersTrips).to.equal('Can not find any trips for user')
  });

  it('should check era future', () => {
    const era = allTrips.checkTripTimeEra(tripsData[0])
    expect(era).to.equal('Upcoming')
  });

  it('should check era past', () => {
    const era = allTrips.checkTripTimeEra(tripsData[1])
    expect(era).to.equal('Past')
  });

  it('should check era pending', () => {
    const era = allTrips.checkTripTimeEra(tripsData[2])
    expect(era).to.equal('Pending')
  });

  it('should calculate total cost of per a trip + 10%', () => {
    const costOfTrip = allTrips.totalCostPerTrip(tripsData[2], destinationData[0])
    expect(costOfTrip).to.equal(2505)
  });

  it('should get the end date of the trip', () => {
    const getEndDate = allTrips.getEndDate(tripsData[2])
    expect(getEndDate).to.equal('2022/10/09')
  });

  it('should total cost of trips this year', () => {
    const totalCost = allTrips.totalCostPerYear(tripsData, destinations)
    expect(totalCost).to.equal(3712.5)
  });

  it('should return no trip this year', () => {
    const oldTrips = [tripsData[3],tripsData[4]]
    const totalCost = allTrips.totalCostPerYear(oldTrips, destinations)
    expect(totalCost).to.equal(0)
  });
});