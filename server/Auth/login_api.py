

import pymysql
import random
import string
from flask import Flask, render_template, request, redirect, url_for, session, jsonify

app = Flask(__name__)
app.secret_key = 'b9b3ef4dd0c86ed9f2a6c0181aa7893f6067c3b02ad92e1d'

# Database connection setup
def get_db_connection():
    return pymysql.connect(
        host='localhost',
        user='root',  # Replace with your DB username
        password='12345678',  # Replace with your DB password
        database='user_registration',  # Replace with your DB name
        cursorclass=pymysql.cursors.DictCursor
    )

@app.route('/')
def index():
    # Home page (Login page)
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    username_or_email = request.form['username_or_email']
    password = request.form['password']
    
    connection = get_db_connection()
    cursor = connection.cursor()
    
    # Check if user exists based on username or email
    cursor.execute("SELECT * FROM users WHERE username = %s OR email = %s", (username_or_email, username_or_email))
    user = cursor.fetchone()

    if user and user['password'] == password:
        session['user_id'] = user['id']  # Save user ID in session
        return redirect(url_for('ott_options'))  # Redirect to OTT options page
    else:
        return render_template('login.html', error='Incorrect credentials')

@app.route('/ott-options')
def ott_options():
    # Show OTT platforms options after successful login
    if 'user_id' not in session:
        return redirect(url_for('index'))
    
    return render_template('ott_options.html')

@app.route('/create-group', methods=['POST'])
def create_group():
    if 'user_id' not in session:
        return redirect(url_for('index'))

    group_name = request.form['group_name']
    ott_name = request.form['ott_name']
    created_by = session['user_id']  # Get user ID from session

    # Generate a unique invite link for the group
    invite_link = ''.join(random.choices(string.ascii_letters + string.digits, k=16))

    # Insert new group details into group_detail table
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("""
        INSERT INTO group_detail (group_name, OTT_name, created_by, number_of_user, invite_link)
        VALUES (%s, %s, %s, %s, %s)
    """, (group_name, ott_name, created_by, 1, invite_link))
    connection.commit()

    return redirect(url_for('view_groups', ott_name=ott_name))

@app.route('/view-groups/<ott_name>', methods=['GET', 'POST'])
def view_groups(ott_name):
    if 'user_id' not in session:
        return redirect(url_for('index'))
    
    connection = get_db_connection()
    cursor = connection.cursor()

    # Fetch groups for the specific OTT
    cursor.execute("SELECT * FROM group_detail WHERE OTT_name = %s", (ott_name,))
    groups = cursor.fetchall()

    if request.method == 'POST':
        group_id = request.form['group_id']
        user_id = session['user_id']  # Current logged-in user
        
        # Add user to the selected group (increment number_of_user and store user_id)
        cursor.execute("""
            UPDATE group_detail
            SET number_of_user = number_of_user + 1
            WHERE group_id = %s AND number_of_user < 4
        """, (group_id,))
        connection.commit()

        return redirect(url_for('view_groups', ott_name=ott_name))
    
    return render_template('group_list.html', groups=groups, ott_name=ott_name)

@app.route('/join-group', methods=['POST'])
def join_group():
    if 'user_id' not in session:
        return redirect(url_for('index'))

    group_id = request.form['group_id']
    user_id = session['user_id']

    # Add user to the group
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT number_of_user FROM group_detail WHERE group_id = %s
    """, (group_id,))
    group = cursor.fetchone()

    if group['number_of_user'] < 4:
        cursor.execute("""
            UPDATE group_detail
            SET number_of_user = number_of_user + 1
            WHERE group_id = %s
        """, (group_id,))
        connection.commit()
    
    return redirect(url_for('view_groups', ott_name=group['OTT_name']))

@app.route('/groups', methods=['GET'])
def groups():
    if 'user_id' not in session:
        return redirect(url_for('index'))
    
    ott_name = request.args.get('ott')
    connection = get_db_connection()
    cursor = connection.cursor()

    # Fetch groups for the specific OTT
    cursor.execute("SELECT * FROM group_detail WHERE OTT_name = %s", (ott_name,))
    groups = cursor.fetchall()

    return render_template('group_list.html', groups=groups, ott_name=ott_name)

if __name__ == '__main__':
    app.run(debug=True)
