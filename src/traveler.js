class Travelers {
  constructor(data) {
    this.travelRepo = data;
  };

  findTraveler(id) {
    if(!this.travelRepo.find(traveler => traveler.id === id)) {
      return 'Traveler not found'
    };
    return this.travelRepo.find(traveler => traveler.id === id).name
  };
}

export default Travelers;