from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Define scoring system
response_mapping = {"Yes": 1, "No": 0, "Partial": 0.5}

# Serve the HTML file at both root and /try1/manual.html
@app.route('/')
@app.route('/try1/manual.html')
def serve_html():
    return send_from_directory('.', 'manual.html')

# Handle score calculation
@app.route('/try1/calculate_score', methods=['POST', 'OPTIONS'])
def calculate_score():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        print("Received Data:", data)  # Debugging

        total_requirements = len(data)
        if total_requirements == 0:
            return jsonify({"score": "0.00"})

        total_score = sum(response_mapping.get(value, 0) for value in data.values())
        final_score = (total_score / total_requirements) * 100

        response = jsonify({"score": f"{final_score:.2f}"})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    except Exception as e:
        print("Error:", str(e))  # Debugging
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Server starting at http://localhost:5000")
    print("Access the checklist at http://localhost:5000/try1/manual.html")
    app.run(host='0.0.0.0', port=5000, debug=True)
