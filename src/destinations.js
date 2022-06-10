class Destinations {
  constructor(data){
    this.destinationsRepo = data
  }

  findDestination(trip) {
    if(!this.destinationsRepo.find(destination => destination.id === trip.destinationID)){
      return 'Destination for trip not found'
    }
    return this.destinationsRepo.find(destination => destination.id === trip.destinationID)
  }
}

export default Destinations;