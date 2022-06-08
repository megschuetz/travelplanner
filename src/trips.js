import dayjs from 'dayjs';

class Trips {
  constructor(data){
    this.tripsRepo = data
  }
 
  getAllTrips(id){
    const allTrips = this.tripsRepo.filter(trip => trip.userID === id)
    return allTrips.sort((a,b) => new Date(b.date) - new Date(a.date))
  }

  checkTripTimeEra(trip) {
    const today = new Date()
    if(today > new Date(trip.date) && trip.status === 'pending'){
      return 'Pending'
    } else if(today > new Date(trip.date)) {
      return 'Past'
    } else {
      return 'Upcoming'
    }
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
}


export default Trips;