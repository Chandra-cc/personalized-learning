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
    "Become a UI/UX Designer": [
        {
            "title": "Learn the Fundamentals of UX Design",
            "duration": "1 week",
            "resource": "https://careerfoundry.com/en/blog/ux-design/how-to-become-a-ux-designer/"
        },
        {
            "title": "Develop an Eye for Good Design",
            "duration": "1 week",
            "resource": "https://dribbble.com/resources/education/how-to-become-ui-ux-designer"
        },
        {
            "title": "Invest in the Right Design Software",
            "duration": "1 week",
            "resource": "https://www.figma.com/resources/learn-design/"
        },
        {
            "title": "Build a Portfolio of Work",
            "duration": "2 weeks",
            "resource": "https://www.behance.net/"
        }
    ],
    "Become a Product Manager": [
        {
            "title": "Learn the Fundamentals of Product Management",
            "duration": "1 week",
            "resource": "https://careerfoundry.com/en/blog/product-management/how-to-become-a-product-manager/"
        },
        {
            "title": "Enroll in a Product Management Training Course",
            "duration": "2 weeks",
            "resource": "https://www.linkedin.com/learning/paths/explore-a-career-in-product-management"
        },
        {
            "title": "Build Practical Experience",
            "duration": "2 weeks",
            "resource": "https://www.productplan.com/learn/product-manager-career-path/"
        },
        {
            "title": "Develop Technical Skills",
            "duration": "1 week",
            "resource": "https://www.coursera.org/resources/job-leveling-matrix-for-product-management-career-pathways"
        }
    ],
    "Become an Ethical Hacker": [
        {
            "title": "Develop Foundational Skills in Ethical Hacking",
            "duration": "1 week",
            "resource": "https://www.simplilearn.com/tutorials/cyber-security-tutorial/how-to-become-an-ethical-hacker"
        },
        {
            "title": "Choose Your Learning Path",
            "duration": "1 week",
            "resource": "https://www.hackthebox.com/blog/become-an-ethical-hacker-a-career-guide-for-ethical-hacking"
        },
        {
            "title": "Prove Your Practical Skills",
            "duration": "2 weeks",
            "resource": "https://www.netacad.com/courses/ethical-hacker"
        },
        {
            "title": "Obtain IT Security Certification",
            "duration": "2 weeks",
            "resource": "https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/"
        }
    ],
    "Become a Mobile App Developer": [
        {
            "title": "Decide on Your Development Path",
            "duration": "1 week",
            "resource": "https://buildfire.com/become-mobile-app-developer/"
        },
        {
            "title": "Learn to Code",
            "duration": "2 weeks",
            "resource": "https://roadmap.sh/android"
        },
        {
            "title": "Pursue Certifications",
            "duration": "1 week",
            "resource": "https://zerotomastery.io/career-paths/become-a-mobile-developer/"
        },
        {
            "title": "Create Your App Developer Resume",
            "duration": "1 week",
            "resource": "https://www.indeed.com/career-advice/career-development/how-to-become-app-developer"
        }
    ],
    "Become a Data Analyst": [
        {
            "title": "Learn Data Analysis Fundamentals",
            "duration": "1 week",
            "resource": "https://www.coursera.org/learn/data-analysis"
        },
        {
            "title": "Master Excel for Data Analysis",
            "duration": "1 week",
            "resource": "https://www.linkedin.com/learning/learning-excel-data-analysis"
        },
        {
            "title": "Understand SQL for Data Retrieval",
            "duration": "1 week",
            "resource": "https://www.datacamp.com/courses/intro-to-sql-for-data-science"
        },
        {
            "title": "Build a Data Analysis Portfolio",
            "duration": "2 weeks",
            "resource": "https://www.kaggle.com/learn/data-visualization"
        }
    ],
    "Become a Software Engineer": [
        {
            "title": "Learn Programming Fundamentals",
            "duration": "1 week",
            "resource": "https://www.edx.org/course/introduction-computer-science-harvardx-cs50x"
        },
        {
            "title": "Understand Data Structures and Algorithms",
            "duration": "2 weeks",
            "resource": "https://www.coursera.org/specializations/data-structures-algorithms"
        },
        {
            "title": "Master Software Development Tools",
            "duration": "1 week",
            "resource": "https://www.linkedin.com/learning/learning-git-and-github"
        },
        {
            "title": "Build Real-World Projects",
            "duration": "2 weeks",
            "resource": "https://www.freecodecamp.org/"
        }
    ],
    "Become a Digital Marketer": [
        {
            "title": "Learn Digital Marketing Basics",
            "duration": "1 week",
            "resource": "https://www.coursera.org/specializations/digital-marketing"
        },
        {
            "title": "Master SEO Strategies",
            "duration": "1 week",
            "resource": "https://moz.com/learn/seo/what-is-seo"
        },
        {
            "title": "Understand Social Media Marketing",
            "duration": "1 week",
            "resource": "https://www.hubspot.com/resources/social-media-marketing"
        },
        {
            "title": "Build a Marketing Campaign",
            "duration": "2 weeks",
            "resource": "https://www.google.com/ads"
        }
    ],
    "Become a Cybersecurity Specialist": [
        {
            "title": "Learn Cybersecurity Fundamentals",
            "duration": "1 week",
            "resource": "https://www.coursera.org/specializations/ibm-cybersecurity-analyst"
        },
        {
            "title": "Understand Network Security",
            "duration": "1 week",
            "resource": "https://www.cybrary.it/course/network-security/"
        },
        {
            "title": "Master Ethical Hacking Techniques",
            "duration": "2 weeks",
            "resource": "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/"
        },
        {
            "title": "Prepare for Security Certifications",
            "duration": "2 weeks",
            "resource": "https://www.comptia.org/certifications/security"
        }
    ],
    "Become a Machine Learning Engineer": [
        {
            "title": "Learn Machine Learning Basics",
            "duration": "1 week",
            "resource": "https://www.coursera.org/learn/machine-learning"
        },
        {
            "title": "Understand Deep Learning Concepts",
            "duration": "1 week",
            "resource": "https://www.deeplearning.ai/deep-learning-specialization/"
        },
        {
            "title": "Master ML Tools and Frameworks",
            "duration": "1 week",
            "resource": "https://www.tensorflow.org/"
        },
        {
            "title": "Build and Deploy ML Models",
            "duration": "2 weeks",
            "resource": "https://www.udacity.com/course/machine-learning-engineer-nanodegree--nd009t"
        }
    ]
}