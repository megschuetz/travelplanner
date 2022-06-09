import './css/styles.css';
import './images/turing-logo.png';
import Travelers from './traveler';
import Trips from './trips';
import Destinations from './destinations'
import {travelersData, destinationsData, tripsData} from './apiCalls';
import dayjs from 'dayjs';

//Query Selectors
const travelerName = document.querySelector('h2')
const tripsDisplay = document.querySelector('.trips')
const costThisYear = document.querySelector('#total-cost-this-year')
const destinationsPicker = document.querySelector('.destinations-picker')
const datePicker = document.querySelector('.date')
const durationPicker = document.querySelector('.duration-picker')
const guestPicker = document.querySelector('.guests-picker')


const displayedUsersID = Math.floor(Math.random() * 50)

window.addEventListener('load', buildForm)

function buildForm() {
  preventPickingPastDates()
  buildDropDown()
}

Promise.all([travelersData, destinationsData, tripsData])
  .then((data) => {
    travelerHelper(data[0].travelers);
    tripsHelper(data[2].trips, data[1].destinations);
  })
  .catch((error) => console.log(error));


function travelerHelper(data) {
  const travelRepo = new Travelers(data)
  travelerName.innerText = `Welcome, ${travelRepo.findTraveler(displayedUsersID)}`
}

function tripsHelper(tripsData, destinationsData){
  const tripsRepo = new Trips(tripsData)
  const tripsPerTraveler = tripsRepo.getAllTrips(displayedUsersID)
  
  const allDestinations = new Destinations(destinationsData)
  const totalCostThisYear = tripsRepo.totalCostPerYear(tripsPerTraveler, allDestinations)

  displayAllTrips(tripsPerTraveler, allDestinations, tripsRepo)
  displayTotalCostThisYear(totalCostThisYear)
  displayDestinationOptions(allDestinations.destinationsRepo)
}

function displayAllTrips(tripsPerTraveler, allDestinations, tripsRepo) {

  let tripsData = ''
  tripsPerTraveler.forEach((trip) => {
    const tripDestination = allDestinations.findDestination(trip)
    const tripTotalCost = tripsRepo.totalCostPerTrip(trip, tripDestination)
    const endDate = tripsRepo.getEndDate(trip)
    const tripTimeEra = tripsRepo.checkTripTimeEra(trip)

    tripsData += 
    `<section class="card">
      <div class="photo">
        <div class="status-label">
          <p>${tripTimeEra}</p>
        </div>
        <img class="trip-img" src=${tripDestination.image} alt=${tripDestination.alt} width="300" height="205">
      </div>
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

function displayDestinationOptions(destinations) {
  let options = ''
  destinations.forEach(destination => {
    options += 
    `<option value="${destination.destination}">${destination.destination}</option>`
  })
  destinationsPicker.innerHTML = options
}

function preventPickingPastDates() {
  const today = Date()
  const todayWithFormat = dayjs(today).format('YYYY-MM-DD')
  datePicker.innerHTML += `<input class="date-picker" type="date" min="${todayWithFormat}"></input>`
}

function buildDropDown() {
  let numbers = ''
  for (let i = 1; i < 51; i++) {
    numbers += `<option value="${i}">${i}</option>`
  }
  durationPicker.innerHTML = numbers 
  guestPicker.innerHTML = numbers
}