    function getUrlParams() {
        const params = new URLSearchParams(window.location.search); // Get the query string from the URL
        const id = params.get('id'); // Extract 'id' parameter
        const language = params.get('language'); // Extract 'language' parameter
        return { id, language }; // Return them as an object
    }

    async function loadTestDetails() {
      try {
        const response = await fetch('/static/data/codeTestDB.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json(); // Parse the JSON data
        const testsData = data.test; // Access the 'test' array
        console.log(testsData);
    
        const { id, language } = getUrlParams(); // Retrieve parameters
        const test_filter = testsData.filter(test => test.id == id); // Filter the test by ID
        const test = test_filter[0];
        console.log("Test:", test);
    
        const testDetailsDiv = document.getElementById('testDetails');
    
        if (test) {
          // Dynamically update the HTML content
          testDetailsDiv.innerHTML = `
            <h2>${test.title}</h2>
            <p><strong>Difficulty:</strong> ${test.difficulty}</p>
            <p><strong>Code:</strong></p>
            <pre>${test.code}</pre>
            
            <!-- Add a text box and submit button -->
            <div id="userResponse">
              <label for="response">Your Response:</label><br>
              <textarea id="response" rows="4" cols="50" placeholder="Enter your answer here"></textarea><br>
              <button id="submitResponse">Submit</button>
            </div>
          `;
    
          // Add an event listener for the submit button
          document.getElementById('submitResponse').addEventListener('click', async() => {
            const userResponse = document.getElementById('response').value;
            const codeSnippet = test.code;
            console.log('User response:', userResponse);
    
            // Example: You can perform additional actions with the response
            if (userResponse.trim() === '') {
              alert('Please enter a response before submitting!');
            } else {
              alert('Response submitted successfully!');
              const payload = {
                code: codeSnippet,
                response: userResponse
              };
              try {
                // Make a POST request to your backend
                const apiResponse = await fetch('http://localhost:8000/gpt', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(payload)
                });

                // Parse and display the response from ChatGPT
                const result = await apiResponse.json();
                console.log('gpt result returned: ' , result.result);
                document.getElementById('chatGptResponse').innerHTML = `
                  <h3>ChatGPT Response:</h3>
                  <p>${result.result}</p>
                `;
              } catch (error) {
                  console.error('Error:', error);
                  alert('Failed to fetch ChatGPT response!');
              }
              // Here you could send the response to a server or process it further
            }
          });
        } else {
          testDetailsDiv.innerHTML = `<p>Test not found!</p>`;
        }
      } catch (error) {
        console.error('Error loading test data:', error);
        document.getElementById('testDetails').innerHTML = `<p>Failed to load test data!</p>`;
      }
    }
    
    loadTestDetails();
      