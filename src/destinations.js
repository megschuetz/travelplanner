class Destinations {
  constructor(data){
    this.destinationsRepo = data
  }

  findDestination(trip) {
    return this.destinationsRepo.find(destination => destination.id === trip.destinationID)
  }


  // totalSpentOnTrips(){
  //   this.trips.forEach() {
  //     this.destinationsRepo.find()
  //   }
  // }
}

export default Destinations;