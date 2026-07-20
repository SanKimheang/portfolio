// Portfolio configuration data for San Kimheang
const portfolioData = {
  personal: {
    name: "San Kimheang",
    titles: ["Data Scientist", "Machine Learning Specialist", "PowerBI Developer", "Statistics Enthusiast"],
    bio: "A passionate Fresh Graduate in Data Science with a strong foundation in statistical modeling, machine learning, and interactive data visualization. Skilled in translating complex data sets into actionable business insights using Python, R, and PowerBI. Eager to solve real-world challenges through data-driven decisions.",
    email: "kimheangtkd@gmail.com",
    github: "https://github.com/SanKimheang",
    linkedin: "https://www.linkedin.com/in/kimheang-san-8279822b6/",
    resumeUrl: "#" // Can be updated with a link to actual resume PDF later
  },

  skills: [
    { name: "Python", category: "languages", level: 90 },
    { name: "R Programming", category: "languages", level: 85 },
    { name: "JavaScript", category: "languages", level: 75 },
    { name: "SQL", category: "languages", level: 80 },

    { name: "Machine Learning", category: "ml", level: 90 },
    { name: "Deep Learning", category: "ml", level: 80 },
    { name: "Statistics", category: "ml", level: 88 },
    { name: "Data Modeling", category: "ml", level: 85 },

    { name: "PowerBI (ETL, DAX)", category: "tools", level: 92 },
    { name: "Automated Dashboards", category: "tools", level: 90 },
    { name: "TensorFlow & Keras", category: "tools", level: 78 },
    { name: "Git & Version Control", category: "tools", level: 85 }
  ],

  projects: [
    {
      title: "Automated Corporate Sales Dashboard",
      category: "PowerBI",
      description: "An end-to-end interactive dashboard incorporating complex ETL pipelines, star schema data modeling, and custom DAX calculations to track sales, identify market trends, and automate executive reporting.",
      tech: ["PowerBI", "DAX", "ETL", "Data Modeling", "SQL"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      liveLink: "#",
      githubLink: "https://github.com/SanKimheang"
    },
    {
      title: "Customer Churn Prediction Engine",
      category: "Machine Learning",
      description: "Developed and trained classification models (Random Forest, XGBoost) to forecast subscriber churn. Performed extensive feature engineering and feature selection, achieving a 91.5% ROC-AUC score.",
      tech: ["Python", "Scikit-Learn", "Pandas", "Seaborn", "Flask"],
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      liveLink: "#",
      githubLink: "https://github.com/SanKimheang"
    },
    {
      title: "Medical Image Segmentation with CNNs",
      category: "Deep Learning",
      description: "Built a customized U-Net architecture using TensorFlow and Keras to segment structures in medical scans. Integrated advanced data augmentation techniques to prevent overfitting.",
      tech: ["Python", "TensorFlow", "Keras", "OpenCV", "Deep Learning"],
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80",
      liveLink: "#",
      githubLink: "https://github.com/SanKimheang"
    },
    {
      title: "Global Epidemic Trends & Regression Analysis",
      category: "Statistics",
      description: "Conducted statistical analysis on multivariate demographic datasets to identify healthcare correlations. Constructed regression and hypothesis tests to establish statistical significance.",
      tech: ["R Programming", "ggplot2", "Statistics", "dplyr", "R Markdown"],
      image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80",
      liveLink: "#",
      githubLink: "https://github.com/SanKimheang"
    },
    {
      title: "Interactive Energy Grid Dashboard",
      category: "PowerBI",
      description: "Designed a PowerBI dashboard capturing real-time grid metrics, predicting load demand using custom statistical forecasts, and featuring automated alert triggers via DAX logic.",
      tech: ["PowerBI", "DAX", "Data Modeling", "ETL", "Power Query"],
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
      liveLink: "#",
      githubLink: "https://github.com/SanKimheang"
    },
    {
      title: "NLP Sentiment Analyzer",
      category: "Deep Learning",
      description: "Created an LSTM recurrent neural network using TensorFlow to analyze social sentiment trends, parsing over 50,000 tweets with customized tokenization and word embedding layouts.",
      tech: ["Python", "TensorFlow", "NLP", "Pandas", "NLTK"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      liveLink: "#",
      githubLink: "https://github.com/SanKimheang"
    }
  ],

  timeline: [
    {
      type: "experience",
      role: "Machine Learning Engineer (Intern)",
      organization: "Research and Data Analytics Lab",
      duration: "Feb 2026 - Jun 2026",
      description: "Building a real-time plastic detection system."
    },
    {
      type: "education",
      role: "Engineering Degree in Applied Mathematic and Statistics",
      organization: "Institute of Technology of Cambodia",
      duration: "2022 - 2026",
      description: "Rigorous training in machine learning algorithms, advanced mathematical analysis, statistical inference, database design, and programming logic. Graduated in Data Science, focusing capstone project on all Data Science and AI field."
    },
    {
      type: "education",
      role: "Bachelor Degree in Education, Teaching English as a Foreign Languages",
      organization: " Institute of Foreign Languages, Royal University of Phnom Penh",
      duration: "2022 - 2025",
      description: "Rigorous training in teaching methodology, applied linguistics, pedagogical psychology, Critical thinking skills, cross-cultural communication, and Professionalism."
    },
    {
      type: "education",
      role: "Graduated High School",
      organization: "Toun Fa School, 端华学校",
      duration: "2017 - 2021",
      description: "Completed high school education with a focus on science and mathematics, demonstrating strong foundational knowledge in core academic subjects."
    }
  ],

  services: [
    {
      icon: "fas fa-brain",
      title: "Predictive Modeling",
      description: "Building accurate machine learning classifiers and regression engines customized to business objectives using Python and Scikit-Learn."
    },
    {
      icon: "fas fa-chart-line",
      title: "Interactive Dashboards",
      description: "Creating premium PowerBI solutions with custom DAX calculations, strong star schemas, automated updates, and intuitive layouts."
    },
    {
      icon: "fas fa-database",
      title: "Data ETL Pipelines",
      description: "Designing end-to-end data pipelines to extract, clean, and model complex datasets from SQL databases, APIs, or flat files."
    },
    {
      icon: "fas fa-calculator",
      title: "Statistical Research",
      description: "Conducting robust exploratory data analyses, hypothesis testing, A/B testing, and correlation designs in Python and R."
    }
  ]
};
