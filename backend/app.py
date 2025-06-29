from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from utils import get_images

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload_file():    
    file = request.files['file']
    if not file:
        return jsonify({"error" : "no files uploaded"}), 400
    
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    print("file saved successfully. getting image urls...")
    result = get_images(file_path)

    return result

if __name__ == "__main__":
    app.run(debug=True)