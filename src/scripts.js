// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './css/styles.css';
import './images/turing-logo.png';
import Travelers from './traveler';
import Trips from './trips';
import Destinations from './destinations'
import {travelersData, destinationsData, tripsData} from './apiCalls';

//Query Selectors
const travelerName = document.querySelector('h2')
const tripsDisplay = document.querySelector('.trips')
const costThisYear = document.querySelector('#total-cost-this-year')


const displayedUsersID = Math.floor(Math.random() * 50)

Promise.all([travelersData, destinationsData, tripsData])
  .then((data) => {
    travelerHelper(data[0].travelers);
    tripsHelper(data[2].trips, data[1].destinations)
    console.log('data', data)
  })
  .catch((error) => console.log(error));


function travelerHelper(data) {
  const travelRepo = new Travelers(data)
  travelerName.innerText = travelRepo.findTraveler(displayedUsersID)
}

function tripsHelper(tripsData, destinationsData){
  const tripsRepo = new Trips(tripsData)
  const tripsPerTraveler = tripsRepo.getAllTrips(displayedUsersID)
  
  const allDestinations = new Destinations(destinationsData)
  const totalCostThisYear = tripsRepo.totalCostPerYear(tripsPerTraveler, allDestinations)
  console.log('alltrips', tripsRepo.totalCostPerYear(tripsPerTraveler, allDestinations))

  displayAllTrips(tripsPerTraveler, allDestinations, tripsRepo)
  displayTotalCostThisYear(totalCostThisYear)
}

function displayAllTrips(tripsPerTraveler, allDestinations, tripsRepo) {

  let tripsData = ''
  tripsPerTraveler.forEach((trip) => {
    const tripDestination = allDestinations.findDestination(trip)
    const tripTotalCost = tripsRepo.totalCostPerTrip(trip, tripDestination)
    const endDate = tripsRepo.getEndDate(trip)


    tripsData += 
    `<section class="card">
      <img class="trip-img" src=${tripDestination.image} alt=${tripDestination.alt} width="300" height="200">
      <div class="trip-info">
        <p class="destination">${tripDestination.destination}</p>
        <p>${trip.date} - ${endDate}</p>
        <p>Estimated Cost: $${tripTotalCost}</p>
        <p>Guests: ${trip.travelers}</p>
      </div>
    </section>`
  })

  tripsDisplay.innerHTML = tripsData
}

function displayTotalCostThisYear(totalCost) {
  costThisYear.innerText = `$${totalCost}`
}