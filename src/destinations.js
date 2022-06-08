class Destinations {
  constructor(data, trips){
    this.destinationsRepo = data
    this.trips = trips
  }

  findDestinations() {
    const destinationsOfTrips = this.trips.map((trip) => {
      return this.destinationsRepo.find(destination => destination.id === trip.destinationID)
    })
    return destinationsOfTrips
  }
  // totalSpentOnTrips(){
  //   this.trips.forEach() {
  //     this.destinationsRepo.find()
  //   }
  // }
}

export default Destinations;