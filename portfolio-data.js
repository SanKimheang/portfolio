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
      githubLink: "https://github.com/SanKimheang/Sale_dashboard"
    },
    {
      title: "NLP Khmer Semantic Similarity",
      category: "Deep Learning",
      description: "Developed a deep learning model to evaluate semantic similarity in the Khmer language. Implemented custom word embeddings, and fine-tuned pre-trained models to power advanced textual comparison and search tools.",
      tech: ["Python", "PyTorch", "Transformers", "NLP", "Khmer NLP"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      liveLink: "#",
      githubLink: "https://github.com/SanKimheang/khmer_sementic_similarity"
    },
    {
      title: "Real-Time Plastic Detection System",
      category: "Deep Learning",
      description: "Designed and deployed a real-time computer vision system to detect and classify plastic waste. Optimized YOLO architecture for edge deployment, achieving high frame-rates and localization accuracy.",
      tech: ["Python", "YOLO", "OpenCV", "PyTorch", "Reactjs", "FastAPI", "Docker", "MySQL"],
      image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80",
      liveLink: "#",
      githubLink: "https://github.com/SanKimheang/plastic-detection"
    },
    {
      title: "Electricity Demand Forecasting",
      category: "Statistics",
      description: "Constructed advanced statistical and time-series forecasting models (AR, MA, ARMA, ARIMA) to predict electricity consumption, reducing forecasting errors and improving peak load planning.",
      tech: ["R programming", "Statsmodels", "Time Series", "ggplot2"],
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
      liveLink: "#",
      githubLink: "https://github.com/SanKimheang/electricity_demand_forecasting"
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
      type: "experience",
      role: "Data Scientist (Intern)",
      organization: "The National Institute of Statistics, Ministry of Planning",
      duration: "Jul 2025 - Sep 2025",
      description: "Building a predictive model for Unmet need for family planning"
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
      description: "Building accurate machine learning classifiers and regression engines customized to business objectives using Python, Scikit-Learn, TensorFlow, and Pytorch."
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
      description: "Conducting robust exploratory data analyses, hypothesis testing, and correlation designs in Python and R."
    },
    {
      icon: "fas fa-robot",
      title: "Intelligent Chatbots",
      description: "Developing intelligent conversational agents and customized chatbots integrated with LLMs, prompt engineering, and context-aware knowledge bases."
    },
    {
      icon: "fas fa-wand-magic-sparkles",
      title: "Generative AI Solutions",
      description: "Designing and implementing cutting-edge generative AI workflows, retrieval-augmented generation (RAG) systems, and fine-tuning models to automate business processes."
    }
  ]
};
