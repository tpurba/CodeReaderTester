// Fetch the JSON data
fetch('/static/data/codeTestDB.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON
    })
    .then(data => {
        // Display title and description
        document.getElementById('title').innerText = data.title;
        console.log("This is a message.");
        console.log('whats in data: ' , data);
        console.log('whats in the documents innertext: ' ,document.getElementById('title').innerText);
        document.getElementById('description').innerText = data.description;

        // Display lessons
        const testsDiv = document.getElementById('test');
        const javaTests = data.test.filter(test => test.language === "java");//filter 
        javaTests.forEach(test => {
            const testDiv = document.createElement('div');
            testDiv.className = 'test';
            testDiv.innerHTML = `
            <a href="codeTestUI.html?id=${test.id}" style="text-decoration: none; color: inherit;">
                <strong>${test.title}</strong>
                <p>Difficulty: ${test.difficulty}</p>
            </a>
            `;
            testsDiv.appendChild(testDiv);
        });
        console.log('whats in the div : ' ,document.getElementById('test'));
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });
