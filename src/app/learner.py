from fastai.vision.all import *

learner = None

def load_learner_model():
    print('LOADINGGGGG')
    # global learner
    learner = load_learner('src/model/model.pkl')
    print(learner)
