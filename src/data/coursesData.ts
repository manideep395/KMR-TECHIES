export interface CourseModule {
  title: string;
  topics: string[];
}

export interface DetailedCourse {
  id: string;
  title: string;
  category: string; // e.g. "govt-sponsored", "job-guaranteed", "certification", "academic"
  duration: string;
  price: number;
  image_url: string | null;
  description: string;
  level: string;
  provider?: string;
  skills_covered?: string[];
  modules: CourseModule[];
  whatYouWillLearn: string[];
  careerOpportunities: string[];
  eligibility: string;
  certificationText: string;
  created_at?: string;
  updated_at?: string;
}

export const HARDCODED_GOVT_COURSES: DetailedCourse[] = [
  {
    id: "govt-comm-skills",
    title: "Communication Skills",
    category: "govt-sponsored",
    duration: "30 Hours",
    price: 0,
    image_url: null,
    level: "Beginner / Foundation",
    provider: "Ratna Foundation",
    description: "This course focuses on developing effective communication for personal, educational, and professional success. Learners gain knowledge in verbal, non-verbal, and written communication, along with listening skills and confidence-building for both formal and informal settings. Provided by Ratna Foundation.",
    skills_covered: ["Public Speaking", "Presentation", "Business Email Writing", "Active Listening", "Body Language"],
    modules: [
      {
        title: "Module 1: Introduction to Communication",
        topics: [
          "Understanding the Communication Process & Cycle",
          "Types of Communication: Verbal vs Non-Verbal",
          "Barriers to Effective Communication and Overcoming Them",
          "The 7 Cs of Effective Communication"
        ]
      },
      {
        title: "Module 2: Verbal and Non-Verbal Skills",
        topics: [
          "Voice Modulation, Tone, and Pitch control",
          "Body Language: Postures, Gestures, and Eye Contact",
          "Decoding and Aligning Non-verbal Cues",
          "Assertiveness and Positive Vocabulary"
        ]
      },
      {
        title: "Module 3: Active Listening & Conversational Skills",
        topics: [
          "Active Listening vs Passive Hearing",
          "Paraphrasing, Summarizing, and Asking Clarifying Questions",
          "Initiating and Sustaining Conversations",
          "Handling Informal Dialogue and Professional Small Talk"
        ]
      },
      {
        title: "Module 4: Business Writing and Emails",
        topics: [
          "Professional Email Etiquette and Structure",
          "Writing Clear, Concise Business Messages",
          "Resume and Cover Letter Drafting Basics",
          "Handling Written Feedback and Document Formatting"
        ]
      },
      {
        title: "Module 5: Presentations & Group Discussions",
        topics: [
          "Structuring a Presentation (Intro, Body, Conclusion)",
          "Overcoming Stage Fear & Building Confidence",
          "Handling Audience Q&A Comfortably",
          "Active Participation Rules in Group Discussions"
        ]
      }
    ],
    whatYouWillLearn: [
      "Overcome stage fear and present your ideas confidently in public forums",
      "Draft concise, professional business emails and clear reports",
      "Interpret non-verbal signals and align your body language to match your intent",
      "Develop empathetic active listening habits that foster collaborative relationships"
    ],
    careerOpportunities: [
      "Customer Support Representative",
      "Sales Associate",
      "Front Office Assistant",
      "Client Relations Executive"
    ],
    eligibility: "Open to all rural and semi-urban youth (Minimum 10th standard education).",
    certificationText: "Government-aligned Skill India Certificate in Professional Communication (Issued in partnership with Ratna Foundation)."
  },
  {
    id: "govt-english-basics",
    title: "English Skills Basics for Beginners",
    category: "govt-sponsored",
    duration: "30 Hours",
    price: 0,
    image_url: null,
    level: "Beginner / Foundation",
    provider: "Ratna Foundation",
    description: "Designed for rural and semi-urban youth, this course introduces learners to the basics of spoken and written English. It covers everyday vocabulary, grammar, sentence formation, and conversational skills to improve confidence in using English in daily life and workplaces. Provided by Ratna Foundation.",
    skills_covered: ["Basic Grammar", "Everyday Vocabulary", "Sentence Construction", "Speaking Confidence"],
    modules: [
      {
        title: "Module 1: Alphabet & Word Construction",
        topics: [
          "Pronunciation & Phonetics Basics",
          "Nouns, Pronouns, and Basic Action Words",
          "Constructing Simple Words and Identifying Objects",
          "Subject-Verb Agreement Intro"
        ]
      },
      {
        title: "Module 2: Essential Grammar for Everyday Use",
        topics: [
          "Basic Verb Tenses: Present, Past, and Future",
          "Using Helping Verbs (is, am, are, was, were)",
          "Articles (a, an, the) and Prepositions (in, on, at)",
          "Creating Negative Sentences and Simple Questions"
        ]
      },
      {
        title: "Module 3: Vocabulary for Practical Situations",
        topics: [
          "Greetings, Self-Introduction, and Introducing Others",
          "Vocabulary for Shopping, Travel, and Asking Directions",
          "Describing Objects, Weather, and Feelings",
          "Time, Days, and Date expressions"
        ]
      },
      {
        title: "Module 4: Spoken English & Workplace Scenarios",
        topics: [
          "Conducting Telephone Conversations confidently",
          "Interacting with Managers, Peers, and Customers",
          "Expressing Agreement, Disagreement, and Requesting Help",
          "Roleplays on Daily Life Scenarios"
        ]
      },
      {
        title: "Module 5: Simple Writing & Reading Practice",
        topics: [
          "Reading Short Passages aloud with Correct Intonation",
          "Writing Simple SMS, Chat Messages, and Applications",
          "Form Filling & Basic Data Input in English",
          "Common Errors in Spoken English and How to Correct Them"
        ]
      }
    ],
    whatYouWillLearn: [
      "Form grammatically correct and coherent English sentences",
      "Introduce yourself and engage in everyday conversations confidently",
      "Read, understand, and extract key information from simple English texts",
      "Write simple letters, leave applications, and messages with proper punctuation"
    ],
    careerOpportunities: [
      "Retail Associate",
      "Office Assistant",
      "Support Coordinator",
      "Data Entry Operator"
    ],
    eligibility: "Basic literacy (able to read and write in native regional language).",
    certificationText: "Basic English Proficiency Certificate (Issued in partnership with Ratna Foundation)."
  },
  {
    id: "govt-digital-literacy",
    title: "Digital Literacy for Rural Youth",
    category: "govt-sponsored",
    duration: "30 Hours",
    price: 0,
    image_url: null,
    level: "Beginner",
    provider: "Ratna Foundation",
    description: "This course equips learners with essential knowledge to navigate the digital world. Modules include using computers and smartphones, online transactions, communication through social media, and cyber safety best practices, enabling rural youth to become digitally empowered and future-ready. Provided by Ratna Foundation.",
    skills_covered: ["Computer Basics", "MS Office", "Internet Browsing", "Digital Payments", "Online Safety"],
    modules: [
      {
        title: "Module 1: Getting Started with Computers",
        topics: [
          "Understanding hardware, ports, and booting a computer",
          "Navigating the Operating System (Windows basics)",
          "Mouse & Keyboard Skills, Keyboard Shortcuts",
          "Managing Files, Folders, and USB Drives"
        ]
      },
      {
        title: "Module 2: Essential Office Productivity Tools",
        topics: [
          "Creating and formatting text documents in MS Word",
          "Introduction to spreadsheets: Tables and basic formulas in MS Excel",
          "Designing basic presentations in MS PowerPoint",
          "Printing, converting documents to PDF"
        ]
      },
      {
        title: "Module 3: Using the Internet & Email Services",
        topics: [
          "Searching the Web safely using Google Chrome / Edge",
          "Creating a Google Account and managing Gmail inbox",
          "Drafting, replying, and sending attachments via Email",
          "Utilizing Google Maps, translation tools, and online search"
        ]
      },
      {
        title: "Module 4: Mobile Apps & Digital Financial Literacy",
        topics: [
          "Installing and using essential utility and government apps",
          "Understanding UPI, digital wallets (Paytm, PhonePe) and secure payments",
          "Net Banking safety and avoiding digital payment fraud",
          "Accessing digital certificates via DigiLocker"
        ]
      },
      {
        title: "Module 5: Cyber Security & Social Media Basics",
        topics: [
          "Creating strong passwords and recognizing phishing/scam calls",
          "Safe browsing practices, avoiding malware and viruses",
          "Responsible use of Social Media (WhatsApp, YouTube, Facebook)",
          "Reporting cyber crime and privacy settings on apps"
        ]
      }
    ],
    whatYouWillLearn: [
      "Operate computers, manage folders, and type/edit files efficiently",
      "Perform data entry and create simple reports using Microsoft Office Tools",
      "Navigate internet browsers and utilize email services professionally",
      "Execute secure digital financial transactions and recognize online scams"
    ],
    careerOpportunities: [
      "Data Entry Assistant",
      "CSC Center Manager",
      "Front Office Executive",
      "E-Seva/Digital Assistant"
    ],
    eligibility: "Open to school-goers, dropouts, or graduates (10th pass preferred).",
    certificationText: "National-aligned Digital Literacy Certificate (Issued in partnership with Ratna Foundation)."
  }
];

export const HARDCODED_JOB_GUARANTEED_COURSES: DetailedCourse[] = [
  {
    id: "job-fullstack",
    title: "Full-Stack Web Development (MERN)",
    category: "job-guaranteed",
    duration: "24 Weeks",
    price: 75000,
    image_url: null,
    level: "Advanced / Placement-Backed",
    description: "Master front-end and back-end development with MongoDB, Express, React, and Node.js. Build 15+ real-world projects and secure a guaranteed job as a Software Engineer. Includes 1-on-1 mentor support and interview prep.",
    skills_covered: ["React.js", "Node.js", "Express.js", "MongoDB", "Git & GitHub", "REST APIs", "AWS Cloud", "Tailwind CSS", "TypeScript"],
    modules: [
      {
        title: "Module 1: Web Fundamentals & Modern JavaScript",
        topics: [
          "HTML5 Semantic Layouts, Accessibility, and Validation",
          "CSS3 Responsive Design, Flexbox, Grid, and Media Queries",
          "ES6+ JavaScript Concepts: Callbacks, Promises, async/await, and ES Modules",
          "Git Version Control workflows: branch, merge, pull-request"
        ]
      },
      {
        title: "Module 2: Frontend Engineering with React.js",
        topics: [
          "React Core principles: JSX, Components, and Props",
          "State management: useState, useEffect, useRef, and custom Hooks",
          "Routing with React Router and state sync",
          "Global State Management: Context API & Redux Toolkit",
          "Styling with Tailwind CSS, Framer Motion, and CSS Variables"
        ]
      },
      {
        title: "Module 3: Server-side Development with Node.js & Express",
        topics: [
          "Node.js Runtime: Modules, NPM package manager, and Event Loop",
          "Express.js Server setup, Routing, and Query/Params handling",
          "Writing Custom Middleware for Logging, Auth, and CORS",
          "Designing RESTful APIs following industry standards",
          "Error-handling frameworks and file uploads"
        ]
      },
      {
        title: "Module 4: Databases, Data Modeling & Integrations",
        topics: [
          "SQL vs NoSQL databases: MongoDB architecture",
          "Mongoose Schema definitions, relationships, and queries",
          "JWT-based Authentication & Password Hashing (bcrypt)",
          "Connecting React Frontend with Express API",
          "Environment Variables configuration and API security"
        ]
      },
      {
        title: "Module 5: Testing, Cloud Deployment & MLOps basics",
        topics: [
          "API Testing using Postman and writing unit tests with Jest",
          "Deploying Frontend to Vercel/Netlify",
          "Deploying Node Server to Render/Heroku and MongoDB Atlas Setup",
          "AWS Cloud Core: EC2 instances, S3 storage buckets, and IAM roles",
          "Docker containerization basics"
        ]
      },
      {
        title: "Module 6: Capstone Projects & Placement Bootcamp",
        topics: [
          "Building 2 Large-scale Full Stack applications (e.g. E-Commerce, Social Network)",
          "1-on-1 Mock Technical Interviews and DSA problems solving",
          "Resume/LinkedIn optimization and System Design basics",
          "Hiring partner connects and interview schedules"
        ]
      }
    ],
    whatYouWillLearn: [
      "Architect and deploy full-stack responsive web applications using React and Node.js",
      "Model relational/non-relational database schemas and execute advanced queries",
      "Secure user data using modern JWT-based authentication and secure cookie storage",
      "Automate integration and hosting pipelines using Docker, GitHub, and AWS services"
    ],
    careerOpportunities: [
      "Full-Stack Web Developer",
      "Frontend Software Engineer",
      "Backend Developer",
      "Node.js Specialist",
      "React UI Architect"
    ],
    eligibility: "B.Tech/BE, BCA, MCA, B.Sc CS, or self-taught coders with programming basics. Candidates undergo a short assessment.",
    certificationText: "Professional MERN Stack Developer Certification + 100% Placement Offer Commitment."
  },
  {
    id: "job-datascience",
    title: "Data Science & AI Engineering",
    category: "job-guaranteed",
    duration: "28 Weeks",
    price: 85000,
    image_url: null,
    level: "Advanced / Placement-Backed",
    description: "Learn Python, SQL, machine learning algorithms, deep learning, and AI application development. Designed in collaboration with industry leaders to guarantee your placement as a Data Analyst, Data Engineer, or ML Specialist.",
    skills_covered: ["Python", "SQL", "Pandas & NumPy", "Matplotlib & Seaborn", "Scikit-Learn", "TensorFlow & PyTorch", "Generative AI", "LLMs & LangChain", "Power BI"],
    modules: [
      {
        title: "Module 1: Advanced Python & Database Querying",
        topics: [
          "Python programming structures, Object-Oriented design",
          "Data manipulation using NumPy arrays and Pandas dataframes",
          "Relational databases: SQL queries, joins, aggregates, and subqueries",
          "Data cleaning: Handling missing values, duplicates, and outliers"
        ]
      },
      {
        title: "Module 2: Exploratory Data Analysis & Dashboards",
        topics: [
          "Statistical analysis: Hypothesis testing, probability, and distributions",
          "Data visualization using Seaborn and Matplotlib",
          "Designing interactive executive dashboards in Power BI/Tableau",
          "Storytelling with data: presenting insights to stakeholders"
        ]
      },
      {
        title: "Module 3: Machine Learning Algorithms",
        topics: [
          "Supervised Learning: Linear/Logistic Regression, Decision Trees, Random Forests",
          "Unsupervised Learning: K-Means Clustering, PCA dimension reduction",
          "Model evaluation: Cross-validation, confusion matrices, ROC-AUC, precision-recall",
          "Hyperparameter tuning and feature engineering with Scikit-Learn"
        ]
      },
      {
        title: "Module 4: Deep Learning & Neural Networks",
        topics: [
          "Introduction to Neural Networks and Activation Functions",
          "Deep learning frameworks: TensorFlow and Keras",
          "Computer Vision: Convolutional Neural Networks (CNNs) for image classification",
          "Natural Language Processing: RNNs, LSTMs, and Text Embeddings"
        ]
      },
      {
        title: "Module 5: Generative AI & LLM Applications",
        topics: [
          "Introduction to Transformers and Pre-trained models (GPT, BERT)",
          "Building AI applications with OpenAI APIs and HuggingFace Hub",
          "Retrieval-Augmented Generation (RAG) pipelines using LangChain",
          "Working with Vector Databases (Pinecone, ChromaDB)"
        ]
      },
      {
        title: "Module 6: Capstone Projects & Hiring Preparations",
        topics: [
          "End-to-End ML deployment project (Flask API or Streamlit App on Cloud)",
          "Solving Kaggle datasets and data engineering assignments",
          "Aptitude prep, SQL interview drills, and python live coding challenges",
          "Placement drives with hiring partners"
        ]
      }
    ],
    whatYouWillLearn: [
      "Process, clean, and extract insights from millions of data points using Python and SQL",
      "Build and evaluate supervised and unsupervised ML models for business prediction",
      "Deploy AI applications utilizing large language models (LLMs) and Vector Databases",
      "Construct interactive reporting dashboards for business decisions"
    ],
    careerOpportunities: [
      "Data Analyst",
      "Machine Learning Engineer",
      "Data Scientist",
      "Business Intelligence Developer",
      "AI Solutions Specialist"
    ],
    eligibility: "Graduates in engineering, science, economics, mathematics, or related fields. Basic math/stat awareness is required.",
    certificationText: "Professional Certificate in Data Science & AI Engineering + 100% Placement Offer Commitment."
  },
  {
    id: "job-devops",
    title: "Cloud & DevOps Engineering",
    category: "job-guaranteed",
    duration: "20 Weeks",
    price: 90000,
    image_url: null,
    level: "Advanced / Placement-Backed",
    description: "Master AWS, Docker, Kubernetes, CI/CD pipelines, and infrastructure as code (Terraform). Get hands-on cloud credits and 1-on-1 mentorship to transition into a Cloud Architect or DevOps Engineer role with 100% placement assurance.",
    skills_covered: ["AWS Services", "Linux Administration", "Docker", "Kubernetes", "Terraform", "Jenkins & GitHub Actions", "Ansible", "Prometheus & Grafana"],
    modules: [
      {
        title: "Module 1: Linux Administration & Scripting",
        topics: [
          "Linux file systems, processes, permissions, and command line",
          "Shell Scripting: automating backup, cleanups, and log parsers",
          "Networking basics: IP routing, TCP/UDP, DNS, SSH, and firewalls",
          "Package managers (apt, yum) and service configurations"
        ]
      },
      {
        title: "Module 2: Amazon Web Services (AWS) Core",
        topics: [
          "VPC: designing secure subnets, internet gateways, and route tables",
          "Compute & Storage: EC2 instances, Autoscaling groups, S3, and EBS volumes",
          "AWS IAM permissions, security groups, and encryption keys",
          "Load balancers (ALB, NLB) and route53 dns manager"
        ]
      },
      {
        title: "Module 3: Containerization & Orchestration",
        topics: [
          "Docker: writing Dockerfiles, creating images, and container networking",
          "Docker Compose for multi-container local testing",
          "Kubernetes architecture: Nodes, Pods, Services, Deployments",
          "Configuring Ingress controllers, Persistent Volumes, and ConfigMaps",
          "Managed Kubernetes services (AWS EKS)"
        ]
      },
      {
        title: "Module 4: Continuous Integration & Deployment (CI/CD)",
        topics: [
          "Jenkins server setup, pipeline-as-code syntax",
          "Automated pipelines: checkout, test, build container, push to registry, deploy",
          "GitHub Actions: writing workflows and utilizing marketplace actions",
          "GitOps concepts and deployment automation"
        ]
      },
      {
        title: "Module 5: Infrastructure as Code & Configuration Management",
        topics: [
          "Terraform fundamentals: providers, resources, variables, state management",
          "Writing modules to provision multi-tier AWS environments",
          "Ansible playbooks: configuring servers dynamically",
          "Handling secrets safely in IaC"
        ]
      },
      {
        title: "Module 6: Monitoring, Security & Final Capstone",
        topics: [
          "Setting up Prometheus metrics server and Grafana dashboards",
          "Configuring alerts and log aggregation",
          "Deploying a microservice project in a production-ready AWS EKS environment",
          "System Design and Mock technical interviews"
        ]
      }
    ],
    whatYouWillLearn: [
      "Provision and manage reliable cloud environments on AWS according to best practices",
      "Deploy containerized applications on Kubernetes with high availability and autoscaling",
      "Implement fully automated CI/CD pipelines targeting testing and staging targets",
      "Manage environment assets as code using Terraform to prevent configuration drift"
    ],
    careerOpportunities: [
      "DevOps Engineer",
      "Cloud Solutions Architect",
      "Site Reliability Engineer (SRE)",
      "Systems Engineer",
      "Infrastructure Automation Architect"
    ],
    eligibility: "Graduates with science/tech background, system administrators, or software developers looking to move to DevOps.",
    certificationText: "Professional DevOps & Cloud Architect Certification + 100% Placement Offer Commitment."
  }
];

export const HARDCODED_CERTIFICATION_COURSES: DetailedCourse[] = [
  {
    id: "cert-digi-marketing",
    title: "Digital Marketing & E-Commerce",
    category: "certification",
    duration: "6 Weeks",
    price: 0,
    image_url: null,
    level: "Intermediate",
    provider: "Ratna Foundation",
    description: "Learn the essentials of SEO, social media marketing, email marketing, and e-commerce platform management. Designed by Ratna Foundation to help rural entrepreneurs and youth start and scale online businesses.",
    skills_covered: ["SEO Basics", "Social Media Marketing", "Email Marketing", "Paid Advertising", "E-commerce Store Management"],
    modules: [
      {
        title: "Module 1: Foundations of Digital Marketing",
        topics: [
          "Traditional vs Digital Marketing, Core digital channels",
          "Defining target audiences and creating buyer personas",
          "Introduction to Content Marketing and copy writing basics",
          "Graphic design fundamentals using free tools (Canva)"
        ]
      },
      {
        title: "Module 2: Search Engine Optimization (SEO)",
        topics: [
          "Keyword research: finding high-intent keywords",
          "On-page optimization: titles, headers, images, meta tags",
          "Off-page optimization: backlinks and brand mentions",
          "Technical SEO & setting up Google Search Console"
        ]
      },
      {
        title: "Module 3: Social Media Marketing & Ads",
        topics: [
          "Optimizing business accounts: Facebook, Instagram, LinkedIn, YouTube",
          "Creating a social media content calendar",
          "Launching paid lead-generation campaigns on Meta Ads Manager",
          "Analyzing metrics: Reach, Impressions, Click-through rate, Cost per lead"
        ]
      },
      {
        title: "Module 4: Google Ads & Email Marketing",
        topics: [
          "Search Ads vs Display Ads: structuring a search campaign",
          "Budgeting, bid strategies, and keyword match types",
          "Email marketing setup (Mailchimp/Sender)",
          "Building email lists, designing templates, and automation rules"
        ]
      },
      {
        title: "Module 5: E-commerce Store Management",
        topics: [
          "Setting up a Shopify/WooCommerce online store",
          "Product photography, writing converting product descriptions",
          "Payment gateway integration, shipping rates configurations",
          "Listing products on marketplaces (Amazon, Flipkart sellers portal)"
        ]
      }
    ],
    whatYouWillLearn: [
      "Rank web platforms on search engines using modern SEO practices",
      "Launch and analyze highly targeted paid advertising campaigns",
      "Configure and manage fully functional online storefronts",
      "Write engaging marketing copies and visual creatives for digital media"
    ],
    careerOpportunities: [
      "Digital Marketing Executive",
      "SEO Executive",
      "Social Media Manager",
      "E-commerce Coordinator",
      "Freelance Online Consultant"
    ],
    eligibility: "Basic internet handling and digital literacy skills required.",
    certificationText: "Certified Digital Marketing & E-Commerce Executive (Issued by Ratna Foundation)."
  },
  {
    id: "cert-healthcare-assistant",
    title: "Healthcare Assistant (General Duty Assistant)",
    category: "certification",
    duration: "12 Weeks",
    price: 0,
    image_url: null,
    level: "Beginner / Intermediate",
    provider: "Ratna Foundation",
    description: "Comprehensive healthcare training covering patient care, basic nursing protocols, communication, and medical emergency responses. Certified by Ratna Foundation with hospital placement assistance.",
    skills_covered: ["Patient Care", "Vital Signs", "First Aid & CPR", "Hospital Protocols", "Infection Control"],
    modules: [
      {
        title: "Module 1: Healthcare Delivery System & GDA Role",
        topics: [
          "Introduction to hospitals, wards, and patient support ecosystems",
          "Roles and responsibilities of a General Duty Assistant",
          "Medical ethics, patient confidentiality, and soft skills",
          "Understanding common medical terminology"
        ]
      },
      {
        title: "Module 2: Daily Patient Care & Hygiene",
        topics: [
          "Bed making and bed baths for non-ambulatory patients",
          "Patient mobility, transferring patients from bed to wheelchair",
          "Assisting patients with feeding, grooming, and personal hygiene",
          "Preventing bedsores and managing patient comfort"
        ]
      },
      {
        title: "Module 3: Measuring & Monitoring Vital Signs",
        topics: [
          "Correct usage of Sphygmomanometer (BP monitor) and Thermometer",
          "Measuring and recording: Blood Pressure, Pulse, Respiration, SpO2",
          "Recording intake-output charts and basic documentation",
          "Identifying critical flags and warning signs"
        ]
      },
      {
        title: "Module 4: First Aid & Emergency Actions",
        topics: [
          "Treating cuts, burns, fractures, and insect bites",
          "Cardiopulmonary Resuscitation (CPR) training (practical)",
          "Handling medical emergencies (choking, diabetic shock, seizures)",
          "Hospital evacuation protocols during disasters"
        ]
      },
      {
        title: "Module 5: Infection Control & Waste Disposal",
        topics: [
          "Handwashing protocols and using Personal Protective Equipment (PPE)",
          "Disinfection, sterilization, and linen management",
          "Bio-medical waste disposal protocols (Color-coded bins)",
          "Maintaining clinic hygiene and reporting incidents"
        ]
      },
      {
        title: "Module 6: Practical Hospital Internship",
        topics: [
          "On-site clinical placement under nursing supervision",
          "Dealing with patients and hospital staff in real wards",
          "Admissions and discharge assistance workflows",
          "GDA performance assessment"
        ]
      }
    ],
    whatYouWillLearn: [
      "Provide comprehensive daily support and personal care to bedridden patients safely",
      "Monitor and record patient vital signs accurately using professional equipment",
      "Administer first aid and carry out life-saving Cardiopulmonary Resuscitation (CPR)",
      "Adhere strictly to clinical hygiene and bio-medical waste segregation guidelines"
    ],
    careerOpportunities: [
      "General Duty Assistant (GDA) in Hospitals",
      "Home Health Care Provider",
      "Nursing Home Assistant",
      "Medical Clinic Front Desk & Assistant"
    ],
    eligibility: "Class 10th or 12th pass. Age eligibility requirements apply.",
    certificationText: "Healthcare GDA Professional Vocational Certificate (Partner: Ratna Foundation)."
  },
  {
    id: "cert-agri-tech",
    title: "Modern Agricultural Technology & Agri-business",
    category: "certification",
    duration: "8 Weeks",
    price: 0,
    image_url: null,
    level: "Intermediate",
    provider: "Ratna Foundation",
    description: "Master modern farming techniques, organic agriculture, soil management, micro-irrigation, and agricultural marketing. Empowering farmers and rural youth with sustainable agri-business skills.",
    skills_covered: ["Organic Farming", "Micro-irrigation Systems", "Soil Health Management", "Hydroponics", "Agricultural Marketing & Subsidies"],
    modules: [
      {
        title: "Module 1: Soil Health & Organic Nutrients",
        topics: [
          "Soil sampling, testing, and understanding nutrition parameters",
          "Composting, vermicompost, and organic bio-fertilizer preparation",
          "Crop rotation strategies to maintain soil fertility",
          "Green manure and soil conservation techniques"
        ]
      },
      {
        title: "Module 2: Smart Water Management & Irrigation",
        topics: [
          "Water requirements of major crops",
          "Designing and installing Drip and Sprinkler irrigation systems",
          "Automated water control valves and micro-irrigation maintenance",
          "Rainwater harvesting and borewell recharge methods"
        ]
      },
      {
        title: "Module 3: Integrated Pest & Disease Control",
        topics: [
          "Identifying common pests, crop diseases, and weeds",
          "Biological pest control methods and pheromone traps",
          "Safe usage and dosage of organic and chemical inputs",
          "Drones in agriculture: monitoring crop health"
        ]
      },
      {
        title: "Module 4: Greenhouse & Protected Cultivation",
        topics: [
          "Setting up polyhouses, shade nets, and tunnels",
          "Introduction to Hydroponics, Aquaponics, and Vertical Farming",
          "Growing high-value crops (capsicum, flowers, exotic veggies)",
          "Temperature and humidity controls inside green houses"
        ]
      },
      {
        title: "Module 5: Post-Harvest & Logistics",
        topics: [
          "Grading, sorting, and organic packaging technologies",
          "Cold storage setups, cold chain transport logistics",
          "Preventing crop spoilage and sorting techniques",
          "Food processing basics for extra revenue"
        ]
      },
      {
        title: "Module 6: Agri-Business & Market Linkages",
        topics: [
          "Agri-business project proposal writing and bank loan applications",
          "Understanding government subsidies, policies, and FPO structures",
          "Leveraging digital portals (e-NAM) for selling produce",
          "Contract farming and direct-to-consumer agri-retail models"
        ]
      }
    ],
    whatYouWillLearn: [
      "Manage soil fertility using test reports and organic bio-fertilizers",
      "Install and troubleshoot modern micro-irrigation and water conservation setups",
      "Grow high-value crops within protective polyhouse structures",
      "Navigate digital agricultural markets and structure crop sales agreements"
    ],
    careerOpportunities: [
      "Agri-Entrepreneur",
      "Organic Farm Manager",
      "Agriculture Retail & Consultancy Representative",
      "Cold Chain & Logistics Supervisor",
      "Farmer Producer Organization (FPO) Manager"
    ],
    eligibility: "Open to farming family members, youth, and entrepreneurs (No formal degree limit).",
    certificationText: "Modern Agricultural Specialist and Agri-Business Developer Certificate (Partner: Ratna Foundation)."
  }
];

export const HARDCODED_ACADEMIC_PROGRAMS: DetailedCourse[] = [
  {
    id: "acad-btech-cse",
    title: "B.Tech in Computer Science & Engineering (AI & ML)",
    category: "academic",
    duration: "4 Years",
    price: 180000,
    image_url: null,
    level: "Bachelor's Degree",
    description: "A UGC-recognized 4-year undergraduate degree program co-designed with top university partners. Learn algorithms, data structures, cloud systems, machine learning, and deep learning with guaranteed industry placement support.",
    skills_covered: ["Programming (Java/Python)", "Data Structures & Algorithms", "Database Management Systems", "Artificial Intelligence", "Deep Learning Models", "Cloud Computing"],
    modules: [
      {
        title: "Year 1: Basic Engineering Foundations",
        topics: [
          "Applied Mathematics, Probability, and Vector Calculus",
          "Computer Basics & Problem Solving using C",
          "Engineering Physics & Chemistry Labs",
          "Communication Skills & Professional Ethics"
        ]
      },
      {
        title: "Year 2: Core Computer Science",
        topics: [
          "Data Structures & Algorithms (using Java/C++)",
          "Relational Database Management Systems (SQL, normal forms)",
          "Object-Oriented Programming and Computer Architecture",
          "Operating Systems fundamentals and Unix Shells"
        ]
      },
      {
        title: "Year 3: Artificial Intelligence & Cloud",
        topics: [
          "AI Principles: State-space search, Game playing, Knowledge representation",
          "Machine Learning: Linear regression, Decision trees, SVM, Clustering",
          "Cloud Infrastructure: Virtualization, EC2, Cloud networking (AWS/Azure)",
          "Software Engineering principles and Agile Methodologies"
        ]
      },
      {
        title: "Year 4: Specialization & Industry Internship",
        topics: [
          "Deep Learning: Multi-layer perceptrons, CNNs, RNNs, and Transformers",
          "Natural Language Processing & Computer Vision applications",
          "Big Data Frameworks: MapReduce, Hadoop, and Spark",
          "Major Capstone Project, Industry Internship, & Dissertation"
        ]
      }
    ],
    whatYouWillLearn: [
      "Write optimized code and implement data structures to solve complex computational problems",
      "Model, design, and query relational and non-relational database systems",
      "Deploy neural networks and deep learning models for NLP and CV applications",
      "Design distributed, cloud-native backend systems following architectural patterns"
    ],
    careerOpportunities: [
      "AI/ML Software Engineer",
      "Software Developer",
      "Cloud Architect",
      "Data Engineer",
      "System Engineer"
    ],
    eligibility: "Completed 10+2 with Physics, Chemistry, and Mathematics (PCM) from a recognized board.",
    certificationText: "UGC-recognized Bachelor of Technology (B.Tech) Degree in Computer Science & Engineering."
  },
  {
    id: "acad-mca",
    title: "Master of Computer Applications (MCA)",
    category: "academic",
    duration: "2 Years",
    price: 95000,
    image_url: null,
    level: "Master's Degree",
    description: "UGC-recognized postgraduate program specializing in Cloud Computing, Big Data Analytics, and Software Architecture. Includes hands-on labs, university exams, and placement preparation.",
    skills_covered: ["Enterprise Software", "Advanced Java & Web Technology", "Big Data Analytics", "Cyber Security & Cryptography", "Software Project Management"],
    modules: [
      {
        title: "Semester 1: Advanced Computing & Architecture",
        topics: [
          "Mathematical Foundations of Computer Science",
          "Advanced Data Structures & Analysis of Algorithms",
          "Computer Networks & Communication Protocols",
          "Object-Oriented Analysis and Design (UML)"
        ]
      },
      {
        title: "Semester 2: Web Engineering & Enterprise Java",
        topics: [
          "Web Technologies: HTML5, CSS3, JS, React basics",
          "Enterprise Java: Servlets, JSP, Hibernate, and Spring Boot framework",
          "Software Engineering, Quality Assurance, and DevOps basics",
          "Database Management Systems and PL/SQL Programming"
        ]
      },
      {
        title: "Semester 3: Analytics & Advanced Tech",
        topics: [
          "Big Data: Hadoop Distributed File System, MapReduce, Spark",
          "Cloud Computing Platforms (AWS configurations, Serverless)",
          "Cyber Security, Cryptography, and Secure Coding practices",
          "Artificial Intelligence & Machine Learning foundations"
        ]
      },
      {
        title: "Semester 4: Capstone, Internship & Graduation",
        topics: [
          "Six-month full-time Industry Project & Internship",
          "Thesis research work and documentation",
          "Technical seminar presentation and Viva-Voce"
        ]
      }
    ],
    whatYouWillLearn: [
      "Construct enterprise-level web applications using Spring Boot and Hibernate",
      "Formulate big-data processing jobs using Hadoop and Apache Spark framework",
      "Secure network communication channels and prevent common web security bugs",
      "Manage software development projects using standard agile frameworks"
    ],
    careerOpportunities: [
      "Senior Software Engineer",
      "Systems Analyst",
      "Database Administrator",
      "Network Administrator",
      "IT Project Manager"
    ],
    eligibility: "BCA / Bachelor Degree in Computer Science or graduation with Mathematics at 10+2 level or Graduation level.",
    certificationText: "UGC-recognized Master of Computer Applications (MCA) Post-Graduate Degree."
  },
  {
    id: "acad-mtech-se",
    title: "M.Tech in Software Engineering & DevOps",
    category: "academic",
    duration: "2 Years",
    price: 110000,
    image_url: null,
    level: "Master's Degree",
    description: "Advanced postgraduate degree focusing on large-scale software engineering, distributed systems, DevOps practices, and enterprise cloud architecture. Ideal for working professionals looking to upskill.",
    skills_covered: ["Software Architecture", "Distributed Systems", "Cloud-Native Infrastructure", "DevOps Pipelines", "Advanced Software Quality Assurance"],
    modules: [
      {
        title: "Semester 1: Advanced Software Design",
        topics: [
          "Software Design Patterns & Architecture styles",
          "Advanced Software Engineering Methodology (Agile, Scrum)",
          "Distributed Systems: remote calls, consensus, synchronization",
          "Software Requirements engineering and Project Management"
        ]
      },
      {
        title: "Semester 2: Cloud Native Systems & Infrastructure",
        topics: [
          "Cloud Service Models (IaaS, PaaS, SaaS) and virtualization",
          "Microservices Architecture: API Gateways, Service Discovery, Eventual Consistency",
          "Distributed Databases and Caching layers (Redis, Cassandra)",
          "Data Storage Security & Privacy regulations"
        ]
      },
      {
        title: "Semester 3: DevOps & Release Engineering",
        topics: [
          "Infrastructure as Code: Terraform and Ansible orchestration",
          "Container Orchestration: scaling and running Kubernetes clusters",
          "Configuring CI/CD pipelines (Jenkins, GitLab CI, GitOps)",
          "Reliability Engineering, Chaos testing, Prometheus/Grafana monitoring"
        ]
      },
      {
        title: "Semester 4: Master's Thesis & Research",
        topics: [
          "Research methodology & identifying software architecture problem statement",
          "Six-month thesis development and software benchmarking",
          "Publishing research paper in indexed journal",
          "Final defense examination"
        ]
      }
    ],
    whatYouWillLearn: [
      "Design fault-tolerant distributed microservices systems at scale",
      "Deploy self-healing, auto-scaling applications on Kubernetes clusters",
      "Author Infrastructure-as-code scripts using Terraform to deploy cloud resources",
      "Optimize software system performance using Prometheus metrics and Grafana"
    ],
    careerOpportunities: [
      "Software Architect",
      "Senior DevOps Architect",
      "Engineering Director",
      "Principal Software Developer",
      "SRE Director"
    ],
    eligibility: "Completed B.E. / B.Tech in CSE / IT / ECE or equivalent degree (MCA/M.Sc CS) with valid cut-off marks.",
    certificationText: "UGC-recognized Master of Technology (M.Tech) Postgraduate Degree in Software Engineering."
  }
];

export const ALL_HARDCODED_COURSES: DetailedCourse[] = [
  ...HARDCODED_GOVT_COURSES,
  ...HARDCODED_JOB_GUARANTEED_COURSES,
  ...HARDCODED_CERTIFICATION_COURSES,
  ...HARDCODED_ACADEMIC_PROGRAMS
];

export function getCourseById(id: string): DetailedCourse | undefined {
  return ALL_HARDCODED_COURSES.find(c => c.id === id);
}
