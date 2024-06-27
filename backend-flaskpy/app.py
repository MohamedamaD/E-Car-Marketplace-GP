from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from ML.make_model_style_year import predict_image
from ML.car_search import search_cars
import os

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/predict-car', methods=['POST'])
def predict_car():
    try:
        if request.method == 'POST':
            if 'file' not in request.files:
                return 'No file part'
            file = request.files['file']
            if file.filename == '':
                return 'No selected file'
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(image_path)
                predicted_class = predict_image(image_path)
                print(predicted_class)
                return predicted_class
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/search-cars', methods=['GET'])
def search_cars_route():
    msrp = request.args.get('msrp')
    length = request.args.get('length')
    passenger_capacity = request.args.get('passenger_capacity')

    if not all([msrp, length, passenger_capacity]):
        return jsonify({'error': 'Please provide MSRP, length, and passenger capacity'})

    result = search_cars(msrp, length, passenger_capacity)

    return jsonify(result)

if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True)
