// Fetching data from JCON file

const loadJsonData = async () => {
    try {
        const requestURL = 'https://api.npoint.io/17efda3e57c0c8c42610';
        const response = await fetch(requestURL);
        const data = await response.json();

        // Invoking function with received data passed to function
        populateTechnology(data);

    } catch (e) {
        console.log('error: ', e);
    }
}

// Execute function with collected destination data
loadJsonData();

// Setting variabales | Searching html document by class name
const techImage = document.querySelector('.main__image');
const techRole = document.querySelector('.tech-role');
const techName = document.querySelector('.main__heading-l3');
const techBio = document.querySelector('.main__text');
const bulletBox = document.querySelector('.bullet-box');

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let techIndex = 0;
let bullet = '';
let bulletNumber = '';

// Main function to populate received data
function populateTechnology(object) {

    // Variable which handles destinations object
    const tech = object['technology'];

    // Loop query to create planet buttons and pass data into event listener
    for (const techItem of tech) {
        bullet = document.createElement('div');
        bulletNumber = document.createElement('p');
        bullet.classList.add('bullet');
        bulletNumber.classList.add('bullet-number');
        bulletNumber.innerHTML = tech.indexOf(techItem) + 1;
        bullet.setAttribute('index', tech.indexOf(techItem));
        bullet.addEventListener('click', memberSelected(techItem));
        bulletBox.appendChild(bullet);
        bullet.appendChild(bulletNumber);
    }

    displayMember(tech[techIndex]);

    nextButton.addEventListener('click', () => {
        changeSlide(techIndex + 1)

    });
    prevButton.addEventListener('click', () => {
        changeSlide(techIndex - 1)
    });

    function changeSlide(target) {
        if (target > techIndex) {
            techIndex++
            if (target > tech.length - 1) {
                techIndex = 0
            }
        } else if (target < techIndex) {
            techIndex--
            if (target < 0) {
                techIndex = tech.length - 1
            }
        }
        displayMember(tech[techIndex]);
    }

    function memberSelected(index) {
        return function () {
            displayMember(index);
        }
    }

    function displayMember(index) {
        techIndex = tech.indexOf(index);
        if (window.innerWidth <= 992) {
            techImage.src = index.images.landscape;
        } else {
            techImage.src = index.images.portrait;
        }
        techName.innerHTML = index.name;
        techBio.innerHTML = index.description;
        activateBullet(techIndex);
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
