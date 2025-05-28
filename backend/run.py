from app import create_app

app = create_app()

if __name__ == "__main__":
    # For local development (uncomment this line)
    # app.run(debug=True)
    
    # For EC2 deployment (uncomment this line)
    app.run(host='0.0.0.0', port=5000, debug=True)
