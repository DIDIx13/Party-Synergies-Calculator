document.addEventListener('DOMContentLoaded', () => {

    // Update Last Updated
    const lastUpdated = document.getElementById('lastUpdated');
    lastUpdated.textContent = getFormattedDate();

    fetchClassData()
        .then(data => createCheckboxes(data))
        .catch(error => console.error('Fetch error: ', error));

});

function getFormattedDate() {
    // Utilisez la date actuelle ou remplacez par la date de la dernière mise à jour
    const date = new Date();

    // Tableau des noms des mois
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    // Récupérez le nom du mois
    const monthName = monthNames[date.getMonth()];

    // Formatez la date comme vous le souhaitez
    return `${date.getDate()} ${monthName} ${date.getFullYear()}`;
}

function fetchClassData() {
    return fetch("data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            return response.json();
        });
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