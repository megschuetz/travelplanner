import dayjs from 'dayjs';

class Trips {
  constructor(data){
    this.tripsRepo = data
  }
 
  getAllTrips(id){
    return this.tripsRepo.filter(trip => trip.userID === id)
  }

  totalCostPerTrip(trip, destination){
    return (trip.duration * destination.estimatedLodgingCostPerDay) + (trip.travelers * destination.estimatedFlightCostPerPerson)
  }

  getEndDate(trip) {
    return dayjs(trip.date).add(trip.duration, 'day').format('YYYY/MM/DD')
  }

  totalCostPerYear(tripsPerTraveler, allDestinations) {
    const tripsThisYear = tripsPerTraveler.filter(trip => trip.date.includes('2022')) 
    if(tripsThisYear.length > 0) {
      const totalCost = tripsThisYear.reduce((total, trip) => {
        const destination = allDestinations.findDestination(trip)
        total += this.totalCostPerTrip(trip, destination)
        return total
      },0)
      return totalCost
    } else {
      return 0
    }
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