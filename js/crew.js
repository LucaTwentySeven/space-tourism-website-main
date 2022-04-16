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

// Setting variabales | Searching html document by class name
const crewImage = document.querySelector('.main__image');
const crewRole = document.querySelector('.crew-role');
const crewName = document.querySelector('.main__heading-l3');
const crewBio = document.querySelector('.main__text');
const bulletBox = document.querySelector('.bullet-box');

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let crewIndex = 0;
let bullet = '';

// Main function to populate received data
function populateDestinations(object) {

    // Variable which handles destinations object
    const crew = object['crew'];

    // Loop query to create planet buttons and pass data into event listener
    for (const crewItem of crew) {
        bullet = document.createElement('div');
        bullet.classList.add('bullet');
        bullet.setAttribute('index', crew.indexOf(crewItem));
        bullet.addEventListener('click', memberSelected(crewItem));
        bulletBox.appendChild(bullet);
    }

    displayMember(crew[crewIndex]);

    nextButton.addEventListener('click', () => {
        changeSlide(crewIndex + 1)

    });
    prevButton.addEventListener('click', () => {
        changeSlide(crewIndex - 1)
    });

    function changeSlide(target) {
        if (target > crewIndex) {
            crewIndex++
            if (target > crew.length - 1) {
                crewIndex = 0
            }
        } else if (target < crewIndex) {
            crewIndex--
            if (target < 0) {
                crewIndex = crew.length - 1
            }
        }
        displayMember(crew[crewIndex]);
    }

    function memberSelected(index) {
        return function () {
            displayMember(index);
        }
    }

    function displayMember(index) {
        crewIndex = crew.indexOf(index);
        crewImage.src = index.images.webp;
        crewName.innerHTML = index.name;
        crewRole.innerHTML = index.role;
        crewBio.innerHTML = index.bio;
        activateBullet(crewIndex);
    }
}

function activateBullet(index) {
    const bullet = document.querySelectorAll('[index]');
    for (const bulletItem of bullet) {
        if (bulletItem.getAttribute('index') != index) {
            bulletItem.classList.remove('active');
        }
        bullet[index].classList.add('active');
    }
}
