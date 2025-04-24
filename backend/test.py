# app.py
from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the pre-trained model
model = joblib.load('govt_scheme_predictor.pkl')

@app.route('/')
def home():
    return "Government Scheme Predictor API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Extract values from request
        age = int(data.get('age', 0))
        gender = data.get('gender', '')
        occupation = data.get('occupation', '')
        income = int(data.get('income', 0))
        location = data.get('location', '')
        
        # Extract location_type and region from location
        location_parts = location.split('-')
        location_type = location_parts[0] if len(location_parts) > 0 else ""
        location_region = location_parts[1] if len(location_parts) > 1 else ""
        
        # Create a DataFrame for prediction
        input_data = pd.DataFrame({
            'age': [age],
            'gender': [gender],
            'occupation': [occupation],
            'income': [income],
            'location_type': [location_type],
            'location_region': [location_region]
        })
        
        # Make prediction
        prediction = model.predict(input_data)
        prediction_probability = model.predict_proba(input_data)
        
        # Find top 3 schemes with probabilities
        classes = model.classes_
        proba_list = prediction_probability[0]
        
        # Sort probabilities and get indices
        top_indices = proba_list.argsort()[-3:][::-1]
        
        # Create list of top schemes with probabilities
        top_schemes = [
            {"scheme": classes[i], "probability": float(proba_list[i])}
            for i in top_indices
        ]
        
        return jsonify({
            "predicted_scheme": prediction[0],
            "top_schemes": top_schemes,
            "success": True
        })
    
    except Exception as e:
        return jsonify({
            "error": str(e),
            "success": False
        }), 400

@app.route('/schemes', methods=['GET'])
def get_schemes():
    # Return the list of all possible schemes from the model
    return jsonify({
        "schemes": list(model.classes_),
        "success": True
    })

@app.route('/locations', methods=['GET'])
def get_locations():
    # This would ideally come from your database
    # For demo purposes, returning a hardcoded list of locations
    locations = [
        "Urban-Mumbai", "Urban-Delhi", "Urban-Bangalore", "Urban-Hyderabad", 
        "Urban-Chennai", "Urban-Kolkata", "Urban-Ahmedabad", "Urban-Pune",
        "Urban-Lucknow", "Urban-Patna", "Urban-Nagpur", "Urban-Guwahati",
        "Semi-Urban-Pune", "Semi-Urban-Jaipur", "Semi-Urban-Surat", 
        "Semi-Urban-Indore", "Semi-Urban-Bhopal", "Semi-Urban-Chandigarh",
        "Semi-Urban-Coimbatore", "Semi-Urban-Dehradun",
        "Rural-Bihar", "Rural-Punjab", "Rural-Uttar Pradesh", "Rural-Madhya Pradesh",
        "Rural-Kerala", "Rural-Tamil Nadu", "Rural-Gujarat", "Rural-Rajasthan",
        "Rural-Haryana", "Rural-Assam", "Rural-Jharkhand"
    ]
    return jsonify({
        "locations": locations,
        "success": True
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

