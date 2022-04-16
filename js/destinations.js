// Fetching data from JCON file

const loadJsonData = async () => {
    try {
        const requestURL = 'https://api.npoint.io/17efda3e57c0c8c42610';
        const response = await fetch(requestURL);
        const data = await response.json();

        // Invoking function with received data passed to function
        populateDestinations(data);

    } catch (e) {
        console.log('error: ', e);
    }
}

// Execute function with collected destination data
loadJsonData();

// Main function to populate received data
function populateDestinations(object) {

    // Setting variabales | Searching html document by class name
    const planetImage = document.querySelector('.main__image');
    const planetName = document.querySelector('.main__heading-l2');
    const planetDescription = document.querySelector('.main__text');
    const planetDistance = document.querySelector('.details__distance');
    const planetTravelTime = document.querySelector('.details__travel');
    const planetMenu = document.querySelector('.sub-menu');

    // Variables to manage planet navigation
    let currentLink = '';
    let planetLink = '';

    // Variable which handles destinations object
    const dests = object['destinations'];

    // Loop query to create planet buttons and pass data into event listener
    for (const dest of dests) {
        const destButton = document.createElement('li');
        destButton.classList.add('sub-menu__item');

        // ID added for searching menu navigation elements by id
        destButton.id = dest.name;

        // Display destination name inside button
        destButton.innerHTML = dest.name;

        destButton.addEventListener('click', destinationSelected(dest));

        // Creating li item 
        planetMenu.appendChild(destButton);
    }

    // Invoked by click action on event listener on planet button
    function destinationSelected(index) {
        return function () {

            // Passing data into function
            displayDestinations(index);
        }
    }

    // Display data into proper Html elements
    function displayDestinations(index) {
        planetImage.src = index.images.webp;
        planetImage.alt = index.name;
        planetName.innerHTML = index.name;
        planetDescription.innerHTML = index.description;
        planetDistance.innerHTML = index.distance;
        planetTravelTime.innerHTML = index.travel;

        // Setting active link | Removing already selected
        if (currentLink != '') {
            planetLink.classList.remove('active');
            currentLink = index.name;
        } else {
            currentLink = index.name;
        }

        // Activating link (white border under planet button)
        activateLink();
    }

    // Invoking function to display data on document load
    // Just for first object (destination)
    displayDestinations(dests[0]);

    // Activating planet link by id
    function activateLink() {
        planetLink = document.querySelector(`#${currentLink}`);
        planetLink.classList.add('active');
    }
}

