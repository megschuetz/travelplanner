class Trips {
  constructor(data, id){
    this.tripsRepo = data
    this.travelersId = id
  }
 
  getAllTrips(){
    this.repo.filter(trip => trip.userID === this.travelersId)
  }

  getPastTrips(){

  }

  getPresentTrips(){

  }

  getUpComingTrips(){

  }

  getPendingTrips(){
    
  }
}
