# app/learning_paths.py

learning_path_templates = {
    "Become a Data Scientist": [
        {
            "title": "Python Basics",
            "duration": "1 week",
            "description": "Master fundamental Python concepts essential for data science",
            "learning_objectives": [
                "Understand Python syntax and data types",
                "Work with lists, dictionaries, and sets",
                "Write functions and handle exceptions",
                "Use list comprehensions and generators"
            ],
            "resources": {
                "primary": "https://www.learnpython.org/",
                "video_course": "https://www.coursera.org/learn/python-for-data-science",
                "practice": "https://www.hackerrank.com/domains/python",
                "documentation": "https://docs.python.org/3/"
            },
            "projects": [
                {
                    "title": "Data Analysis Script",
                    "description": "Create a script to analyze and visualize a dataset",
                    "difficulty": "beginner"
                }
            ],
            "prerequisites": [],
            "skills_gained": ["Python Programming", "Basic Data Structures", "File Handling"]
        },
        {
            "title": "Statistics for Data Science",
            "duration": "1 week",
            "description": "Learn essential statistical concepts for data analysis",
            "learning_objectives": [
                "Understand descriptive statistics",
                "Master probability distributions",
                "Perform hypothesis testing",
                "Apply statistical inference"
            ],
            "resources": {
                "primary": "https://www.khanacademy.org/math/statistics-probability",
                "video_course": "https://www.edx.org/course/statistical-thinking-for-data-science",
                "practice": "https://www.kaggle.com/learn/intro-to-statistics",
                "documentation": "https://www.statsmodels.org/stable/index.html"
            },
            "projects": [
                {
                    "title": "Statistical Analysis Report",
                    "description": "Analyze a real-world dataset using statistical methods",
                    "difficulty": "intermediate"
                }
            ],
            "prerequisites": ["Python Basics"],
            "skills_gained": ["Statistical Analysis", "Probability Theory", "Data Interpretation"]
        },
        {
            "title": "Pandas & NumPy",
            "duration": "1 week",
            "description": "Master data manipulation and numerical computing libraries",
            "learning_objectives": [
                "Perform data manipulation with Pandas",
                "Use NumPy for numerical computations",
                "Clean and preprocess data",
                "Create data visualizations"
            ],
            "resources": {
                "primary": "https://www.datacamp.com/courses/pandas-foundations",
                "video_course": "https://www.udemy.com/course/data-analysis-with-pandas",
                "practice": "https://pandas.pydata.org/docs/getting_started/tutorials.html",
                "documentation": "https://pandas.pydata.org/docs/"
            },
            "projects": [
                {
                    "title": "Data Cleaning Pipeline",
                    "description": "Build a data preprocessing pipeline for messy datasets",
                    "difficulty": "intermediate"
                }
            ],
            "prerequisites": ["Python Basics", "Statistics for Data Science"],
            "skills_gained": ["Data Manipulation", "Data Cleaning", "Data Visualization"]
        },
        {
            "title": "Machine Learning Basics",
            "duration": "2 weeks",
            "description": "Introduction to machine learning algorithms and techniques",
            "learning_objectives": [
                "Understand supervised and unsupervised learning",
                "Implement classification and regression models",
                "Evaluate model performance",
                "Perform feature engineering"
            ],
            "resources": {
                "primary": "https://www.coursera.org/learn/machine-learning",
                "video_course": "https://www.fast.ai/",
                "practice": "https://scikit-learn.org/stable/auto_examples/index.html",
                "documentation": "https://scikit-learn.org/stable/"
            },
            "projects": [
                {
                    "title": "Predictive Model Development",
                    "description": "Build and deploy a machine learning model",
                    "difficulty": "advanced"
                }
            ],
            "prerequisites": ["Python Basics", "Statistics for Data Science", "Pandas & NumPy"],
            "skills_gained": ["Machine Learning", "Model Evaluation", "Feature Engineering"]
        }
    ],
    "Become a Web Developer": [
        {
            "title": "HTML, CSS Basics",
            "duration": "1 week",
            "description": "Learn the fundamentals of web development",
            "learning_objectives": [
                "Understand HTML structure and semantics",
                "Master CSS styling and layouts",
                "Create responsive designs",
                "Implement modern CSS features"
            ],
            "resources": {
                "primary": "https://developer.mozilla.org/en-US/docs/Learn",
                "video_course": "https://www.frontendmasters.com/learn/html-css/",
                "practice": "https://www.frontendmentor.io/",
                "documentation": "https://developer.mozilla.org/en-US/docs/Web"
            },
            "projects": [
                {
                    "title": "Portfolio Website",
                    "description": "Create a responsive personal portfolio",
                    "difficulty": "beginner"
                }
            ],
            "prerequisites": [],
            "skills_gained": ["HTML5", "CSS3", "Responsive Design"]
        },
        {
            "title": "JavaScript Essentials",
            "duration": "1 week",
            "description": "Master core JavaScript concepts and DOM manipulation",
            "learning_objectives": [
                "Understand JavaScript fundamentals",
                "Master DOM manipulation",
                "Handle events and callbacks",
                "Work with APIs and async programming"
            ],
            "resources": {
                "primary": "https://javascript.info/",
                "video_course": "https://www.udemy.com/course/modern-javascript",
                "practice": "https://www.codewars.com/collections/javascript-fundamentals",
                "documentation": "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            },
            "projects": [
                {
                    "title": "Interactive Web App",
                    "description": "Build a dynamic web application with vanilla JS",
                    "difficulty": "intermediate"
                }
            ],
            "prerequisites": ["HTML, CSS Basics"],
            "skills_gained": ["JavaScript", "DOM Manipulation", "Async Programming"]
        },
        {
            "title": "React Basics",
            "duration": "1 week",
            "description": "Learn modern React development with hooks",
            "learning_objectives": [
                "Understand React components and JSX",
                "Master hooks and state management",
                "Handle forms and user input",
                "Implement routing and navigation"
            ],
            "resources": {
                "primary": "https://reactjs.org/docs/getting-started.html",
                "video_course": "https://www.udemy.com/course/react-the-complete-guide",
                "practice": "https://react-tutorial.app/",
                "documentation": "https://reactjs.org/docs/getting-started.html"
            },
            "projects": [
                {
                    "title": "React Dashboard",
                    "description": "Create a data dashboard with React",
                    "difficulty": "intermediate"
                }
            ],
            "prerequisites": ["JavaScript Essentials"],
            "skills_gained": ["React", "State Management", "Component Design"]
        },
        {
            "title": "Backend with Node.js",
            "duration": "2 weeks",
            "description": "Build scalable backend services with Node.js",
            "learning_objectives": [
                "Create RESTful APIs with Express",
                "Work with databases (MongoDB/SQL)",
                "Implement authentication and authorization",
                "Handle file uploads and processing"
            ],
            "resources": {
                "primary": "https://nodejs.dev/learn",
                "video_course": "https://www.udemy.com/course/nodejs-express-mongodb",
                "practice": "https://nodeschool.io/",
                "documentation": "https://nodejs.org/en/docs/"
            },
            "projects": [
                {
                    "title": "Full-Stack Application",
                    "description": "Develop a complete web application with authentication",
                    "difficulty": "advanced"
                }
            ],
            "prerequisites": ["JavaScript Essentials", "React Basics"],
            "skills_gained": ["Node.js", "Express", "Database Design", "API Development"]
        }
    ],
    "Become a UI/UX Designer": [
        {
            "title": "Learn the Fundamentals of UX Design",
            "duration": "1 week",
            "description": "Master the core principles of user experience design",
            "learning_objectives": [
                "Understand UX design principles and methodology",
                "Learn user research techniques",
                "Master information architecture",
                "Create user personas and journey maps"
            ],
            "resources": {
                "primary": "https://careerfoundry.com/en/blog/ux-design/how-to-become-a-ux-designer/",
                "video_course": "https://www.coursera.org/learn/ux-design-fundamentals",
                "practice": "https://www.nngroup.com/articles/",
                "documentation": "https://www.interaction-design.org/literature"
        },
            "projects": [
        {
                    "title": "User Research Project",
                    "description": "Conduct user research and create personas for a digital product",
                    "difficulty": "beginner"
                }
            ],
            "prerequisites": [],
            "skills_gained": ["User Research", "UX Methodology", "Information Architecture"]
        },
        {
            "title": "Master UI Design Principles",
            "duration": "1 week",
            "description": "Learn visual design principles and UI best practices",
            "learning_objectives": [
                "Master color theory and typography",
                "Learn layout and composition",
                "Understand visual hierarchy",
                "Create consistent design systems"
            ],
            "resources": {
                "primary": "https://www.figma.com/resources/learn-design/",
                "video_course": "https://www.udacity.com/course/ui-design--ud511",
                "practice": "https://dribbble.com/learn",
                "documentation": "https://material.io/design"
        },
            "projects": [
        {
                    "title": "Design System Creation",
                    "description": "Create a comprehensive design system for a web application",
                    "difficulty": "intermediate"
                }
            ],
            "prerequisites": ["Learn the Fundamentals of UX Design"],
            "skills_gained": ["Visual Design", "Typography", "Color Theory", "Design Systems"]
        },
        {
            "title": "Design Tools and Prototyping",
            "duration": "1 week",
            "description": "Master industry-standard design and prototyping tools",
            "learning_objectives": [
                "Master Figma/Sketch",
                "Create interactive prototypes",
                "Learn design handoff best practices",
                "Implement design version control"
            ],
            "resources": {
                "primary": "https://www.figma.com/resources/learn-design/",
                "video_course": "https://www.skillshare.com/classes/Figma-for-Beginners",
                "practice": "https://www.figma.com/community",
                "documentation": "https://help.figma.com/"
        },
            "projects": [
        {
                    "title": "Interactive Prototype",
                    "description": "Create a high-fidelity interactive prototype",
                    "difficulty": "intermediate"
                }
            ],
            "prerequisites": ["Master UI Design Principles"],
            "skills_gained": ["Figma", "Prototyping", "Design Handoff", "Version Control"]
        },
        {
            "title": "Build Your UX/UI Portfolio",
            "duration": "2 weeks",
            "description": "Create a compelling portfolio showcasing your design process",
            "learning_objectives": [
                "Document design process",
                "Create case studies",
                "Build an online portfolio",
                "Present your work effectively"
            ],
            "resources": {
                "primary": "https://www.behance.net/",
                "video_course": "https://www.skillshare.com/classes/Creating-a-Design-Portfolio",
                "practice": "https://www.notion.so/templates/design-portfolio",
                "documentation": "https://www.bestfolios.com/resources"
            },
            "projects": [
                {
                    "title": "Portfolio Website",
                    "description": "Design and build your portfolio website with case studies",
                    "difficulty": "advanced"
                }
            ],
            "prerequisites": ["Design Tools and Prototyping"],
            "skills_gained": ["Portfolio Creation", "Case Studies", "Presentation Skills"]
        }
    ],
    "Become a Product Manager": [
        {
            "title": "Product Management Fundamentals",
            "duration": "1 week",
            "description": "Learn the core principles of product management",
            "learning_objectives": [
                "Understand product lifecycle",
                "Learn product strategy",
                "Master product discovery",
                "Define product metrics"
            ],
            "resources": {
                "primary": "https://www.productplan.com/learn/product-management-fundamentals/",
                "video_course": "https://www.udacity.com/course/product-manager-nanodegree--nd036",
                "practice": "https://www.productschool.com/blog/",
                "documentation": "https://www.atlassian.com/agile/product-management"
        },
            "projects": [
        {
                    "title": "Product Strategy Document",
                    "description": "Create a comprehensive product strategy",
                    "difficulty": "beginner"
                }
            ],
            "prerequisites": [],
            "skills_gained": ["Product Strategy", "Product Discovery", "Metrics Analysis"]
        },
        {
            "title": "User Research and Analysis",
            "duration": "2 weeks",
            "description": "Master user research methods and data analysis",
            "learning_objectives": [
                "Conduct user interviews",
                "Analyze market research",
                "Create user personas",
                "Perform competitive analysis"
            ],
            "resources": {
                "primary": "https://www.productplan.com/learn/product-research/",
                "video_course": "https://www.coursera.org/learn/user-research",
                "practice": "https://www.usertesting.com/resources",
                "documentation": "https://www.uxmatters.com/topics/research/"
            },
            "projects": [
                {
                    "title": "Market Research Report",
                    "description": "Conduct and document comprehensive market research",
                    "difficulty": "intermediate"
                }
            ],
            "prerequisites": ["Product Management Fundamentals"],
            "skills_gained": ["User Research", "Market Analysis", "Data Analysis"]
        },
        {
            "title": "Agile Product Development",
            "duration": "2 weeks",
            "description": "Learn agile methodologies and product development",
            "learning_objectives": [
                "Master Agile/Scrum",
                "Learn sprint planning",
                "Manage product backlog",
                "Lead development teams"
            ],
            "resources": {
                "primary": "https://www.atlassian.com/agile",
                "video_course": "https://www.scrum.org/resources/training",
                "practice": "https://www.mountaingoatsoftware.com/agile",
                "documentation": "https://www.scrumguides.org/"
        },
            "projects": [
        {
                    "title": "Sprint Planning",
                    "description": "Plan and document a product development sprint",
                    "difficulty": "advanced"
                }
            ],
            "prerequisites": ["User Research and Analysis"],
            "skills_gained": ["Agile Methodology", "Sprint Planning", "Team Leadership"]
        },
        {
            "title": "Product Launch and Growth",
            "duration": "1 week",
            "description": "Master product launch strategies and growth techniques",
            "learning_objectives": [
                "Create launch plans",
                "Define success metrics",
                "Implement growth strategies",
                "Analyze product performance"
            ],
            "resources": {
                "primary": "https://www.productplan.com/learn/product-launch/",
                "video_course": "https://www.reforge.com/growth-series",
                "practice": "https://growthhackers.com/posts",
                "documentation": "https://www.productled.org/foundations/"
            },
            "projects": [
                {
                    "title": "Product Launch Strategy",
                    "description": "Create a complete product launch plan",
                    "difficulty": "advanced"
                }
            ],
            "prerequisites": ["Agile Product Development"],
            "skills_gained": ["Launch Strategy", "Growth Hacking", "Analytics"]
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