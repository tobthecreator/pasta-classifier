from app import app
from app.learner import load_learner_model
categories = ['bowtie', 'fettuccine', 'lasagna', 'linguine', 'not pasta', 'penne', 'ravioli', 'rigatoni', 'rotini', 'spaghetti']


if __name__ == '__main__':
    def get_y(file_path):
        parent_folder = file_path.parent.name

        if parent_folder in categories:
            return parent_folder
        else:
            return "not pasta"
        
    # learn = load_learner('src/model/model.pkl')
    load_learner_model()
    app.run(debug=False, port=8080)