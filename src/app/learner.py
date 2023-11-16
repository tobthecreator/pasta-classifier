from fastai.vision.all import *

learner = None

def load_learner_model():
    print('LOADINGGGGG')
    # global learner
    learner = load_learner('src/model/model.pkl')
    print(learner)

# from fastai.vision.all import load_learner

class LearnerSingleton:
    _instance = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = load_learner('src/model/model.pkl')
        return cls._instance

# Optional: a convenience function to get the learner
def get_learner():
    return LearnerSingleton.get_instance()
