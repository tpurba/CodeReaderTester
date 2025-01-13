from flask import Flask, render_template
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__, static_folder='static')
CORS(app)
openai.api_key = "this is where you put your chat gpt api key" 
# Serve static files (e.g., index.html, CSS, JS) from the "static" folder
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/javaCodeTest.html')
def javaCodeTest():
    return render_template('javaCodeTest.html')

@app.route('/codeTestUI.html')
def codeTestUI():
    return render_template('codeTestUI.html')

# Example API endpoint for POST requests
@app.route('/test', methods=['POST'])
def test_post():
    data = request.get_json()

    if not data or 'message' not in data:
        return jsonify({"error": "No 'message' field in the request"}), 400

    user_message = data['message']
    return jsonify({"response": f"Received message: {user_message}"}), 200

@app.route('/gpt', methods=['POST'])
def handle_request():
    try:
        data = request.json
        code_snippet = data.get("code", "")
        user_response = data.get("response", "")

        if not code_snippet or not user_response:
            return jsonify({"error": "Code or user response missing!"}), 400

        prompt = f"The following is a coding challenge:\n\nCode:\n{code_snippet}\n\nUser's Response:\n{user_response}\n\nPlease provide feedback on the user's response and suggest improvements."
        chat_gpt_response = getChatGptResponse(prompt)

        return jsonify({"result": chat_gpt_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def getChatGptResponse(content):
    chat_completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Use the correct model here
        messages=[{"role": "user", "content": content}]
    )
    chat_response = chat_completion["choices"][0]["message"]["content"]

    return chat_response    

if __name__ == '__main__':
    app.run(debug=True, port=8000)  # Flask will serve on port 8000
