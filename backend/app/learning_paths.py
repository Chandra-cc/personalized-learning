# app/learning_paths.py

learning_path_templates = {
    "Become a Data Scientist": [
        {"title": "Python Basics", "duration": "1 week", "resource": "https://www.learnpython.org/"},
        {"title": "Statistics for Data Science", "duration": "1 week", "resource": "https://www.khanacademy.org/math/statistics-probability"},
        {"title": "Pandas & NumPy", "duration": "1 week", "resource": "https://www.datacamp.com/courses"},
        {"title": "Machine Learning Basics", "duration": "2 weeks", "resource": "https://www.coursera.org/learn/machine-learning"},
    ],
    "Become a Web Developer": [
        {"title": "HTML, CSS Basics", "duration": "1 week", "resource": "https://developer.mozilla.org/en-US/docs/Learn"},
        {"title": "JavaScript Essentials", "duration": "1 week", "resource": "https://javascript.info/"},
        {"title": "React Basics", "duration": "1 week", "resource": "https://reactjs.org/docs/getting-started.html"},
        {"title": "Backend with Node.js", "duration": "2 weeks", "resource": "https://nodejs.dev/learn"},
    ],
    # Add more goals here...
}

def generate_learning_path(goal):
    return learning_path_templates.get(goal, [])