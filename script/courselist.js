const CourseList = [
  {
    title: "Introduction to Mathematics",
    code: "MATH101",
    description: "Basic concepts in algebra, geometry, and trigonometry.",
  },
  {
    title: "English Language and Communication",
    code: "ENG102",
    description:
      "Focus on grammar, writing, and effective communication skills.",
  },
  {
    title: "General Physics I",
    code: "PHY103",
    description: "Covers mechanics, motion, and basic thermodynamics.",
  },
  {
    title: "Principles of Economics",
    code: "ECO104",
    description: "Introduction to micro and macroeconomics theories.",
  },
  {
    title: "Introduction to Computer Science",
    code: "CSC105",
    description:
      "Overview of computing fundamentals and problem-solving with computers.",
  },
  {
    title: "Organic Chemistry",
    code: "CHM106",
    description: "Study of carbon compounds and their reactions.",
  },
  {
    title: "World History and Civilization",
    code: "HIS107",
    description: "Survey of key global historical events and civilizations.",
  },
  {
    title: "Biology for Life Sciences",
    code: "BIO108",
    description: "Cell biology, genetics, and classification of organisms.",
  },
  {
    title: "Business Management Fundamentals",
    code: "BUS109",
    description: "Principles and practices of modern business management.",
  },
  {
    title: "Programming with Python",
    code: "CSC110",
    description: "Learn the basics of programming using the Python language.",
  },
  {
    title: "Statistics and Probability",
    code: "STA111",
    description: "Concepts in descriptive and inferential statistics.",
  },
  {
    title: "Creative Writing",
    code: "ENG112",
    description: "Writing short stories, poetry, and personal essays.",
  },
  {
    title: "Database Management Systems",
    code: "CSC113",
    description: "Concepts and design of relational databases with SQL.",
  },
  {
    title: "Environmental Science",
    code: "ENV114",
    description: "Study of human interaction with the environment.",
  },
  {
    title: "Digital Marketing Basics",
    code: "MKT115",
    description: "Online branding, SEO, social media, and email marketing.",
  },
  {
    title: "Human Anatomy and Physiology",
    code: "BIO116",
    description: "Structure and function of the human body systems.",
  },
  {
    title: "Web Development I",
    code: "CSC117",
    description: "Building websites using HTML, CSS, and JavaScript.",
  },
  {
    title: "Philosophy and Logic",
    code: "PHL118",
    description:
      "Critical thinking and introduction to philosophical reasoning.",
  },
  {
    title: "Principles of Accounting",
    code: "ACC119",
    description: "Basic financial accounting concepts and procedures.",
  },
  {
    title: "Data Structures and Algorithms",
    code: "CSC120",
    description: "Foundations of organizing and processing data efficiently.",
  },

  {
    title: "Mobile Application Development",
    code: "CSC201",
    description:
      "Design and development of mobile apps using cross-platform tools.",
  },
  {
    title: "Linear Algebra",
    code: "MATH202",
    description: "Matrix theory, vector spaces, and linear transformations.",
  },
  {
    title: "Advanced Web Development",
    code: "CSC203",
    description:
      "Frontend and backend frameworks for building full-stack apps.",
  },
  {
    title: "Corporate Finance",
    code: "FIN204",
    description:
      "Financial decision-making in corporations, including capital budgeting.",
  },
  {
    title: "Introduction to Sociology",
    code: "SOC205",
    description:
      "Study of social institutions, relationships, and human behavior.",
  },
  {
    title: "Machine Learning",
    code: "CSC206",
    description:
      "Supervised and unsupervised learning algorithms and applications.",
  },
  {
    title: "Ethics and Leadership",
    code: "PHL207",
    description:
      "Exploring moral responsibility and effective leadership practices.",
  },
  {
    title: "Multimedia Systems",
    code: "CSC208",
    description: "Handling audio, video, and images in computer systems.",
  },
  {
    title: "Comparative Politics",
    code: "POL209",
    description: "Comparative analysis of political systems across countries.",
  },
  {
    title: "Artificial Intelligence",
    code: "CSC210",
    description: "Concepts and implementation of intelligent systems.",
  },
  {
    title: "Educational Psychology",
    code: "EDU211",
    description: "How students learn and the role of psychology in education.",
  },
  {
    title: "Software Engineering Principles",
    code: "CSC212",
    description:
      "Software development lifecycle, methodologies, and design patterns.",
  },
  {
    title: "Marketing Strategy",
    code: "MKT213",
    description: "Strategic planning and market positioning techniques.",
  },
  {
    title: "International Trade",
    code: "ECO214",
    description: "Theories and policies in global trade and commerce.",
  },
  {
    title: "Cloud Computing",
    code: "CSC215",
    description:
      "Cloud architecture, deployment, and services like AWS and Azure.",
  },
  {
    title: "Health and Wellness Education",
    code: "HSC216",
    description: "Promoting physical, mental, and emotional well-being.",
  },
  {
    title: "Software Testing and QA",
    code: "CSC217",
    description:
      "Testing strategies, debugging, and software quality assurance.",
  },
  {
    title: "Conflict Resolution",
    code: "SOC218",
    description:
      "Techniques and frameworks for resolving interpersonal conflicts.",
  },
  {
    title: "Cryptography and Network Security",
    code: "CSC219",
    description:
      "Data encryption, secure communication, and cybersecurity principles.",
  },
  {
    title: "Introduction to Entrepreneurship",
    code: "BUS220",
    description: "Starting and managing new business ventures.",
  },

  {
    title: "Introduction to Artificial Neural Networks",
    code: "CSC301",
    description:
      "Basic principles and architectures of neural networks for AI systems.",
  },
  {
    title: "Public Speaking and Presentation Skills",
    code: "COM302",
    description: "Developing confidence and clarity in public communication.",
  },
  {
    title: "Numerical Methods",
    code: "MATH303",
    description: "Algorithms for solving mathematical problems numerically.",
  },
  {
    title: "Entrepreneurship and Innovation",
    code: "BUS304",
    description: "Generating and implementing innovative business ideas.",
  },
  {
    title: "Digital Electronics",
    code: "EEE305",
    description: "Introduction to logic circuits and digital systems.",
  },
  {
    title: "Research Methodology",
    code: "RES306",
    description: "Scientific methods of research design and data analysis.",
  },
  {
    title: "Introduction to Philosophy of Science",
    code: "PHL307",
    description: "Exploration of scientific reasoning, methods, and paradigms.",
  },
  {
    title: "Geographical Information Systems (GIS)",
    code: "GEO308",
    description: "Tools and concepts for spatial data analysis and mapping.",
  },
  {
    title: "Software Architecture",
    code: "CSC309",
    description: "Design and structure of complex software systems.",
  },
  {
    title: "Tourism and Hospitality Management",
    code: "THM310",
    description:
      "Overview of the tourism industry and customer service strategies.",
  },
  {
    title: "Cloud-Native Application Development",
    code: "CSC311",
    description:
      "Building scalable apps using containers and serverless platforms.",
  },
  {
    title: "Human-Computer Interaction",
    code: "CSC312",
    description:
      "Designing user-centered interfaces and improving user experience.",
  },
  {
    title: "Organizational Behavior",
    code: "BUS313",
    description: "Analyzing behavior within corporate environments.",
  },
  {
    title: "Operations Research",
    code: "MATH314",
    description:
      "Optimization techniques in decision-making and resource allocation.",
  },
  {
    title: "Medical Microbiology",
    code: "BIO315",
    description: "Study of microorganisms that cause diseases in humans.",
  },
  {
    title: "Data Visualization Techniques",
    code: "CSC316",
    description: "Transforming data into meaningful charts and dashboards.",
  },
  {
    title: "Gender and Development Studies",
    code: "SOC317",
    description:
      "Explores gender roles, equality, and social development issues.",
  },
  {
    title: "Digital Photography and Editing",
    code: "ART318",
    description:
      "Capturing and enhancing images using modern tools and software.",
  },
  {
    title: "Blockchain Technology",
    code: "CSC319",
    description:
      "Understanding distributed ledgers, smart contracts, and cryptocurrencies.",
  },
  {
    title: "Speech Writing and Delivery",
    code: "ENG320",
    description:
      "Crafting compelling speeches for various occasions and audiences.",
  },

  {
    title: "Agile Project Management",
    code: "PM401",
    description: "Principles and practices of Agile and Scrum methodologies.",
  },
  {
    title: "Renewable Energy Technologies",
    code: "EEE402",
    description:
      "Exploration of solar, wind, hydro, and other renewable systems.",
  },
  {
    title: "Digital Forensics",
    code: "CSC403",
    description:
      "Techniques used in investigating cybercrimes and digital evidence.",
  },
  {
    title: "Mobile UI/UX Design",
    code: "DES404",
    description: "Creating user-centered designs for mobile apps.",
  },
  {
    title: "Food Science and Nutrition",
    code: "FST405",
    description: "Understanding food composition, safety, and human nutrition.",
  },
  {
    title: "Game Development Fundamentals",
    code: "CSC406",
    description: "Building interactive games using 2D/3D engines and logic.",
  },
  {
    title: "Natural Language Processing",
    code: "CSC407",
    description: "Techniques for analyzing and generating human language data.",
  },
  {
    title: "Strategic Human Resource Management",
    code: "HRM408",
    description:
      "Talent planning, development, and employee engagement strategies.",
  },
  {
    title: "Ethical Hacking and Penetration Testing",
    code: "CSC409",
    description:
      "Ethical techniques for testing and securing applications and networks.",
  },
  {
    title: "Logistics and Supply Chain Management",
    code: "BUS410",
    description: "Managing flow of goods, services, and logistics operations.",
  },
  {
    title: "Digital Illustration and Animation",
    code: "ART411",
    description:
      "Visual storytelling through drawing, motion, and animation tools.",
  },
  {
    title: "Cloud Security and Governance",
    code: "CSC412",
    description: "Best practices for protecting cloud-based systems and data.",
  },
  {
    title: "Customer Relationship Management (CRM)",
    code: "MKT413",
    description: "Strategies to manage and analyze customer interactions.",
  },
  {
    title: "Embedded Systems Design",
    code: "EEE414",
    description: "Developing systems where software interacts with hardware.",
  },
  {
    title: "Financial Technology (FinTech)",
    code: "FIN415",
    description: "Digital innovations transforming the financial sector.",
  },
  {
    title: "Urban and Regional Planning",
    code: "URP416",
    description: "Planning sustainable cities and communities.",
  },
  {
    title: "Motion Graphics Design",
    code: "DES417",
    description: "Animating visual content for advertising and storytelling.",
  },
  {
    title: "Digital Journalism",
    code: "JRN418",
    description: "News writing, reporting, and ethics in the digital era.",
  },
  {
    title: "Artificial Intelligence Ethics",
    code: "PHL419",
    description: "Analyzing ethical issues in AI development and deployment.",
  },
  {
    title: "Cyber Law and Policy",
    code: "LAW420",
    description: "Legal and policy frameworks for cyberspace and data privacy.",
  },
  {
    title: "Advanced Data Analytics",
    code: "CSC501",
    description:
      "Techniques and tools for analyzing large and complex datasets.",
  },
  {
    title: "Instructional Design for E-Learning",
    code: "EDU502",
    description:
      "Designing engaging and effective online learning experiences.",
  },
  {
    title: "Computational Thinking",
    code: "CSC503",
    description:
      "Problem-solving skills using logical and algorithmic thinking.",
  },
  {
    title: "Business Intelligence Systems",
    code: "BUS504",
    description: "Using data for strategic decision-making in business.",
  },
  {
    title: "Applied Econometrics",
    code: "ECO505",
    description: "Statistical methods for economic data analysis.",
  },
  {
    title: "Creative Media Production",
    code: "MED506",
    description: "Producing digital media content for various platforms.",
  },
  {
    title: "Climate Change and Sustainability",
    code: "ENV507",
    description:
      "Scientific and policy issues surrounding global climate change.",
  },
  {
    title: "AI-Powered Product Development",
    code: "CSC508",
    description:
      "Integrating artificial intelligence in product innovation cycles.",
  },
  {
    title: "International Human Rights",
    code: "LAW509",
    description: "Legal frameworks and global movements for human rights.",
  },
  {
    title: "Cognitive Psychology",
    code: "PSY510",
    description: "Exploring memory, language, perception, and decision-making.",
  },
  {
    title: "Virtual and Augmented Reality",
    code: "CSC511",
    description:
      "Development and application of immersive virtual technologies.",
  },
  {
    title: "Cinematography and Video Editing",
    code: "ART512",
    description:
      "Principles of camera work and digital video editing workflows.",
  },
  {
    title: "Social Media Strategy",
    code: "MKT513",
    description:
      "Planning and executing impactful campaigns on social platforms.",
  },
  {
    title: "Introduction to Biotechnology",
    code: "BIO514",
    description:
      "Study of genetic engineering, molecular biology, and biotech tools.",
  },
  {
    title: "Political Philosophy",
    code: "PHL515",
    description: "Theories of governance, justice, freedom, and power.",
  },
  {
    title: "Quantum Computing Fundamentals",
    code: "CSC516",
    description: "Basics of quantum logic and how quantum computers work.",
  },
  {
    title: "E-Commerce and Online Business",
    code: "BUS517",
    description:
      "Building and managing digital storefronts and payment systems.",
  },
  {
    title: "User Research and Testing",
    code: "UXD518",
    description: "Gathering feedback to improve user experiences.",
  },
  {
    title: "History of African Civilizations",
    code: "HIS519",
    description:
      "Exploring the rich history and contributions of African empires.",
  },
  {
    title: "Advanced Robotics",
    code: "EEE520",
    description: "Designing intelligent autonomous robotic systems.",
  },
];

module.exports = { CourseList };
