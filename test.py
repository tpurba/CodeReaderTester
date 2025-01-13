from flask import Flask, request, jsonify
import os
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Make sure to replace this with your actual OpenAI API key

openai.api_key = "this is where you put your chat gpt api key" 


@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json["message"]

    # Make a request to OpenAI's chat completion API
    chat_completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Use the correct model here
        messages=[{"role": "user", "content": user_input}]
    )
    # Extract the response text from OpenAI
    chat_response = chat_completion["choices"][0]["message"]["content"]

    return jsonify({"response": chat_response})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
