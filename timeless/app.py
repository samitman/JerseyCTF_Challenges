from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask
from flask import Flask, flash, g, redirect, render_template, request, session, url_for
from functools import wraps
from dotenv import load_dotenv
import datetime
import os
import random
import string
import sqlite3

app = Flask(__name__)

# Load secret environment variables
load_dotenv()

app.secret_key = os.getenv("FLASK_SECRET_KEY", "".join(random.choice(string.ascii_letters) for _ in range(32)))
admin_password = os.getenv("ADMIN_PASSWORD", "".join(random.choice(string.ascii_letters) for _ in range(32)))

#databse functions credit to Edward JCTF2 web>flag_vault challenge
db_name = os.getenv("DATABASE", "temp.db")

# Helper function
def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = sqlite3.connect(db_name)
        db.row_factory = sqlite3.Row
        g._database = db
    return db

def setup_db():
    with app.app_context():
        db = get_db()

        # Setup admin user once
        cur = db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='users'")
        if len(cur.fetchall()) == 0:
            db.execute("CREATE TABLE users (username TEXT, password TEXT)")
            db.execute("INSERT INTO users (username, password) VALUES ('admin', ?)", (admin_password,))
        db.commit()

scheduler = BackgroundScheduler()
scheduler.add_job(setup_db, "interval", minutes=5, next_run_time=datetime.datetime.now())
scheduler.start()

#end credits to Edward

@app.route("/login", methods=["GET", "POST"])
def login():
    if "user" in session:
        flash("Already logged in", "dark")
        return redirect(url_for(index.__name__))

    if request.method == "GET":
        return render_template("login.html", user=None)

    username = request.form["username"]
    password = request.form["password"]

    db = get_db()
    cur = db.execute("SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'")
    user = cur.fetchone()
    if user is None or username.lower() != "admin":
        flash("Username/password not found", "danger")
        return redirect(url_for(login.__name__))

    session["user"] = user["username"]
    redirect_url = session.pop("next", index.__name__)
    return redirect(url_for(redirect_url))

@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect(url_for(login.__name__))

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get('user') is None:
            return redirect(url_for(login.__name__))
        return f(*args, **kwargs)
    return decorated_function

@app.route("/")
@login_required
def index():
    username = session.get("user", None)
    return render_template("index.html")

@app.route("/about/")
@login_required 
def about():
    return render_template("about.html")

@app.route("/contact/")
@login_required  
def contact():
    return render_template("contact.html")
