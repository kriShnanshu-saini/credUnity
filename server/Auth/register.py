from flask import Flask, request, jsonify, render_template
import mysql.connector
from werkzeug.security import generate_password_hash

app = Flask(__name__)

# MySQL Database Configuration
db_config = {
    'host': 'localhost',  # Update this with your database host if needed
    'user': '',       # Replace with your MySQL username
    'password': '',  # Replace with your MySQL root password
    'database': ''  # Replace with your database name
}

# Root route to serve the registration HTML page
@app.route('/')
def home():
    return render_template('register.html')

# Endpoint to register a user
@app.route('/register', methods=['POST'])
def register():
    # Get data from the request
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    # Validate input
    if not username or not email or not password:
        return jsonify({"error": "All fields are required!"}), 400
    
    try:
        # Hash the password for secure storage
        hashed_password = generate_password_hash(password)
        
        # Connect to the MySQL database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        
        # Insert the user into the database
        insert_query = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
        cursor.execute(insert_query, (username, email, hashed_password))
        conn.commit()
        
        # Success response
        return jsonify({"message": "User registered successfully!"}), 201
    except mysql.connector.Error as err:
        # Handle specific database errors, such as duplicate entry
        if err.errno == 1062:  # Duplicate entry error code
            return jsonify({"error": "Username or email already exists!"}), 409
        return jsonify({"error": "Database error occurred!"}), 500
    finally:
        cursor.close()
        conn.close()

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
