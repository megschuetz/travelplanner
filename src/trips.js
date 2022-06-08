class Trips {
  constructor(data){
    this.tripsRepo = data
  }
 
  getAllTrips(id){
    return this.tripsRepo.filter(trip => trip.userID === id)
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


export default Trips;