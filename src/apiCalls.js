const travelersApi = 'http://localhost:3001/api/v1/travelers'
const destinationsApi = 'http://localhost:3001/api/v1/destinations'
const tripsApi = 'http://localhost:3001/api/v1/trips'

const fetchData = (url) => {
  return fetch(url).then(response => response.json())
}

const travelersData = fetchData(travelersApi)
const destinationsData = fetchData(destinationsApi)
const tripsData = fetchData(tripsApi)

export{travelersData, destinationsData, tripsData}