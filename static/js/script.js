// Fetch the JSON data
fetch('/static/data/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON
    })
    .then(data => {
        // Display title and description
        document.getElementById('title').innerText = data.title;
        document.getElementById('description').innerText = data.description;

        // Display lessons
        const languagesDiv = document.getElementById('languages');
        data.languages.forEach(language => {
            const languageDiv = document.createElement('div');
            languageDiv.className = 'lesson';
            languageDiv.innerHTML = `
                <a href="${language.link}" style="text-decoration: none; color: inherit;">
                    <strong>${language.name}</strong>
                    <p>Number of problems: ${language.num_problems}</p>
                </a>
            `;
            languagesDiv.appendChild(languageDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });
