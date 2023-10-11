document.addEventListener('DOMContentLoaded', () => {
    // Fetch JSON data from data.json file
    fetch("data.json")
        .then(response => {
            // Check if the response is OK (status 200)
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            return response.json();  // Parse JSON data
        })
        .then(data => {
            // Get the form element where the checkboxes will be appended
            const classForm = document.getElementById('classForm');
            const ulElement = document.createElement('ul');
        
            // Iterate through JSON data and create checkboxes
            data.forEach(classData => {
                const liElement = document.createElement('li');
                const labelElement = document.createElement('label');
                const checkboxElement = document.createElement('input');
            
                checkboxElement.type = 'checkbox';
                checkboxElement.className = 'classCheckbox';
                checkboxElement.value = classData.class;
            
                labelElement.appendChild(checkboxElement);
                labelElement.appendChild(document.createTextNode(classData.class));
            
                liElement.appendChild(labelElement);
                ulElement.appendChild(liElement);
            });
        
            classForm.appendChild(ulElement);
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        });

    // Add additional JavaScript here, such as event listeners for form submission
});
