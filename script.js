document.addEventListener('DOMContentLoaded', () => {

    // Update Last Updated
    const lastUpdated = document.getElementById('lastUpdated');
    lastUpdated.textContent = getFormattedDate();

    fetchData()
        .then(data => createCheckboxes(data))
        .catch(error => console.error('Fetch error: ', error));

});

function getFormattedDate() {
    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[date.getMonth()];
    return `${date.getDate()} ${monthName} ${date.getFullYear()}`;
}

async function fetchData() {
    let response;
    
    try {
        // Try to fetch local data first
        response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error('Local fetch not OK');
        }
    } catch (err) {
        // If local fetch fails, try to fetch from live URL
        response = await fetch('https://didix13.github.io/Party-Synergies-Calculator/data.json');
        if (!response.ok) {
            throw new Error('Live fetch not OK');
        }
    }

    return response.json();
}

function createCheckboxes(data) {
    const classForm = document.getElementById('classForm');
    const ulElement = document.createElement('ul');

    data.forEach(classData => {
        const liElement = createCheckboxElement(classData);
        ulElement.appendChild(liElement);
    });

    classForm.appendChild(ulElement);
}

function createCheckboxElement(classData) {
    const liElement = document.createElement('li');
    const labelElement = document.createElement('label');
    const checkboxElement = document.createElement('input');

    checkboxElement.type = 'checkbox';
    checkboxElement.className = 'classCheckbox';
    checkboxElement.value = classData.class;

    labelElement.appendChild(checkboxElement);
    labelElement.appendChild(document.createTextNode(classData.class));

    liElement.appendChild(labelElement);

    return liElement;
}
