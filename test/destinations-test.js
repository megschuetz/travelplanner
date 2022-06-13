import chai from 'chai';
const expect = chai.expect;
import Destinations from '../src/destinations';


describe('Destinations',() => {

  let allDestinations;
  let trip;
  let tripNotHere;

  beforeEach(() => {
    const destinations = [{
      "id": 1,
      "destination": "Lima, Peru",
      "estimatedLodgingCostPerDay": 70,
      "estimatedFlightCostPerPerson": 400,
      "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      "alt": "overview of city buildings with a clear sky"
      },
      {
      "id": 2,
      "destination": "Stockholm, Sweden",
      "estimatedLodgingCostPerDay": 100,
      "estimatedFlightCostPerPerson": 780,
      "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "city with boats on the water during the day time"
      },
      {
      "id": 3,
      "destination": "Sydney, Austrailia",
      "estimatedLodgingCostPerDay": 130,
      "estimatedFlightCostPerPerson": 950,
      "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "opera house and city buildings on the water with boats"
      },
      {
      "id": 4,
      "destination": "Cartagena, Colombia",
      "estimatedLodgingCostPerDay": 65,
      "estimatedFlightCostPerPerson": 350,
      "image": "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
      "alt": "boats at a dock during the day time"
      },
      {
      "id": 5,
      "destination": "Madrid, Spain",
      "estimatedLodgingCostPerDay": 150,
      "estimatedFlightCostPerPerson": 650,
      "image": "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "city with clear skys and a road in the day time"
      }];

      trip = {
        "id": 35,
        "userID": 36,
        "destinationID": 1,
        "travelers": 3,
        "date": "2020/10/23",
        "duration": 16,
        "status": "approved",
        "suggestedActivities": []
      };

      tripNotHere = {
        "id": 4,
        "userID": 43,
        "destinationID": 14,
        "travelers": 2,
        "date": "2022/02/25",
        "duration": 10,
        "status": "approved",
        "suggestedActivities": []
      };

      allDestinations = new Destinations(destinations);
  });

  it('should hold an array of all destinations', () => {
    expect(allDestinations.destinationsRepo.length).to.equal(5);
  });

  it('should find the destination of a trip', () => {
    const findADestination = allDestinations.findDestination(trip);
    expect(findADestination.destination).to.equal("Lima, Peru");
  });

  it('should give error message for no trip found', () => {
    const findADestination = allDestinations.findDestination(tripNotHere);
    expect(findADestination).to.equal('Destination for trip not found');
  });
});