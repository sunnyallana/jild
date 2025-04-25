from flask import Flask, request, send_file, jsonify
from inference_sdk import InferenceHTTPClient
import cv2
import numpy as np
import tempfile
import os
import base64
from flask_cors import CORS
from dotenv import load_dotenv
from pathlib import Path

# Get the parent directory where .env is located
env_path = Path('../.env')

# Load environment variables from the specified .env file
load_dotenv(dotenv_path=env_path)

app = Flask(__name__)
CORS(app)

# Get API key from environment variable
ROBOFLOW_API_KEY = os.getenv('ROBOFLOW_API_KEY')
if not ROBOFLOW_API_KEY:
    raise ValueError("No ROBOFLOW_API_KEY set in environment variables")

# Roboflow client
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key=ROBOFLOW_API_KEY
)

@app.route('/', methods=['GET'])
def welcome():
    return "Welcome to Jild's Skin AI"


@app.route('/predict', methods=['POST'])
def predict():
    # Get the image from the request
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    img_array = np.frombuffer(file.read(), np.uint8)
    image = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

    # Save temp file for inference
    with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as temp_file:
        temp_path = temp_file.name
        cv2.imwrite(temp_path, image)
        result = CLIENT.infer(temp_path, model_id="acne-dark-circle/1")
        os.unlink(temp_path)  # Delete the temp file

    # Prepare detection data and draw bounding boxes
    detections = []
    for prediction in result['predictions']:
        x, y = int(prediction['x']), int(prediction['y'])
        w, h = int(prediction['width']), int(prediction['height'])
        class_name = prediction['class']
        confidence = float(prediction['confidence'])

        # Store detection data
        detections.append({
            'class': class_name,
            'confidence': confidence,
            'bounding_box': {
                'x': x - w // 2,
                'y': y - h // 2,
                'width': w,
                'height': h
            }
        })

        # Draw bounding box
        x1, y1 = x - w // 2, y - h // 2
        x2, y2 = x + w // 2, y + h // 2
        cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(image, f"{class_name} ({confidence:.2f})", (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    # Convert annotated image to base64
    _, img_encoded = cv2.imencode('.jpg', image)
    img_base64 = base64.b64encode(img_encoded).decode('utf-8')

    # Prepare response
    response = {
        'detections': detections,
        'annotated_image': img_base64,
        'image_format': 'jpg'
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0')

