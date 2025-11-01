from flask import Flask, render_template, request, url_for
from flask_sqlalchemy import SQLAlchemy
import os


app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'items_museum.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Model DB  -----------------------------------------------------

class Photo(db.Model):
    __tablename__ = 'photos'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    itemImage = db.Column(db.String(255), nullable=False)
    itemName = db.Column(db.String(100), nullable=False)
    itemDescription = db.Column(db.String(255), nullable=True)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), nullable=False)
    usermail = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)

def db_create():
    with app.app_context():
        db.create_all()
     

# Routes -----------------------------------------------------

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        usermail = request.form.get('useremail')
        password = request.form.get('userpassword')

        db.session.add(User(username=username, usermail=usermail, password=password))
        db.session.commit()

    return render_template('register.html')


@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/add-item', methods=['GET', 'POST'])
def add_item():
    if request.method == 'POST':
        file = request.files.get('itemImage')
        name = request.form.get('itemName')
        description = request.form.get('itemDescription')

        db.session.add(Photo(itemImage=file.filename, itemName=name, itemDescription=description))
        db.session.commit()

    return render_template('add-item.html')
    
    




if __name__ == '__main__':
    # db_create()   
    app.run(debug=True)