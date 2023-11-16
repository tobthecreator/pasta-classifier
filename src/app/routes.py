from app import app
from flask import render_template, request, jsonify
from app.learner import learner
from fastai.vision.all import *



categories = ['bowtie', 'fettuccine', 'lasagna', 'linguine', 'not pasta', 'penne', 'ravioli', 'rigatoni', 'rotini', 'spaghetti']


def classify_image(img):
    _, _, probs = learner.predict(img)

    return dict(zip(categories, map(float, probs)))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    print(learner)
    # Check if the request contains the 'image' part
    if 'image' not in request.files:
        return jsonify(message='No image part in the request'), 400

    file = request.files['image']

    # If no file was submitted
    if file.filename == '':
        return jsonify(message='No selected file'), 400
    

    im = PILImage.create(file)
    im.thumbnail((192,192))
    
    print(classify_image(im))

    # Here, you can add your code to process the image or save it
    # For example, file.save('path_to_save_image')

    # Respond with a simple message
    return jsonify(message='Hello World!')