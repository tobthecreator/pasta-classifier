from app import app
from flask import render_template, request, jsonify
from app.learner import get_learner
from fastai.vision.all import *

categories = ['bowtie', 'fettuccine', 'lasagna', 'linguine', 'not pasta', 'penne', 'ravioli', 'rigatoni', 'rotini', 'spaghetti']


def classify_image(learner, img):
    _, _, probs = learner.predict(img)

    return dict(zip(categories, map(float, probs)))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    learner = get_learner()
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
    
    return jsonify(classify_image(learner, im))