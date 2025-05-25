# app/learning_paths.py

learning_path_templates = {
    "Become a Data Scientist": [
        {
            "title": "Python Programming Fundamentals (Beginner)",
            "duration": "1 week",
            "description": "Learn Python basics, syntax, and data structures.",
            "difficulty": "beginner",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU",
                "documentation": "https://docs.python.org/3/tutorial/",
                "practice": "https://www.hackerrank.com/domains/tutorials/10-days-of-python"
            },
            "projects": [
                {"title": "Simple Data Analysis Script", "difficulty": "beginner"}
            ],
            "skills_gained": ["Python", "Data Structures", "Basic Scripting"]
        },
        {
            "title": "Math & Statistics for Data Science (Beginner)",
            "duration": "1 week",
            "description": "Master statistics, probability, and linear algebra essentials.",
            "difficulty": "beginner",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLblh5JKOoLUIxGDQs4LFFD--41Vzf-ME1",
                "documentation": "https://www.khanacademy.org/math/statistics-probability",
                "practice": "https://www.kaggle.com/learn/intro-to-statistics"
            },
            "projects": [
                {"title": "Statistical Analysis of a Dataset", "difficulty": "beginner"}
            ],
            "skills_gained": ["Statistics", "Probability", "Linear Algebra"]
        },
        {
            "title": "Data Wrangling & Visualization (Intermediate)",
            "duration": "1 week",
            "description": "Learn to clean, manipulate, and visualize data using Pandas, NumPy, and Matplotlib.",
            "difficulty": "intermediate",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLQVvvaa0QuDfKTOs3Keq_kaG2P55YRn5v",
                "documentation": "https://pandas.pydata.org/docs/",
                "practice": "https://www.kaggle.com/learn/pandas"
            },
            "projects": [
                {"title": "Exploratory Data Analysis (EDA) Project", "difficulty": "intermediate"}
            ],
            "skills_gained": ["Pandas", "NumPy", "Matplotlib", "EDA"]
        },
        {
            "title": "Machine Learning Foundations (Intermediate)",
            "duration": "2 weeks",
            "description": "Supervised and unsupervised learning, model evaluation, and feature engineering.",
            "difficulty": "intermediate",
            "resources": {
                "video": "https://www.coursera.org/learn/machine-learning",
                "documentation": "https://scikit-learn.org/stable/user_guide.html",
                "practice": "https://www.kaggle.com/learn/intro-to-machine-learning"
            },
            "projects": [
                {"title": "Build a Classification Model", "difficulty": "intermediate"}
            ],
            "skills_gained": ["Supervised Learning", "Unsupervised Learning", "Model Evaluation"]
        },
        {
            "title": "Deep Learning & Neural Networks (Advanced)",
            "duration": "2 weeks",
            "description": "Introduction to deep learning, neural networks, and frameworks like TensorFlow and PyTorch.",
            "difficulty": "advanced",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLWKjhJtqVAbkFiqHnNaxpOPhh9tSWMXIF",
                "documentation": "https://www.tensorflow.org/tutorials",
                "practice": "https://www.kaggle.com/learn/deep-learning"
            },
            "projects": [
                {"title": "Image Classification with Neural Networks", "difficulty": "advanced"}
            ],
            "skills_gained": ["Deep Learning", "Neural Networks", "TensorFlow", "PyTorch"]
        },
        {
            "title": "NLP & Text Analytics (Advanced)",
            "duration": "1 week",
            "description": "Natural Language Processing, text cleaning, sentiment analysis, and NER.",
            "difficulty": "advanced",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLamzFoFxwoNjPfxzaWqs7cZGsPYy0x_gI",
                "documentation": "https://www.nltk.org/",
                "practice": "https://www.kaggle.com/learn/natural-language-processing"
            },
            "projects": [
                {"title": "Sentiment Analysis Project", "difficulty": "advanced"}
            ],
            "skills_gained": ["NLP", "Text Analytics", "Sentiment Analysis"]
        },
        {
            "title": "Capstone Project: Real-World Data Science",
            "duration": "2 weeks",
            "description": "Apply all skills to a real-world dataset, from EDA to model deployment.",
            "difficulty": "advanced",
            "resources": {
                "video": "https://www.youtube.com/watch?v=ua-CiDNNj30",
                "documentation": "https://docs.streamlit.io/",
                "practice": "https://www.kaggle.com/competitions"
            },
            "projects": [
                {"title": "End-to-End Data Science Project", "difficulty": "advanced"}
            ],
            "skills_gained": ["Project Management", "Deployment", "Full Data Science Cycle"]
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
            "title": "Mobile Development Fundamentals",
            "duration": "2 weeks",
            "description": "Learn the basics of mobile app development and choose your platform (iOS/Android)",
            "difficulty": "beginner",
            "learning_objectives": [
                "Understand mobile development concepts",
                "Learn platform-specific guidelines",
                "Master mobile UI/UX principles",
                "Understand app lifecycle"
            ],
            "resources": {
                "primary": "https://developer.android.com/courses",
                "video_course": "https://www.udacity.com/course/android-basics-in-kotlin--ud9012",
                "practice": "https://developer.android.com/courses/pathways/android-basics-kotlin-one",
                "documentation": "https://developer.android.com/guide"
            },
            "projects": [
                {
                    "title": "Hello World App",
                    "description": "Create your first mobile application",
                    "difficulty": "beginner"
                },
                {
                    "title": "Basic UI Components",
                    "description": "Build an app showcasing various UI elements",
                    "difficulty": "beginner"
                }
            ],
            "prerequisites": [],
            "skills_gained": ["Mobile Development Basics", "UI Components", "App Lifecycle", "Platform Guidelines"]
        },
        {
            "title": "Native App Development",
            "duration": "3 weeks",
            "description": "Master platform-specific development (Kotlin for Android or Swift for iOS)",
            "difficulty": "intermediate",
            "learning_objectives": [
                "Learn platform-native language",
                "Master UI frameworks",
                "Handle user input and gestures",
                "Implement navigation patterns"
            ],
            "resources": {
                "primary": "https://developer.android.com/kotlin",
                "video_course": "https://www.udemy.com/course/android-kotlin-developer/",
                "practice": "https://pl.kotl.in/",
                "documentation": "https://kotlinlang.org/docs/home.html"
            },
            "projects": [
                {
                    "title": "Task Manager App",
                    "description": "Build a full-featured todo application",
                    "difficulty": "intermediate"
                },
                {
                    "title": "Weather App",
                    "description": "Create a weather app with location services",
                    "difficulty": "intermediate"
                }
            ],
            "prerequisites": ["Mobile Development Fundamentals"],
            "skills_gained": ["Kotlin/Swift", "Native UI Framework", "App Navigation", "User Input Handling"]
        },
        {
            "title": "Data Management & Networking",
            "duration": "2 weeks",
            "description": "Learn to work with data persistence, APIs, and networking in mobile apps",
            "difficulty": "intermediate",
            "learning_objectives": [
                "Implement local data storage",
                "Work with REST APIs",
                "Handle offline functionality",
                "Manage app state"
            ],
            "resources": {
                "primary": "https://developer.android.com/training/data-storage",
                "video_course": "https://www.raywenderlich.com/android/paths",
                "practice": "https://github.com/android/architecture-components-samples",
                "documentation": "https://developer.android.com/topic/libraries/architecture"
            },
            "projects": [
                {
                    "title": "News Reader App",
                    "description": "Build a news app with offline support",
                    "difficulty": "intermediate"
                },
                {
                    "title": "Social Media Client",
                    "description": "Create a social media app with API integration",
                    "difficulty": "advanced"
                }
            ],
            "prerequisites": ["Native App Development"],
            "skills_gained": ["Data Storage", "API Integration", "State Management", "Offline Support"]
        },
        {
            "title": "Advanced UI & Animation",
            "duration": "2 weeks",
            "description": "Create polished, animated user interfaces with advanced features",
            "difficulty": "advanced",
            "learning_objectives": [
                "Implement complex layouts",
                "Create custom animations",
                "Build responsive UIs",
                "Handle different screen sizes"
            ],
            "resources": {
                "primary": "https://developer.android.com/training/animation",
                "video_course": "https://www.raywenderlich.com/android/paths/animation",
                "practice": "https://github.com/android/animation-samples",
                "documentation": "https://material.io/design/motion/understanding-motion.html"
            },
            "projects": [
                {
                    "title": "E-commerce App",
                    "description": "Build a polished shopping app with animations",
                    "difficulty": "advanced"
                },
                {
                    "title": "Media Player",
                    "description": "Create a custom media player with transitions",
                    "difficulty": "advanced"
                }
            ],
            "prerequisites": ["Data Management & Networking"],
            "skills_gained": ["Custom Animations", "Complex Layouts", "Responsive Design", "Material Design"]
        },
        {
            "title": "App Performance & Publishing",
            "duration": "2 weeks",
            "description": "Optimize app performance and prepare for app store submission",
            "difficulty": "advanced",
            "learning_objectives": [
                "Optimize app performance",
                "Implement analytics and crash reporting",
                "Prepare for app store submission",
                "Handle app signing and distribution"
            ],
            "resources": {
                "primary": "https://developer.android.com/topic/performance",
                "video_course": "https://www.udacity.com/course/android-performance--ud825",
                "practice": "https://github.com/android/performance-samples",
                "documentation": "https://developer.android.com/distribute"
            },
            "projects": [
                {
                    "title": "App Performance Audit",
                    "description": "Optimize an existing app's performance",
                    "difficulty": "advanced"
                },
                {
                    "title": "App Store Preparation",
                    "description": "Prepare an app for store submission",
                    "difficulty": "advanced"
                }
            ],
            "prerequisites": ["Advanced UI & Animation"],
            "skills_gained": ["Performance Optimization", "Analytics Integration", "App Distribution", "Store Guidelines"]
        }
    ],
    "Become a Data Analyst": [
        {
            "title": "Data Analysis Fundamentals",
            "duration": "2 weeks",
            "description": "Learn the basics of data analysis and statistics",
            "difficulty": "beginner",
            "learning_objectives": [
                "Understand basic statistics",
                "Learn data analysis process",
                "Master spreadsheet basics",
                "Develop analytical thinking"
            ],
            "resources": {
                "primary": "https://www.coursera.org/learn/data-analysis-with-python",
                "video_course": "https://www.datacamp.com/courses/introduction-to-statistics",
                "practice": "https://www.kaggle.com/learn/intro-to-statistics",
                "documentation": "https://pandas.pydata.org/docs/getting_started/"
            },
            "projects": [
                {
                    "title": "Sales Data Analysis",
                    "description": "Analyze sample sales data using spreadsheets",
                    "difficulty": "beginner"
                },
                {
                    "title": "Customer Demographics Analysis",
                    "description": "Create demographic insights from customer data",
                    "difficulty": "beginner"
                }
            ],
            "prerequisites": [],
            "skills_gained": ["Basic Statistics", "Excel", "Data Analysis Process", "Analytical Thinking"]
        },
        {
            "title": "SQL for Data Analysis",
            "duration": "3 weeks",
            "description": "Master SQL for data extraction and analysis",
            "difficulty": "intermediate",
            "learning_objectives": [
                "Write complex SQL queries",
                "Perform data aggregation",
                "Create joins and subqueries",
                "Analyze database performance"
            ],
            "resources": {
                "primary": "https://mode.com/sql-tutorial/",
                "video_course": "https://www.udacity.com/course/sql-for-data-analysis--ud198",
                "practice": "https://www.hackerrank.com/domains/sql",
                "documentation": "https://www.postgresql.org/docs/current/tutorial.html"
            },
            "projects": [
                {
                    "title": "E-commerce Analysis",
                    "description": "Analyze online store data using SQL",
                    "difficulty": "intermediate"
                },
                {
                    "title": "Customer Behavior Analysis",
                    "description": "Create customer insights using SQL",
                    "difficulty": "intermediate"
                }
            ],
            "prerequisites": ["Data Analysis Fundamentals"],
            "skills_gained": ["SQL", "Data Querying", "Database Analysis", "Data Aggregation"]
        },
        {
            "title": "Python for Data Analysis",
            "duration": "3 weeks",
            "description": "Learn Python programming for data analysis using pandas and numpy",
            "difficulty": "intermediate",
            "learning_objectives": [
                "Master pandas library",
                "Learn data cleaning techniques",
                "Perform exploratory analysis",
                "Create data visualizations"
            ],
            "resources": {
                "primary": "https://pandas.pydata.org/docs/getting_started/",
                "video_course": "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/",
                "practice": "https://github.com/guipsamora/pandas_exercises",
                "documentation": "https://pandas.pydata.org/docs/user_guide/index.html"
            },
            "projects": [
                {
                    "title": "Financial Data Analysis",
                    "description": "Analyze stock market data with Python",
                    "difficulty": "intermediate"
                },
                {
                    "title": "COVID-19 Data Analysis",
                    "description": "Analyze pandemic data using pandas",
                    "difficulty": "advanced"
                }
            ],
            "prerequisites": ["SQL for Data Analysis"],
            "skills_gained": ["Python", "Pandas", "NumPy", "Data Visualization"]
        },
        {
            "title": "Data Visualization",
            "duration": "2 weeks",
            "description": "Create effective data visualizations using various tools",
            "difficulty": "intermediate",
            "learning_objectives": [
                "Master visualization principles",
                "Learn Tableau basics",
                "Create interactive dashboards",
                "Tell stories with data"
            ],
            "resources": {
                "primary": "https://www.tableau.com/learn/training",
                "video_course": "https://www.coursera.org/learn/data-visualization-tableau",
                "practice": "https://public.tableau.com/en-us/s/resources",
                "documentation": "https://help.tableau.com/current/pro/desktop/en-us/default.htm"
            },
            "projects": [
                {
                    "title": "Sales Dashboard",
                    "description": "Create an interactive sales dashboard",
                    "difficulty": "intermediate"
                },
                {
                    "title": "Data Story Presentation",
                    "description": "Present insights through visualization",
                    "difficulty": "advanced"
                }
            ],
            "prerequisites": ["Python for Data Analysis"],
            "skills_gained": ["Tableau", "Data Visualization", "Dashboard Creation", "Storytelling"]
        },
        {
            "title": "Advanced Analytics",
            "duration": "3 weeks",
            "description": "Learn advanced analytical techniques and business intelligence",
            "difficulty": "advanced",
            "learning_objectives": [
                "Perform statistical analysis",
                "Master A/B testing",
                "Learn predictive analytics",
                "Implement business metrics"
            ],
            "resources": {
                "primary": "https://www.coursera.org/learn/statistical-inference",
                "video_course": "https://www.udacity.com/course/ab-testing--ud257",
                "practice": "https://www.kaggle.com/competitions",
                "documentation": "https://scikit-learn.org/stable/user_guide.html"
            },
            "projects": [
                {
                    "title": "A/B Test Analysis",
                    "description": "Conduct and analyze A/B tests",
                    "difficulty": "advanced"
                },
                {
                    "title": "Predictive Analytics Project",
                    "description": "Build predictive models for business",
                    "difficulty": "advanced"
                }
            ],
            "prerequisites": ["Data Visualization"],
            "skills_gained": ["Statistical Analysis", "A/B Testing", "Predictive Analytics", "Business Intelligence"]
        }
    ],
    "Become a Software Engineer": [
        {
            "title": "Programming Fundamentals",
            "duration": "2 weeks",
            "description": "Learn core programming concepts and computer science fundamentals",
            "difficulty": "beginner",
            "learning_objectives": [
                "Understand basic programming concepts",
                "Learn algorithmic thinking",
                "Master control flow and data structures",
                "Write clean, maintainable code"
            ],
            "resources": {
                "primary": "https://www.edx.org/course/introduction-computer-science-harvardx-cs50x",
                "video_course": "https://frontendmasters.com/courses/web-development-v3/",
                "practice": "https://exercism.org/tracks/python",
                "documentation": "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/"
            },
            "projects": [
                {
                    "title": "Command Line Calculator",
                    "description": "Build a calculator that handles basic operations",
                    "difficulty": "beginner"
                },
                {
                    "title": "Todo List Manager",
                    "description": "Create a command-line todo list application",
                    "difficulty": "beginner"
                }
            ],
            "prerequisites": [],
            "skills_gained": ["Problem Solving", "Algorithmic Thinking", "Basic Programming", "Git Basics"]
        },
        {
            "title": "Web Development Foundations",
            "duration": "2 weeks",
            "description": "Master HTML, CSS, and basic JavaScript for frontend development",
            "difficulty": "beginner",
            "learning_objectives": [
                "Build responsive web pages with HTML5 and CSS3",
                "Implement interactive features with JavaScript",
                "Understand web accessibility principles",
                "Master modern CSS layouts"
            ],
            "resources": {
                "primary": "https://developer.mozilla.org/en-US/docs/Learn",
                "video_course": "https://frontendmasters.com/courses/getting-started-css/",
                "practice": "https://www.frontendmentor.io/challenges",
                "documentation": "https://web.dev/learn/"
            },
            "projects": [
                {
                    "title": "Portfolio Website",
                    "description": "Create a responsive personal portfolio",
                    "difficulty": "beginner"
                },
                {
                    "title": "Interactive Landing Page",
                    "description": "Build a modern landing page with animations",
                    "difficulty": "intermediate"
                }
            ],
            "prerequisites": ["Programming Fundamentals"],
            "skills_gained": ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Web Accessibility"]
        },
        {
            "title": "Backend Development Basics",
            "duration": "3 weeks",
            "description": "Learn server-side programming and database fundamentals",
            "difficulty": "intermediate",
            "learning_objectives": [
                "Understand client-server architecture",
                "Build RESTful APIs",
                "Work with databases",
                "Implement user authentication"
            ],
            "resources": {
                "primary": "https://nodejs.dev/learn",
                "video_course": "https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/",
                "practice": "https://nodeschool.io/",
                "documentation": "https://expressjs.com/en/starter/installing.html"
            },
            "projects": [
                {
                    "title": "REST API",
                    "description": "Create a RESTful API with Express.js",
                    "difficulty": "intermediate"
                },
                {
                    "title": "User Authentication System",
                    "description": "Implement secure user authentication",
                    "difficulty": "intermediate"
                }
            ],
            "prerequisites": ["Web Development Foundations"],
            "skills_gained": ["Node.js", "Express.js", "MongoDB", "API Design", "Authentication"]
        },
        {
            "title": "Modern Frontend Frameworks",
            "duration": "3 weeks",
            "description": "Master a modern JavaScript framework (React)",
            "difficulty": "intermediate",
            "learning_objectives": [
                "Understand component-based architecture",
                "Master state management",
                "Handle routing and navigation",
                "Implement API integration"
            ],
            "resources": {
                "primary": "https://react.dev/learn",
                "video_course": "https://frontendmasters.com/courses/complete-react-v8/",
                "practice": "https://react-tutorial.app/",
                "documentation": "https://react.dev/reference/react"
            },
            "projects": [
                {
                    "title": "Task Management App",
                    "description": "Build a full-featured task manager with React",
                    "difficulty": "intermediate"
                },
                {
                    "title": "E-commerce Dashboard",
                    "description": "Create an admin dashboard for an online store",
                    "difficulty": "advanced"
                }
            ],
            "prerequisites": ["Web Development Foundations", "Backend Development Basics"],
            "skills_gained": ["React.js", "State Management", "Component Design", "API Integration"]
        },
        {
            "title": "Software Engineering Practices",
            "duration": "2 weeks",
            "description": "Learn professional software development practices",
            "difficulty": "advanced",
            "learning_objectives": [
                "Write clean, maintainable code",
                "Implement automated testing",
                "Use version control effectively",
                "Practice agile development"
            ],
            "resources": {
                "primary": "https://www.coursera.org/learn/agile-software-development",
                "video_course": "https://frontendmasters.com/courses/testing-practices-principles/",
                "practice": "https://kata-log.rocks/",
                "documentation": "https://martinfowler.com/articles/practical-test-pyramid.html"
            },
            "projects": [
                {
                    "title": "Test-Driven Development Project",
                    "description": "Build a feature using TDD methodology",
                    "difficulty": "advanced"
                },
                {
                    "title": "Code Refactoring",
                    "description": "Improve existing codebase using best practices",
                    "difficulty": "advanced"
                }
            ],
            "prerequisites": ["Modern Frontend Frameworks"],
            "skills_gained": ["Testing", "Code Quality", "Git Advanced", "Agile Practices", "CI/CD"]
        },
        {
            "title": "System Design and Architecture",
            "duration": "2 weeks",
            "description": "Learn to design scalable software systems",
            "difficulty": "advanced",
            "learning_objectives": [
                "Understand system design principles",
                "Learn scalability patterns",
                "Master microservices architecture",
                "Implement caching and optimization"
            ],
            "resources": {
                "primary": "https://github.com/donnemartin/system-design-primer",
                "video_course": "https://www.educative.io/path/scalability-system-design",
                "practice": "https://github.com/karanpratapsingh/system-design",
                "documentation": "https://microservices.io/patterns/index.html"
            },
            "projects": [
                {
                    "title": "Microservices Architecture",
                    "description": "Design and implement a microservices-based system",
                    "difficulty": "advanced"
                },
                {
                    "title": "Scalable Web Application",
                    "description": "Build a scalable web app with caching and load balancing",
                    "difficulty": "advanced"
                }
            ],
            "prerequisites": ["Software Engineering Practices"],
            "skills_gained": ["System Design", "Architecture Patterns", "Scalability", "Performance Optimization"]
        }
    ],
    "Become a Digital Marketer": [
        {
            "title": "Digital Marketing Fundamentals",
            "duration": "2 weeks",
            "description": "Learn core digital marketing concepts and strategies",
            "difficulty": "beginner",
            "learning_objectives": [
                "Understand digital marketing channels",
                "Learn marketing analytics basics",
                "Master content marketing principles",
                "Develop marketing strategies"
            ],
            "resources": {
                "primary": "https://www.hubspot.com/resources/marketing",
                "video_course": "https://www.coursera.org/specializations/digital-marketing",
                "practice": "https://www.google.com/analytics/analytics-academy/",
                "documentation": "https://marketingplatform.google.com/about/analytics/"
            },
            "projects": [
                {
                    "title": "Marketing Strategy Plan",
                    "description": "Create a comprehensive digital marketing strategy",
                    "difficulty": "beginner"
                }
            ],
            "prerequisites": [],
            "skills_gained": ["Marketing Strategy", "Analytics", "Content Marketing"]
        },
        {
            "title": "SEO and Content Marketing",
            "duration": "2 weeks",
            "description": "Master search engine optimization and content creation",
            "difficulty": "intermediate",
            "learning_objectives": [
                "Understand SEO principles",
                "Create optimized content",
                "Learn keyword research",
                "Master link building"
            ],
            "resources": {
                "primary": "https://moz.com/beginners-guide-to-seo",
                "video_course": "https://www.semrush.com/academy/",
                "practice": "https://www.contentful.com/learn/courses/",
                "documentation": "https://developers.google.com/search"
            },
            "projects": [
                {
                    "title": "SEO Content Strategy",
                    "description": "Develop and implement an SEO strategy",
                    "difficulty": "intermediate"
                }
            ],
            "prerequisites": ["Digital Marketing Fundamentals"],
            "skills_gained": ["SEO", "Content Strategy", "Keyword Research"]
        },
        {
            "title": "Social Media Marketing",
            "duration": "2 weeks",
            "description": "Learn to create and manage social media campaigns",
            "difficulty": "intermediate",
            "learning_objectives": [
                "Create social media strategies",
                "Master content planning",
                "Learn community management",
                "Understand paid social"
            ],
            "resources": {
                "primary": "https://www.hootsuite.com/education",
                "video_course": "https://www.linkedin.com/learning/topics/social-media-marketing",
                "practice": "https://www.facebook.com/business/learn",
                "documentation": "https://business.instagram.com/getting-started"
            },
            "projects": [
                {
                    "title": "Social Media Campaign",
                    "description": "Plan and execute a social media campaign",
                    "difficulty": "intermediate"
                }
            ],
            "prerequisites": ["Digital Marketing Fundamentals"],
            "skills_gained": ["Social Media Strategy", "Content Planning", "Community Management"]
        },
        {
            "title": "Paid Advertising",
            "duration": "2 weeks",
            "description": "Master paid advertising across multiple platforms",
            "difficulty": "advanced",
            "learning_objectives": [
                "Set up ad campaigns",
                "Optimize ad performance",
                "Master bidding strategies",
                "Analyze campaign metrics"
            ],
            "resources": {
                "primary": "https://skillshop.exceedlms.com/student/catalog/browse",
                "video_course": "https://www.udacity.com/course/digital-marketing-nanodegree--nd018",
                "practice": "https://www.facebook.com/business/learn/certification",
                "documentation": "https://support.google.com/google-ads"
            },
            "projects": [
                {
                    "title": "Multi-Channel Campaign",
                    "description": "Create and manage ads across platforms",
                    "difficulty": "advanced"
                }
            ],
            "prerequisites": ["Social Media Marketing"],
            "skills_gained": ["Paid Advertising", "Campaign Management", "Performance Analysis"]
        }
    ],
    "Become a Cybersecurity Specialist": [
        {
            "title": "Cybersecurity Fundamentals",
            "duration": "2 weeks",
            "description": "Learn core cybersecurity concepts and principles",
            "difficulty": "beginner",
            "learning_objectives": [
                "Understand security fundamentals",
                "Learn threat assessment",
                "Master security tools",
                "Understand compliance basics"
            ],
            "resources": {
                "primary": "https://www.coursera.org/specializations/ibm-cybersecurity-analyst",
                "video_course": "https://www.cybrary.it/course/introduction-cyber-security/",
                "practice": "https://www.hackthebox.com/",
                "documentation": "https://www.sans.org/security-resources/"
            },
            "projects": [
                {
                    "title": "Security Assessment",
                    "description": "Conduct a basic security assessment",
                    "difficulty": "beginner"
                }
            ],
            "prerequisites": [],
            "skills_gained": ["Security Fundamentals", "Risk Assessment", "Security Tools"]
        },
        {
            "title": "Network Security",
            "duration": "3 weeks",
            "description": "Master network security concepts and implementation",
            "difficulty": "intermediate",
            "learning_objectives": [
                "Understand network protocols",
                "Configure firewalls",
                "Implement IDS/IPS",
                "Master network monitoring"
            ],
            "resources": {
                "primary": "https://www.cybrary.it/course/network-security/",
                "video_course": "https://www.udemy.com/course/network-security-course/",
                "practice": "https://www.paloalto.com/cyberpedia",
                "documentation": "https://www.cisco.com/c/en/us/products/security/"
            },
            "projects": [
                {
                    "title": "Network Defense",
                    "description": "Set up a secure network infrastructure",
                    "difficulty": "intermediate"
                }
            ],
            "prerequisites": ["Cybersecurity Fundamentals"],
            "skills_gained": ["Network Security", "Firewall Configuration", "IDS/IPS", "Monitoring"]
        },
        {
            "title": "Ethical Hacking",
            "duration": "3 weeks",
            "description": "Learn ethical hacking techniques and penetration testing",
            "difficulty": "advanced",
            "learning_objectives": [
                "Master penetration testing",
                "Learn vulnerability assessment",
                "Understand exploit development",
                "Practice ethical hacking"
            ],
            "resources": {
                "primary": "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/",
                "video_course": "https://www.offensive-security.com/pwk-oscp/",
                "practice": "https://www.vulnhub.com/",
                "documentation": "https://www.metasploit.com/get-started"
            },
            "projects": [
                {
                    "title": "Penetration Test",
                    "description": "Conduct a full penetration test",
                    "difficulty": "advanced"
                }
            ],
            "prerequisites": ["Network Security"],
            "skills_gained": ["Penetration Testing", "Vulnerability Assessment", "Exploit Development"]
        },
        {
            "title": "Security Operations",
            "duration": "2 weeks",
            "description": "Learn security operations and incident response",
            "difficulty": "advanced",
            "learning_objectives": [
                "Master incident response",
                "Learn threat hunting",
                "Understand SIEM tools",
                "Practice forensics"
            ],
            "resources": {
                "primary": "https://www.sans.org/cyber-security-courses/security-operations-fundamentals/",
                "video_course": "https://www.coursera.org/specializations/security-operations-management",
                "practice": "https://www.splunk.com/en_us/training.html",
                "documentation": "https://www.elastic.co/guide/en/security/current/index.html"
            },
            "projects": [
                {
                    "title": "Incident Response Plan",
                    "description": "Develop an incident response strategy",
                    "difficulty": "advanced"
                }
            ],
            "prerequisites": ["Ethical Hacking"],
            "skills_gained": ["Incident Response", "Threat Hunting", "SIEM", "Digital Forensics"]
        }
    ],
    "Become a Machine Learning Engineer": [
        {
            "title": "Machine Learning Fundamentals",
            "duration": "2 weeks",
            "description": "Learn core machine learning concepts and mathematics",
            "difficulty": "beginner",
            "learning_objectives": [
                "Understand ML basics",
                "Master required mathematics",
                "Learn Python for ML",
                "Implement basic algorithms"
            ],
            "resources": {
                "primary": "https://www.coursera.org/learn/machine-learning",
                "video_course": "https://www.deeplearning.ai/courses/",
                "practice": "https://www.kaggle.com/learn/intro-to-machine-learning",
                "documentation": "https://scikit-learn.org/stable/tutorial/"
            },
            "projects": [
                {
                    "title": "Basic ML Models",
                    "description": "Implement and train basic ML models",
                    "difficulty": "beginner"
                }
            ],
            "prerequisites": [],
            "skills_gained": ["Python", "Mathematics", "Basic ML Algorithms"]
        },
        {
            "title": "Deep Learning and Neural Networks",
            "duration": "3 weeks",
            "description": "Master deep learning concepts and frameworks",
            "difficulty": "intermediate",
            "learning_objectives": [
                "Understand neural networks",
                "Master deep learning frameworks",
                "Learn CNN and RNN architectures",
                "Implement advanced models"
            ],
            "resources": {
                "primary": "https://www.deeplearning.ai/deep-learning-specialization/",
                "video_course": "https://www.udacity.com/course/deep-learning-nanodegree--nd101",
                "practice": "https://www.tensorflow.org/tutorials",
                "documentation": "https://pytorch.org/tutorials/"
            },
            "projects": [
                {
                    "title": "Deep Learning Project",
                    "description": "Build and train deep neural networks",
                    "difficulty": "intermediate"
                }
            ],
            "prerequisites": ["Machine Learning Fundamentals"],
            "skills_gained": ["Deep Learning", "TensorFlow", "PyTorch", "Neural Networks"]
        },
        {
            "title": "MLOps and Deployment",
            "duration": "2 weeks",
            "description": "Learn to deploy and maintain ML models in production",
            "difficulty": "advanced",
            "learning_objectives": [
                "Master ML pipelines",
                "Learn model deployment",
                "Understand ML monitoring",
                "Implement CI/CD for ML"
            ],
            "resources": {
                "primary": "https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops",
                "video_course": "https://www.deeplearning.ai/program/machine-learning-engineering-for-production-mlops/",
                "practice": "https://www.kubeflow.org/docs/started/getting-started/",
                "documentation": "https://mlflow.org/docs/latest/index.html"
            },
            "projects": [
                {
                    "title": "ML Pipeline Project",
                    "description": "Build and deploy an end-to-end ML pipeline",
                    "difficulty": "advanced"
                }
            ],
            "prerequisites": ["Deep Learning and Neural Networks"],
            "skills_gained": ["MLOps", "Model Deployment", "Pipeline Development", "ML Monitoring"]
        },
        {
            "title": "Advanced ML Topics",
            "duration": "2 weeks",
            "description": "Explore advanced ML topics and specialized applications",
            "difficulty": "advanced",
            "learning_objectives": [
                "Learn reinforcement learning",
                "Master NLP techniques",
                "Understand GANs",
                "Explore transfer learning"
            ],
            "resources": {
                "primary": "https://www.coursera.org/specializations/natural-language-processing",
                "video_course": "https://www.udacity.com/course/natural-language-processing-nanodegree--nd892",
                "practice": "https://huggingface.co/course/chapter1/1",
                "documentation": "https://stable-baselines3.readthedocs.io/en/master/"
            },
            "projects": [
                {
                    "title": "Advanced ML Application",
                    "description": "Build a complex ML system using advanced techniques",
                    "difficulty": "advanced"
                }
            ],
            "prerequisites": ["MLOps and Deployment"],
            "skills_gained": ["Reinforcement Learning", "NLP", "GANs", "Transfer Learning"]
        }
    ],
    "Become a DevOps Engineer": [
        {
            "title": "Linux & Scripting Fundamentals (Beginner)",
            "duration": "1 week",
            "description": "Learn Linux basics and shell scripting for automation.",
            "difficulty": "beginner",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLS1QulWo1RIb9WVQGJ_vh-RQusbZgO_As",
                "documentation": "https://ryanstutorials.net/linuxtutorial/",
                "practice": "https://www.hackerrank.com/domains/tutorials/10-days-of-javascript"
            },
            "projects": [
                {"title": "Automate a Backup Script", "difficulty": "beginner"}
            ],
            "skills_gained": ["Linux", "Shell Scripting", "Automation"]
        },
        {
            "title": "Version Control with Git (Beginner)",
            "duration": "1 week",
            "description": "Master Git for source code management and collaboration.",
            "difficulty": "beginner",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLg7s6cbtAD17Gw5u8644bgKhgRLiJXdX4",
                "documentation": "https://git-scm.com/doc",
                "practice": "https://www.codecademy.com/learn/learn-git"
            },
            "projects": [
                {"title": "Collaborative Repo Project", "difficulty": "beginner"}
            ],
            "skills_gained": ["Git", "Version Control", "Collaboration"]
        },
        {
            "title": "CI/CD & Automation (Intermediate)",
            "duration": "2 weeks",
            "description": "Learn Continuous Integration/Deployment using Jenkins, GitHub Actions, or GitLab CI.",
            "difficulty": "intermediate",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLy7NrYWoggjziYQIDorlXjTvvwweTYoNC",
                "documentation": "https://docs.github.com/en/actions",
                "practice": "https://www.jenkins.io/doc/tutorials/"
            },
            "projects": [
                {"title": "Set Up a CI/CD Pipeline", "difficulty": "intermediate"}
            ],
            "skills_gained": ["CI/CD", "Jenkins", "GitHub Actions", "Automation"]
        },
        {
            "title": "Docker & Containerization (Intermediate)",
            "duration": "1 week",
            "description": "Containerize applications using Docker and manage images.",
            "difficulty": "intermediate",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLy7NrYWoggjziYQIDorlXjTvvwweTYoNC",
                "documentation": "https://docs.docker.com/get-started/",
                "practice": "https://www.katacoda.com/courses/docker"
            },
            "projects": [
                {"title": "Dockerize a Web App", "difficulty": "intermediate"}
            ],
            "skills_gained": ["Docker", "Containerization", "DevOps"]
        },
        {
            "title": "Kubernetes & Orchestration (Advanced)",
            "duration": "2 weeks",
            "description": "Deploy and manage containers at scale using Kubernetes.",
            "difficulty": "advanced",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLy7NrYWoggjziYQIDorlXjTvvwweTYoNC",
                "documentation": "https://kubernetes.io/docs/tutorials/",
                "practice": "https://www.katacoda.com/courses/kubernetes"
            },
            "projects": [
                {"title": "Deploy a Multi-Service App on Kubernetes", "difficulty": "advanced"}
            ],
            "skills_gained": ["Kubernetes", "Orchestration", "Cloud Native"]
        }
    ],
    "Become a Cloud Engineer": [
        {
            "title": "Cloud Fundamentals (Beginner)",
            "duration": "1 week",
            "description": "Understand cloud computing basics and service models (IaaS, PaaS, SaaS).",
            "difficulty": "beginner",
            "resources": {
                "video": "https://www.youtube.com/watch?v=2LaAJq1lB1Q",
                "documentation": "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-cloud-computing/",
                "practice": "https://www.qwiklabs.com/"
            },
            "projects": [
                {"title": "Deploy a Static Website on the Cloud", "difficulty": "beginner"}
            ],
            "skills_gained": ["Cloud Basics", "IaaS", "PaaS", "SaaS"]
        },
        {
            "title": "AWS/GCP/Azure Core Services (Intermediate)",
            "duration": "2 weeks",
            "description": "Learn core services of AWS, GCP, or Azure (compute, storage, networking).",
            "difficulty": "intermediate",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLgxF613RsGoUuJd6gZtqHq3p6U6zvF1vG",
                "documentation": "https://docs.aws.amazon.com/",
                "practice": "https://www.qwiklabs.com/"
            },
            "projects": [
                {"title": "Launch a VM and Set Up Networking", "difficulty": "intermediate"}
            ],
            "skills_gained": ["AWS", "GCP", "Azure", "Cloud Services"]
        },
        {
            "title": "Infrastructure as Code (IaC) (Intermediate)",
            "duration": "1 week",
            "description": "Automate cloud infrastructure using Terraform or CloudFormation.",
            "difficulty": "intermediate",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PL2jykFOD1AWZkqU2v7yqA1KQ5p1U1Q1rF",
                "documentation": "https://www.terraform.io/docs/",
                "practice": "https://learn.hashicorp.com/collections/terraform/aws-get-started"
            },
            "projects": [
                {"title": "Provision Infrastructure with Terraform", "difficulty": "intermediate"}
            ],
            "skills_gained": ["Terraform", "CloudFormation", "IaC"]
        },
        {
            "title": "Cloud Security & Monitoring (Advanced)",
            "duration": "1 week",
            "description": "Implement security best practices and monitor cloud resources.",
            "difficulty": "advanced",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLgxF613RsGoUuJd6gZtqHq3p6U6zvF1vG",
                "documentation": "https://docs.aws.amazon.com/security/",
                "practice": "https://www.qwiklabs.com/"
            },
            "projects": [
                {"title": "Set Up Cloud Monitoring & Alerts", "difficulty": "advanced"}
            ],
            "skills_gained": ["Cloud Security", "Monitoring", "Best Practices"]
        }
    ],
    "Become an AI Product Manager": [
        {
            "title": "AI & ML Fundamentals (Beginner)",
            "duration": "1 week",
            "description": "Understand the basics of AI, ML, and their business applications.",
            "difficulty": "beginner",
            "resources": {
                "video": "https://www.youtube.com/watch?v=JMUxmLyrhSk",
                "documentation": "https://developers.google.com/machine-learning/glossary",
                "practice": "https://www.coursera.org/learn/ai-for-everyone"
            },
            "projects": [
                {"title": "AI Use Case Analysis", "difficulty": "beginner"}
            ],
            "skills_gained": ["AI Basics", "ML Basics", "Business Applications"]
        },
        {
            "title": "Product Management for AI (Intermediate)",
            "duration": "2 weeks",
            "description": "Learn how to manage AI/ML projects, data pipelines, and cross-functional teams.",
            "difficulty": "intermediate",
            "resources": {
                "video": "https://www.youtube.com/watch?v=5vVZbBzG5H8",
                "documentation": "https://www.productplan.com/learn/ai-product-management/",
                "practice": "https://www.coursera.org/learn/ai-product-management"
            },
            "projects": [
                {"title": "Design an AI Product Roadmap", "difficulty": "intermediate"}
            ],
            "skills_gained": ["AI Product Management", "Data Pipelines", "Team Leadership"]
        },
        {
            "title": "Ethics & Responsible AI (Advanced)",
            "duration": "1 week",
            "description": "Explore ethical considerations and responsible AI deployment.",
            "difficulty": "advanced",
            "resources": {
                "video": "https://www.youtube.com/watch?v=8oHd3hFjK6A",
                "documentation": "https://ai.google/responsibilities/responsible-ai-practices/",
                "practice": "https://www.coursera.org/learn/ai-ethics"
            },
            "projects": [
                {"title": "Draft an AI Ethics Policy", "difficulty": "advanced"}
            ],
            "skills_gained": ["AI Ethics", "Responsible AI", "Policy"]
        }
    ],
    "Become a Data Engineer": [
        {
            "title": "SQL & Databases (Beginner)",
            "duration": "1 week",
            "description": "Learn SQL and relational database fundamentals.",
            "difficulty": "beginner",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLSE8ODhjZXjbohkNBWQs_otTrBTrjyohi",
                "documentation": "https://www.sqltutorial.org/",
                "practice": "https://www.hackerrank.com/domains/sql"
            },
            "projects": [
                {"title": "Design a Simple Database", "difficulty": "beginner"}
            ],
            "skills_gained": ["SQL", "Databases", "Data Modeling"]
        },
        {
            "title": "ETL & Data Pipelines (Intermediate)",
            "duration": "2 weeks",
            "description": "Build ETL pipelines using Python and open-source tools.",
            "difficulty": "intermediate",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLy7NrYWoggjziYQIDorlXjTvvwweTYoNC",
                "documentation": "https://airflow.apache.org/docs/",
                "practice": "https://www.kaggle.com/learn/data-engineering"
            },
            "projects": [
                {"title": "Build an ETL Pipeline", "difficulty": "intermediate"}
            ],
            "skills_gained": ["ETL", "Data Pipelines", "Airflow"]
        },
        {
            "title": "Big Data & Distributed Systems (Advanced)",
            "duration": "2 weeks",
            "description": "Work with big data tools like Hadoop and Spark.",
            "difficulty": "advanced",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLBzScQzZ83I8P1qg8l5U1Q1rF",
                "documentation": "https://spark.apache.org/docs/latest/",
                "practice": "https://www.kaggle.com/learn/big-data"
            },
            "projects": [
                {"title": "Process Large Datasets with Spark", "difficulty": "advanced"}
            ],
            "skills_gained": ["Big Data", "Hadoop", "Spark"]
        }
    ],
    "Become a Frontend Engineer": [
        {
            "title": "HTML, CSS, and JavaScript (Beginner)",
            "duration": "1 week",
            "description": "Learn the basics of web development: HTML, CSS, and JavaScript.",
            "difficulty": "beginner",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLillGF-RfqbZTASqIqdvm1R5mLrQq79CU",
                "documentation": "https://developer.mozilla.org/en-US/docs/Web",
                "practice": "https://www.freecodecamp.org/learn/"
            },
            "projects": [
                {"title": "Personal Portfolio Website", "difficulty": "beginner"}
            ],
            "skills_gained": ["HTML", "CSS", "JavaScript"]
        },
        {
            "title": "Modern JavaScript & Frameworks (Intermediate)",
            "duration": "2 weeks",
            "description": "Master ES6+ JavaScript and frameworks like React or Vue.",
            "difficulty": "intermediate",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp",
                "documentation": "https://reactjs.org/docs/getting-started.html",
                "practice": "https://www.codecademy.com/learn/react-101"
            },
            "projects": [
                {"title": "Build a React App", "difficulty": "intermediate"}
            ],
            "skills_gained": ["React", "Vue", "Modern JavaScript"]
        },
        {
            "title": "Frontend Testing & Optimization (Advanced)",
            "duration": "1 week",
            "description": "Test and optimize frontend applications for performance and accessibility.",
            "difficulty": "advanced",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp",
                "documentation": "https://jestjs.io/docs/getting-started",
                "practice": "https://www.freecodecamp.org/learn/"
            },
            "projects": [
                {"title": "Test and Optimize a Web App", "difficulty": "advanced"}
            ],
            "skills_gained": ["Testing", "Performance", "Accessibility"]
        }
    ],
    "Become a Backend Engineer": [
        {
            "title": "Backend Fundamentals (Beginner)",
            "duration": "1 week",
            "description": "Learn backend basics: HTTP, REST, and server-side programming.",
            "difficulty": "beginner",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLillGF-RfqbZ2ybcoD2OaabW2P7Ws8CWu",
                "documentation": "https://developer.mozilla.org/en-US/docs/Learn/Server-side",
                "practice": "https://www.freecodecamp.org/learn/"
            },
            "projects": [
                {"title": "Simple REST API", "difficulty": "beginner"}
            ],
            "skills_gained": ["HTTP", "REST", "Server-side Programming"]
        },
        {
            "title": "Databases & Authentication (Intermediate)",
            "duration": "2 weeks",
            "description": "Work with SQL/NoSQL databases and implement authentication.",
            "difficulty": "intermediate",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLillGF-RfqbZ2ybcoD2OaabW2P7Ws8CWu",
                "documentation": "https://www.mongodb.com/docs/",
                "practice": "https://www.hackerrank.com/domains/sql"
            },
            "projects": [
                {"title": "User Auth System", "difficulty": "intermediate"}
            ],
            "skills_gained": ["SQL", "NoSQL", "Authentication"]
        },
        {
            "title": "API Design & Microservices (Advanced)",
            "duration": "2 weeks",
            "description": "Design scalable APIs and build microservices.",
            "difficulty": "advanced",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLillGF-RfqbZ2ybcoD2OaabW2P7Ws8CWu",
                "documentation": "https://microservices.io/",
                "practice": "https://www.freecodecamp.org/learn/"
            },
            "projects": [
                {"title": "Microservice Architecture Project", "difficulty": "advanced"}
            ],
            "skills_gained": ["API Design", "Microservices", "Scalability"]
        }
    ],
    "Become a Blockchain Developer": [
        {
            "title": "Blockchain Basics (Beginner)",
            "duration": "1 week",
            "description": "Understand blockchain fundamentals and smart contracts.",
            "difficulty": "beginner",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PL6QwHk6lCo7W3a7xg3Bz6l2Qp1dQ5Q1rF",
                "documentation": "https://ethereum.org/en/developers/docs/",
                "practice": "https://cryptozombies.io/"
            },
            "projects": [
                {"title": "Write a Simple Smart Contract", "difficulty": "beginner"}
            ],
            "skills_gained": ["Blockchain", "Smart Contracts", "Ethereum"]
        },
        {
            "title": "DApps & Solidity (Intermediate)",
            "duration": "2 weeks",
            "description": "Develop decentralized applications using Solidity and Web3.js.",
            "difficulty": "intermediate",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PL6QwHk6lCo7W3a7xg3Bz6l2Qp1dQ5Q1rF",
                "documentation": "https://soliditylang.org/docs/",
                "practice": "https://cryptozombies.io/"
            },
            "projects": [
                {"title": "Build a DApp", "difficulty": "intermediate"}
            ],
            "skills_gained": ["DApps", "Solidity", "Web3.js"]
        },
        {
            "title": "Blockchain Security & Scaling (Advanced)",
            "duration": "2 weeks",
            "description": "Learn about blockchain security, consensus, and scaling solutions.",
            "difficulty": "advanced",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PL6QwHk6lCo7W3a7xg3Bz6l2Qp1dQ5Q1rF",
                "documentation": "https://ethereum.org/en/developers/docs/security/",
                "practice": "https://www.hackerrank.com/domains/tutorials/10-days-of-javascript"
            },
            "projects": [
                {"title": "Audit a Smart Contract", "difficulty": "advanced"}
            ],
            "skills_gained": ["Security", "Consensus", "Scaling"]
        }
    ],
    "Become a Cybersecurity Analyst": [
        {
            "title": "Cybersecurity Fundamentals (Beginner)",
            "duration": "1 week",
            "description": "Learn the basics of cybersecurity, threats, and vulnerabilities.",
            "difficulty": "beginner",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLBf0hzazHTGMdH1xKXyQbK6b0Q1rF",
                "documentation": "https://www.coursera.org/specializations/ibm-cybersecurity-analyst",
                "practice": "https://www.cybrary.it/catalog/cyber-security/"
            },
            "projects": [
                {"title": "Threat Analysis Report", "difficulty": "beginner"}
            ],
            "skills_gained": ["Cybersecurity", "Threat Analysis", "Vulnerabilities"]
        },
        {
            "title": "Network Security & Tools (Intermediate)",
            "duration": "2 weeks",
            "description": "Work with network security tools and protocols.",
            "difficulty": "intermediate",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLBf0hzazHTGMdH1xKXyQbK6b0Q1rF",
                "documentation": "https://www.cisco.com/c/en/us/products/security/what-is-network-security.html",
                "practice": "https://www.cybrary.it/catalog/cyber-security/"
            },
            "projects": [
                {"title": "Configure a Firewall & IDS", "difficulty": "intermediate"}
            ],
            "skills_gained": ["Network Security", "Firewalls", "IDS"]
        },
        {
            "title": "Incident Response & Forensics (Advanced)",
            "duration": "2 weeks",
            "description": "Learn incident response, digital forensics, and reporting.",
            "difficulty": "advanced",
            "resources": {
                "video": "https://www.youtube.com/playlist?list=PLBf0hzazHTGMdH1xKXyQbK6b0Q1rF",
                "documentation": "https://www.coursera.org/specializations/ibm-cybersecurity-analyst",
                "practice": "https://www.cybrary.it/catalog/cyber-security/"
            },
            "projects": [
                {"title": "Incident Response Simulation", "difficulty": "advanced"}
            ],
            "skills_gained": ["Incident Response", "Forensics", "Reporting"]
        }
    ],
}