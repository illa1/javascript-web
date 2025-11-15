from flask import Flask, render_template, request, url_for, session, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os


USER_SESION_KEY = 'user'

app = Flask(__name__)
app.secret_key = 'supersecretkey'
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'items_museum.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Model DB  -----------------------------------------------------
# Photo Model
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
    password = db.Column(db.String(200), nullable=False)

    

def db_create():
    with app.app_context():
        db.create_all()
     

# Routes -----------------------------------------------------

@app.route('/')
def index():
    # key = ''
    # if 'user' in session:
    #     key =  f"""Hello, {session['user']}! Welcome to the Item Museum."""
    
    return render_template('index.html', user=session.get('user'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        usermail = request.form.get('useremail')
        password = request.form.get('userpassword')
        
        hashed_password = generate_password_hash(password)

        db.session.add(User(username=username, usermail=usermail, password=hashed_password))
        db.session.commit()

    return render_template('register.html')


@app.route('/login', methods = ['GET', 'POST'])
def login():
    if request.method == 'POST':
        usermail = request.form.get('useremail')
        password = request.form.get('userpassword')
        user = User.query.filter_by(usermail=usermail, password=password).first()

        user = User.query.filter_by(usermail=usermail).first()
       
        if user and check_password_hash(user.password, password): 
        # if user and user.password == password: 
            session[USER_SESION_KEY] = usermail
            return redirect(url_for("index") )
        else:
            error = 'Invalid Credentials. Please try again.'
            return render_template('login.html', error=error)
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('index'))


@app.route('/add-item', methods=['GET', 'POST'])
def add_item():
    if request.method == 'POST':
        file = request.files.get('itemImage')
        name = request.form.get('itemName')
        description = request.form.get('itemDescription')

        db.session.add(Photo(itemImage=file.filename, itemName=name, itemDescription=description))
        db.session.commit()

    return render_template('add-item.html')
    

@app.route('/gallery')
def gallery():
    photos = Photo.query.all()    
    # return jsonify(photos), 200
    return jsonify([{
        'itemImage': 'static/img/' +  photo.itemImage, 
        'itemName': photo.itemName, 
        'itemDescription': photo.itemDescription
        } for photo in photos]), 200 



if __name__ == '__main__':
    db_create()   
    app.run(debug=True)