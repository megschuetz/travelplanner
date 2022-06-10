import chai from 'chai';
const expect = chai.expect;
import Travelers from '../src/traveler';


describe('Travelers',() => {

  let allTravelers;

  beforeEach(() => {
     let travelers = [{
      "id": 1,
      "name": "Ham Leadbeater",
      "travelerType": "relaxer"
      },
      {
      "id": 2,
      "name": "Rachael Vaughten",
      "travelerType": "thrill-seeker"
      },
      {
      "id": 3,
      "name": "Sibby Dawidowitsch",
      "travelerType": "shopper"
      },
      {
      "id": 4,
      "name": "Leila Thebeaud",
      "travelerType": "photographer"
      },
      {
      "id": 5,
      "name": "Tiffy Grout",
      "travelerType": "thrill-seeker"
      }];
      allTravelers = new Travelers(travelers);
  });


  it('should create an object with the same length', () => {
    expect(allTravelers.travelRepo.length).to.equal(5);
  });

  it('should find user by user id', () => {
    const getTravelerName = allTravelers.findTraveler(3);
    expect(getTravelerName).to.equal("Sibby Dawidowitsch");
  });

  it('should not find traveler', () => {
    const getTravelerName = allTravelers.findTraveler(7);
    expect(getTravelerName).to.equal('Traveler not found');
  });
});
