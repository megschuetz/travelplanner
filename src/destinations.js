class Destinations {
  constructor(data){
    this.destinationsRepo = data
  }

  findDestination(trip) {
    return this.destinationsRepo.find(destination => destination.id === trip.destinationID)
  }
}

export default Destinations;