import './css/styles.css';
import './images/turing-logo.png';
import Travelers from './traveler';
import Trips from './trips';
import Destinations from './destinations';
import PendingTrip from './pending-trip';
import {travelersData, destinationsData, tripsData} from './apiCalls';
import dayjs from 'dayjs';

//Query Selectors
const travelerName = document.querySelector('h2')
const tripsDisplay = document.querySelector('.trips')
const costThisYear = document.querySelector('#total-cost-this-year')
const destinationsPicker = document.querySelector('.destinations-picker')
const durationPicker = document.querySelector('.duration-picker')
const guestPicker = document.querySelector('.guests-picker')
const datePicker = document.querySelector('.date-picker')
const button = document.querySelector('.submit-button')
const messageBanner = document.querySelector('h3')
const doubleClickMsg = document.querySelector('h4')
const formSelections = document.querySelector('.selections')

//Event Listeners
destinationsPicker.addEventListener('input', checkInput)
datePicker.addEventListener('input', checkInput)
durationPicker.addEventListener('input', checkInput)
guestPicker.addEventListener('input', checkInput)

button.addEventListener('click', estimateCost)
// button.addEventListener('dblclick' postTrip)
window.addEventListener('load', buildFormHelper)



const displayedUsersID = Math.floor(Math.random() * 50)
let allDestinations;
let tripsRepo;



Promise.all([travelersData, destinationsData, tripsData])
  .then((data) => {
    travelerHelper(data[0].travelers);
    tripsHelper(data[2].trips, data[1].destinations);
  })
  .catch((error) => console.log(error));



// const daySelected = dayjs(datePicker.value).format('YYYY/MM/DD')
// const newTrip = new PendingTrip(displayedUsersID, destinationsPicker.value, guestPicker.value, daySelected, durationPicker.value)


function buildFormHelper() {
  preventPickingPastDates()
  buildDropDown()
}

function travelerHelper(data) {
  const travelRepo = new Travelers(data)
  travelerName.innerText = `Welcome, ${travelRepo.findTraveler(displayedUsersID)}`
}

function tripsHelper(tripsData, destinationsData){
  tripsRepo = new Trips(tripsData)
  const tripsPerTraveler = tripsRepo.getAllTrips(displayedUsersID)
  
  allDestinations = new Destinations(destinationsData)
  const totalCostThisYear = tripsRepo.totalCostPerYear(tripsPerTraveler, allDestinations)
  
  displayAllTrips(tripsPerTraveler)
  displayTotalCostThisYear(totalCostThisYear)
  displayDestinationOptions(allDestinations.destinationsRepo)
}

//DISPLAY ALL TRIPS

function displayAllTrips(tripsPerTraveler) {
  
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

//FORM 

function displayDestinationOptions(destinations) {
  let options = ''
  destinations.forEach(destination => {
    options += 
    `<option value="${destination.id}">${destination.destination}</option>`
  })
  destinationsPicker.innerHTML += options
}

function preventPickingPastDates() {
  const today = Date()
  datePicker.min = dayjs(today).format('YYYY-MM-DD')
}

function buildDropDown() {
  let numbers = ''
  for (let i = 1; i < 51; i++) {
    numbers += `<option value="${i}">${i}</option>`
  }
  durationPicker.innerHTML += numbers 
  guestPicker.innerHTML += numbers
}

function checkInput(event) {
  if(destinationsPicker.value && datePicker.value && durationPicker.value && guestPicker.value) {
    button.disabled = false
  }
}

//WORK WITH FORM

function estimateCost() {
  event.preventDefault()
  const trip = { duration: durationPicker.value, travelers: guestPicker.value, destinationID: Number(destinationsPicker.value) }
  const destination = allDestinations.findDestination(trip)
  const newTripEstimatedCost = tripsRepo.totalCostPerTrip(trip, destination)
  messageBanner.innerText = `Your trips estimated cost is $${newTripEstimatedCost}.`
  button.innerText = 'Submit To Agent'
  toggleForm(doubleClickMsg, formSelections)
  console.log('estimate', newTripEstimatedCost)
}

function toggleForm(appear, hide) {
  appear.classList.remove('hidden')
  hide.classList.add('hidden')
}
