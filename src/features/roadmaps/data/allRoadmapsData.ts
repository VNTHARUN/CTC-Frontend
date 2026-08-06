import { RoadmapData } from '../pages/RoadmapDetails';

export const allRoadmapsData: Record<string, RoadmapData> = {
  "java-backend-developer": {
    "title": "Java Backend Developer",
    "subtitle": "Step-by-step guide to mastering Core Java, JVM Architecture, Collections, Concurrency, Spring Boot, and Enterprise Microservices.",
    "shortExplanation": "Java Backend Developer provides the step-by-step technical mastery path to become proficient in java backend developer.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Java Backend Developer",
      "Apply best practices and industry patterns for Java Backend Developer",
      "Build real-world production projects using Java Backend Developer",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "java-backend-developer-1",
        "title": "Phase 1: Core Fundamentals of Java Backend Developer",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Java Backend Developer syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Java Backend Developer is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Java Backend Developer."
        ],
        "resources": [
          {
            "name": "Official Java Backend Developer Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "java-backend-developer-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Java Backend Developer.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Java Backend Developer."
        ],
        "resources": [
          {
            "name": "Intermediate Java Backend Developer Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "java-backend-developer-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Java Backend Developer applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Java Backend Developer."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Java Backend Developer",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Java Backend Developer important for tech placement interviews?",
        "answer": "Proficiency in Java Backend Developer demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Java Backend Developer concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Java Backend Developer roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "backend-developer": {
    "title": "Backend Developer",
    "subtitle": "Master server-side architecture, REST & GraphQL APIs, relational & NoSQL databases, caching, and microservices.",
    "shortExplanation": "Backend Developer provides the step-by-step technical mastery path to become proficient in backend developer.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Backend Developer",
      "Apply best practices and industry patterns for Backend Developer",
      "Build real-world production projects using Backend Developer",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "backend-developer-1",
        "title": "Phase 1: Core Fundamentals of Backend Developer",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Backend Developer syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Backend Developer is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Backend Developer."
        ],
        "resources": [
          {
            "name": "Official Backend Developer Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "backend-developer-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Backend Developer.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Backend Developer."
        ],
        "resources": [
          {
            "name": "Intermediate Backend Developer Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "backend-developer-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Backend Developer applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Backend Developer."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Backend Developer",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Backend Developer important for tech placement interviews?",
        "answer": "Proficiency in Backend Developer demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Backend Developer concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Backend Developer roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "full-stack-developer": {
    "title": "Full Stack Developer",
    "subtitle": "Comprehensive guide to mastering HTML/CSS, JavaScript/TypeScript, React, Node.js, databases, and modern deployment.",
    "shortExplanation": "Full Stack Developer provides the step-by-step technical mastery path to become proficient in full stack developer.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Full Stack Developer",
      "Apply best practices and industry patterns for Full Stack Developer",
      "Build real-world production projects using Full Stack Developer",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "full-stack-developer-1",
        "title": "Phase 1: Core Fundamentals of Full Stack Developer",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Full Stack Developer syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Full Stack Developer is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Full Stack Developer."
        ],
        "resources": [
          {
            "name": "Official Full Stack Developer Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "full-stack-developer-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Full Stack Developer.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Full Stack Developer."
        ],
        "resources": [
          {
            "name": "Intermediate Full Stack Developer Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "full-stack-developer-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Full Stack Developer applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Full Stack Developer."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Full Stack Developer",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Full Stack Developer important for tech placement interviews?",
        "answer": "Proficiency in Full Stack Developer demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Full Stack Developer concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Full Stack Developer roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "devops-engineer": {
    "title": "DevOps Engineer",
    "subtitle": "Master CI/CD pipelines, Docker containerization, Kubernetes orchestration, Infrastructure as Code, and Cloud Monitoring.",
    "shortExplanation": "DevOps Engineer provides the step-by-step technical mastery path to become proficient in devops engineer.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of DevOps Engineer",
      "Apply best practices and industry patterns for DevOps Engineer",
      "Build real-world production projects using DevOps Engineer",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "devops-engineer-1",
        "title": "Phase 1: Core Fundamentals of DevOps Engineer",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of DevOps Engineer syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in DevOps Engineer is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using DevOps Engineer."
        ],
        "resources": [
          {
            "name": "Official DevOps Engineer Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "devops-engineer-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for DevOps Engineer.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with DevOps Engineer."
        ],
        "resources": [
          {
            "name": "Intermediate DevOps Engineer Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "devops-engineer-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy DevOps Engineer applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using DevOps Engineer."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for DevOps Engineer",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is DevOps Engineer important for tech placement interviews?",
        "answer": "Proficiency in DevOps Engineer demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test DevOps Engineer concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the DevOps Engineer roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "cloud-engineer": {
    "title": "Cloud Engineer",
    "subtitle": "Learn AWS, Azure, GCP cloud architecture, serverless computing, VPC networking, security IAM, and cloud deployment.",
    "shortExplanation": "Cloud Engineer provides the step-by-step technical mastery path to become proficient in cloud engineer.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Cloud Engineer",
      "Apply best practices and industry patterns for Cloud Engineer",
      "Build real-world production projects using Cloud Engineer",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "cloud-engineer-1",
        "title": "Phase 1: Core Fundamentals of Cloud Engineer",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Cloud Engineer syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Cloud Engineer is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Cloud Engineer."
        ],
        "resources": [
          {
            "name": "Official Cloud Engineer Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "cloud-engineer-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Cloud Engineer.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Cloud Engineer."
        ],
        "resources": [
          {
            "name": "Intermediate Cloud Engineer Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "cloud-engineer-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Cloud Engineer applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Cloud Engineer."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Cloud Engineer",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Cloud Engineer important for tech placement interviews?",
        "answer": "Proficiency in Cloud Engineer demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Cloud Engineer concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Cloud Engineer roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "ai-engineer": {
    "title": "AI Engineer",
    "subtitle": "Build LLM applications, RAG pipelines, Vector Databases, Fine-Tuning, LangChain/LlamaIndex, and Neural Networks.",
    "shortExplanation": "AI Engineer provides the step-by-step technical mastery path to become proficient in ai engineer.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of AI Engineer",
      "Apply best practices and industry patterns for AI Engineer",
      "Build real-world production projects using AI Engineer",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "ai-engineer-1",
        "title": "Phase 1: Core Fundamentals of AI Engineer",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of AI Engineer syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in AI Engineer is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using AI Engineer."
        ],
        "resources": [
          {
            "name": "Official AI Engineer Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "ai-engineer-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for AI Engineer.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with AI Engineer."
        ],
        "resources": [
          {
            "name": "Intermediate AI Engineer Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "ai-engineer-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy AI Engineer applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using AI Engineer."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for AI Engineer",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is AI Engineer important for tech placement interviews?",
        "answer": "Proficiency in AI Engineer demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test AI Engineer concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the AI Engineer roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "ai-data-scientist": {
    "title": "AI Data Scientist",
    "subtitle": "Master Python, Pandas, NumPy, Machine Learning algorithms, Deep Learning with PyTorch/TensorFlow, and Feature Engineering.",
    "shortExplanation": "AI Data Scientist provides the step-by-step technical mastery path to become proficient in ai data scientist.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of AI Data Scientist",
      "Apply best practices and industry patterns for AI Data Scientist",
      "Build real-world production projects using AI Data Scientist",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "ai-data-scientist-1",
        "title": "Phase 1: Core Fundamentals of AI Data Scientist",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of AI Data Scientist syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in AI Data Scientist is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using AI Data Scientist."
        ],
        "resources": [
          {
            "name": "Official AI Data Scientist Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "ai-data-scientist-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for AI Data Scientist.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with AI Data Scientist."
        ],
        "resources": [
          {
            "name": "Intermediate AI Data Scientist Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "ai-data-scientist-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy AI Data Scientist applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using AI Data Scientist."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for AI Data Scientist",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is AI Data Scientist important for tech placement interviews?",
        "answer": "Proficiency in AI Data Scientist demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test AI Data Scientist concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the AI Data Scientist roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "mlops-engineer": {
    "title": "MLOps Engineer",
    "subtitle": "Productionize AI/ML models with MLflow, Kubeflow, Model Registry, Feature Stores, Data Drift Monitoring, and CI/CD pipelines.",
    "shortExplanation": "MLOps Engineer provides the step-by-step technical mastery path to become proficient in mlops engineer.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of MLOps Engineer",
      "Apply best practices and industry patterns for MLOps Engineer",
      "Build real-world production projects using MLOps Engineer",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "mlops-engineer-1",
        "title": "Phase 1: Core Fundamentals of MLOps Engineer",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of MLOps Engineer syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in MLOps Engineer is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using MLOps Engineer."
        ],
        "resources": [
          {
            "name": "Official MLOps Engineer Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "mlops-engineer-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for MLOps Engineer.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with MLOps Engineer."
        ],
        "resources": [
          {
            "name": "Intermediate MLOps Engineer Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "mlops-engineer-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy MLOps Engineer applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using MLOps Engineer."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for MLOps Engineer",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is MLOps Engineer important for tech placement interviews?",
        "answer": "Proficiency in MLOps Engineer demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test MLOps Engineer concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the MLOps Engineer roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "data-analyst": {
    "title": "Data Analyst",
    "subtitle": "Master SQL querying, Python for data analysis, Pandas, Excel, Tableau / PowerBI dashboards, and A/B Testing.",
    "shortExplanation": "Data Analyst provides the step-by-step technical mastery path to become proficient in data analyst.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Data Analyst",
      "Apply best practices and industry patterns for Data Analyst",
      "Build real-world production projects using Data Analyst",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "data-analyst-1",
        "title": "Phase 1: Core Fundamentals of Data Analyst",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Data Analyst syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Data Analyst is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Data Analyst."
        ],
        "resources": [
          {
            "name": "Official Data Analyst Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "data-analyst-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Data Analyst.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Data Analyst."
        ],
        "resources": [
          {
            "name": "Intermediate Data Analyst Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "data-analyst-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Data Analyst applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Data Analyst."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Data Analyst",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Data Analyst important for tech placement interviews?",
        "answer": "Proficiency in Data Analyst demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Data Analyst concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Data Analyst roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "software-architect": {
    "title": "Software Architect",
    "subtitle": "Design distributed enterprise systems, domain-driven design (DDD), event-driven architectures, scalability, and system security.",
    "shortExplanation": "Software Architect provides the step-by-step technical mastery path to become proficient in software architect.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Software Architect",
      "Apply best practices and industry patterns for Software Architect",
      "Build real-world production projects using Software Architect",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "software-architect-1",
        "title": "Phase 1: Core Fundamentals of Software Architect",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Software Architect syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Software Architect is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Software Architect."
        ],
        "resources": [
          {
            "name": "Official Software Architect Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "software-architect-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Software Architect.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Software Architect."
        ],
        "resources": [
          {
            "name": "Intermediate Software Architect Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "software-architect-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Software Architect applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Software Architect."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Software Architect",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Software Architect important for tech placement interviews?",
        "answer": "Proficiency in Software Architect demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Software Architect concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Software Architect roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "software-testing-automation": {
    "title": "Software Testing & Automation",
    "subtitle": "Master Unit Testing, Integration Testing, Selenium, Playwright, Cypress, API testing with Postman, and CI Test Automation.",
    "shortExplanation": "Software Testing & Automation provides the step-by-step technical mastery path to become proficient in software testing & automation.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Software Testing & Automation",
      "Apply best practices and industry patterns for Software Testing & Automation",
      "Build real-world production projects using Software Testing & Automation",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "software-testing-automation-1",
        "title": "Phase 1: Core Fundamentals of Software Testing & Automation",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Software Testing & Automation syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Software Testing & Automation is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Software Testing & Automation."
        ],
        "resources": [
          {
            "name": "Official Software Testing & Automation Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "software-testing-automation-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Software Testing & Automation.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Software Testing & Automation."
        ],
        "resources": [
          {
            "name": "Intermediate Software Testing & Automation Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "software-testing-automation-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Software Testing & Automation applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Software Testing & Automation."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Software Testing & Automation",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Software Testing & Automation important for tech placement interviews?",
        "answer": "Proficiency in Software Testing & Automation demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Software Testing & Automation concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Software Testing & Automation roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "cyber-security": {
    "title": "Cyber Security Engineer",
    "subtitle": "Master Network Security, Cryptography, Penetration Testing, OWASP Top 10, IAM, SIEM Log Analysis, and Cloud Security.",
    "shortExplanation": "Cyber Security Engineer provides the step-by-step technical mastery path to become proficient in cyber security engineer.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Cyber Security Engineer",
      "Apply best practices and industry patterns for Cyber Security Engineer",
      "Build real-world production projects using Cyber Security Engineer",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "cyber-security-1",
        "title": "Phase 1: Core Fundamentals of Cyber Security Engineer",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Cyber Security Engineer syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Cyber Security Engineer is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Cyber Security Engineer."
        ],
        "resources": [
          {
            "name": "Official Cyber Security Engineer Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "cyber-security-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Cyber Security Engineer.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Cyber Security Engineer."
        ],
        "resources": [
          {
            "name": "Intermediate Cyber Security Engineer Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "cyber-security-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Cyber Security Engineer applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Cyber Security Engineer."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Cyber Security Engineer",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Cyber Security Engineer important for tech placement interviews?",
        "answer": "Proficiency in Cyber Security Engineer demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Cyber Security Engineer concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Cyber Security Engineer roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "computer-science": {
    "title": "Computer Science Fundamentals",
    "subtitle": "Master Data Structures, Algorithms, Operating Systems, Computer Networks, DBMS, Object-Oriented Programming, and System Design.",
    "shortExplanation": "Computer Science Fundamentals provides the step-by-step technical mastery path to become proficient in computer science fundamentals.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Computer Science Fundamentals",
      "Apply best practices and industry patterns for Computer Science Fundamentals",
      "Build real-world production projects using Computer Science Fundamentals",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "computer-science-1",
        "title": "Phase 1: Core Fundamentals of Computer Science Fundamentals",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Computer Science Fundamentals syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Computer Science Fundamentals is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Computer Science Fundamentals."
        ],
        "resources": [
          {
            "name": "Official Computer Science Fundamentals Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "computer-science-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Computer Science Fundamentals.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Computer Science Fundamentals."
        ],
        "resources": [
          {
            "name": "Intermediate Computer Science Fundamentals Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "computer-science-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Computer Science Fundamentals applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Computer Science Fundamentals."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Computer Science Fundamentals",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Computer Science Fundamentals important for tech placement interviews?",
        "answer": "Proficiency in Computer Science Fundamentals demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Computer Science Fundamentals concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Computer Science Fundamentals roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "data-structures-algorithms": {
    "title": "Data Structures & Algorithms",
    "subtitle": "Master Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Dynamic Programming, Greedy Algorithms, and Complexity Analysis.",
    "shortExplanation": "Data Structures & Algorithms provides the step-by-step technical mastery path to become proficient in data structures & algorithms.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Data Structures & Algorithms",
      "Apply best practices and industry patterns for Data Structures & Algorithms",
      "Build real-world production projects using Data Structures & Algorithms",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "data-structures-algorithms-1",
        "title": "Phase 1: Core Fundamentals of Data Structures & Algorithms",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Data Structures & Algorithms syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Data Structures & Algorithms is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Data Structures & Algorithms."
        ],
        "resources": [
          {
            "name": "Official Data Structures & Algorithms Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "data-structures-algorithms-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Data Structures & Algorithms.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Data Structures & Algorithms."
        ],
        "resources": [
          {
            "name": "Intermediate Data Structures & Algorithms Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "data-structures-algorithms-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Data Structures & Algorithms applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Data Structures & Algorithms."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Data Structures & Algorithms",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Data Structures & Algorithms important for tech placement interviews?",
        "answer": "Proficiency in Data Structures & Algorithms demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Data Structures & Algorithms concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Data Structures & Algorithms roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "sql": {
    "title": "SQL & Database Mastery",
    "subtitle": "Master relational database design, complex joins, subqueries, indexing, query optimization, transactions (ACID), and window functions.",
    "shortExplanation": "SQL & Database Mastery provides the step-by-step technical mastery path to become proficient in sql & database mastery.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of SQL & Database Mastery",
      "Apply best practices and industry patterns for SQL & Database Mastery",
      "Build real-world production projects using SQL & Database Mastery",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "sql-1",
        "title": "Phase 1: Core Fundamentals of SQL & Database Mastery",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of SQL & Database Mastery syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in SQL & Database Mastery is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using SQL & Database Mastery."
        ],
        "resources": [
          {
            "name": "Official SQL & Database Mastery Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "sql-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for SQL & Database Mastery.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with SQL & Database Mastery."
        ],
        "resources": [
          {
            "name": "Intermediate SQL & Database Mastery Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "sql-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy SQL & Database Mastery applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using SQL & Database Mastery."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for SQL & Database Mastery",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is SQL & Database Mastery important for tech placement interviews?",
        "answer": "Proficiency in SQL & Database Mastery demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test SQL & Database Mastery concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the SQL & Database Mastery roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "git-github": {
    "title": "Git & GitHub Mastery",
    "subtitle": "Master version control, branching strategies, rebasing, pull request workflows, merge conflict resolution, and GitHub Actions.",
    "shortExplanation": "Git & GitHub Mastery provides the step-by-step technical mastery path to become proficient in git & github mastery.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Git & GitHub Mastery",
      "Apply best practices and industry patterns for Git & GitHub Mastery",
      "Build real-world production projects using Git & GitHub Mastery",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "git-github-1",
        "title": "Phase 1: Core Fundamentals of Git & GitHub Mastery",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Git & GitHub Mastery syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Git & GitHub Mastery is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Git & GitHub Mastery."
        ],
        "resources": [
          {
            "name": "Official Git & GitHub Mastery Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "git-github-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Git & GitHub Mastery.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Git & GitHub Mastery."
        ],
        "resources": [
          {
            "name": "Intermediate Git & GitHub Mastery Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "git-github-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Git & GitHub Mastery applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Git & GitHub Mastery."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Git & GitHub Mastery",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Git & GitHub Mastery important for tech placement interviews?",
        "answer": "Proficiency in Git & GitHub Mastery demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Git & GitHub Mastery concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Git & GitHub Mastery roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "linux": {
    "title": "Linux System Administration",
    "subtitle": "Master Linux CLI commands, bash shell scripting, file permissions, process management, networking tools, and system security.",
    "shortExplanation": "Linux System Administration provides the step-by-step technical mastery path to become proficient in linux system administration.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Linux System Administration",
      "Apply best practices and industry patterns for Linux System Administration",
      "Build real-world production projects using Linux System Administration",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "linux-1",
        "title": "Phase 1: Core Fundamentals of Linux System Administration",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Linux System Administration syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Linux System Administration is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Linux System Administration."
        ],
        "resources": [
          {
            "name": "Official Linux System Administration Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "linux-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Linux System Administration.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Linux System Administration."
        ],
        "resources": [
          {
            "name": "Intermediate Linux System Administration Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "linux-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Linux System Administration applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Linux System Administration."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Linux System Administration",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Linux System Administration important for tech placement interviews?",
        "answer": "Proficiency in Linux System Administration demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Linux System Administration concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Linux System Administration roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "java": {
    "title": "Java Programming",
    "subtitle": "Master Java 17+ core syntax, OOP principles, Collections API, Generics, Exception Handling, Streams, and Multithreading.",
    "shortExplanation": "Java Programming provides the step-by-step technical mastery path to become proficient in java programming.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Java Programming",
      "Apply best practices and industry patterns for Java Programming",
      "Build real-world production projects using Java Programming",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "java-1",
        "title": "Phase 1: Core Fundamentals of Java Programming",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Java Programming syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Java Programming is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Java Programming."
        ],
        "resources": [
          {
            "name": "Official Java Programming Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "java-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Java Programming.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Java Programming."
        ],
        "resources": [
          {
            "name": "Intermediate Java Programming Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "java-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Java Programming applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Java Programming."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Java Programming",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Java Programming important for tech placement interviews?",
        "answer": "Proficiency in Java Programming demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Java Programming concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Java Programming roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "javascript": {
    "title": "JavaScript Mastery",
    "subtitle": "Master ES6+ modern JavaScript, Event Loop, Promises & Async/Await, Closures, DOM Manipulation, and Modules.",
    "shortExplanation": "JavaScript Mastery provides the step-by-step technical mastery path to become proficient in javascript mastery.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of JavaScript Mastery",
      "Apply best practices and industry patterns for JavaScript Mastery",
      "Build real-world production projects using JavaScript Mastery",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "javascript-1",
        "title": "Phase 1: Core Fundamentals of JavaScript Mastery",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of JavaScript Mastery syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in JavaScript Mastery is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using JavaScript Mastery."
        ],
        "resources": [
          {
            "name": "Official JavaScript Mastery Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "javascript-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for JavaScript Mastery.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with JavaScript Mastery."
        ],
        "resources": [
          {
            "name": "Intermediate JavaScript Mastery Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "javascript-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy JavaScript Mastery applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using JavaScript Mastery."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for JavaScript Mastery",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is JavaScript Mastery important for tech placement interviews?",
        "answer": "Proficiency in JavaScript Mastery demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test JavaScript Mastery concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the JavaScript Mastery roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "python": {
    "title": "Python Programming",
    "subtitle": "Master Python core syntax, OOP, List Comprehensions, Decorators, Generators, File I/O, and Data Processing libraries.",
    "shortExplanation": "Python Programming provides the step-by-step technical mastery path to become proficient in python programming.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Python Programming",
      "Apply best practices and industry patterns for Python Programming",
      "Build real-world production projects using Python Programming",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "python-1",
        "title": "Phase 1: Core Fundamentals of Python Programming",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Python Programming syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Python Programming is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Python Programming."
        ],
        "resources": [
          {
            "name": "Official Python Programming Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "python-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Python Programming.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Python Programming."
        ],
        "resources": [
          {
            "name": "Intermediate Python Programming Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "python-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Python Programming applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Python Programming."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Python Programming",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Python Programming important for tech placement interviews?",
        "answer": "Proficiency in Python Programming demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Python Programming concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Python Programming roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "typescript": {
    "title": "TypeScript Mastery",
    "subtitle": "Master static typing, Interfaces, Generics, Union/Intersection types, Type Guards, Decorators, and TS with React/Node.",
    "shortExplanation": "TypeScript Mastery provides the step-by-step technical mastery path to become proficient in typescript mastery.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of TypeScript Mastery",
      "Apply best practices and industry patterns for TypeScript Mastery",
      "Build real-world production projects using TypeScript Mastery",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "typescript-1",
        "title": "Phase 1: Core Fundamentals of TypeScript Mastery",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of TypeScript Mastery syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in TypeScript Mastery is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using TypeScript Mastery."
        ],
        "resources": [
          {
            "name": "Official TypeScript Mastery Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "typescript-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for TypeScript Mastery.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with TypeScript Mastery."
        ],
        "resources": [
          {
            "name": "Intermediate TypeScript Mastery Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "typescript-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy TypeScript Mastery applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using TypeScript Mastery."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for TypeScript Mastery",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is TypeScript Mastery important for tech placement interviews?",
        "answer": "Proficiency in TypeScript Mastery demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test TypeScript Mastery concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the TypeScript Mastery roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "nodejs": {
    "title": "Node.js & Express",
    "subtitle": "Master asynchronous event-driven JavaScript backend runtime, Express.js controllers, middleware, Streams, and NPM.",
    "shortExplanation": "Node.js & Express provides the step-by-step technical mastery path to become proficient in node.js & express.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Node.js & Express",
      "Apply best practices and industry patterns for Node.js & Express",
      "Build real-world production projects using Node.js & Express",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "nodejs-1",
        "title": "Phase 1: Core Fundamentals of Node.js & Express",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Node.js & Express syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Node.js & Express is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Node.js & Express."
        ],
        "resources": [
          {
            "name": "Official Node.js & Express Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "nodejs-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Node.js & Express.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Node.js & Express."
        ],
        "resources": [
          {
            "name": "Intermediate Node.js & Express Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "nodejs-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Node.js & Express applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Node.js & Express."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Node.js & Express",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Node.js & Express important for tech placement interviews?",
        "answer": "Proficiency in Node.js & Express demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Node.js & Express concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Node.js & Express roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "aspnet-core": {
    "title": "ASP.NET Core Web API",
    "subtitle": "Master C#, ASP.NET Core MVC & Web APIs, Entity Framework Core, Dependency Injection, Middleware, and Azure deployment.",
    "shortExplanation": "ASP.NET Core Web API provides the step-by-step technical mastery path to become proficient in asp.net core web api.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of ASP.NET Core Web API",
      "Apply best practices and industry patterns for ASP.NET Core Web API",
      "Build real-world production projects using ASP.NET Core Web API",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "aspnet-core-1",
        "title": "Phase 1: Core Fundamentals of ASP.NET Core Web API",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of ASP.NET Core Web API syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in ASP.NET Core Web API is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using ASP.NET Core Web API."
        ],
        "resources": [
          {
            "name": "Official ASP.NET Core Web API Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "aspnet-core-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for ASP.NET Core Web API.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with ASP.NET Core Web API."
        ],
        "resources": [
          {
            "name": "Intermediate ASP.NET Core Web API Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "aspnet-core-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy ASP.NET Core Web API applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using ASP.NET Core Web API."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for ASP.NET Core Web API",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is ASP.NET Core Web API important for tech placement interviews?",
        "answer": "Proficiency in ASP.NET Core Web API demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test ASP.NET Core Web API concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the ASP.NET Core Web API roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "spring-boot": {
    "title": "Spring Boot Framework",
    "subtitle": "Master Spring Core IoC, Spring Boot REST controllers, Spring Data JPA, Spring Security JWT, Maven/Gradle, and Microservices.",
    "shortExplanation": "Spring Boot Framework provides the step-by-step technical mastery path to become proficient in spring boot framework.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Spring Boot Framework",
      "Apply best practices and industry patterns for Spring Boot Framework",
      "Build real-world production projects using Spring Boot Framework",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "spring-boot-1",
        "title": "Phase 1: Core Fundamentals of Spring Boot Framework",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Spring Boot Framework syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Spring Boot Framework is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Spring Boot Framework."
        ],
        "resources": [
          {
            "name": "Official Spring Boot Framework Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "spring-boot-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Spring Boot Framework.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Spring Boot Framework."
        ],
        "resources": [
          {
            "name": "Intermediate Spring Boot Framework Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "spring-boot-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Spring Boot Framework applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Spring Boot Framework."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Spring Boot Framework",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Spring Boot Framework important for tech placement interviews?",
        "answer": "Proficiency in Spring Boot Framework demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Spring Boot Framework concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Spring Boot Framework roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "api-design": {
    "title": "API Design & Architecture",
    "subtitle": "Master RESTful API design principles, OpenAPI/Swagger specifications, Versioning, Authentication, Rate Limiting, and Error Handling.",
    "shortExplanation": "API Design & Architecture provides the step-by-step technical mastery path to become proficient in api design & architecture.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of API Design & Architecture",
      "Apply best practices and industry patterns for API Design & Architecture",
      "Build real-world production projects using API Design & Architecture",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "api-design-1",
        "title": "Phase 1: Core Fundamentals of API Design & Architecture",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of API Design & Architecture syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in API Design & Architecture is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using API Design & Architecture."
        ],
        "resources": [
          {
            "name": "Official API Design & Architecture Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "api-design-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for API Design & Architecture.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with API Design & Architecture."
        ],
        "resources": [
          {
            "name": "Intermediate API Design & Architecture Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "api-design-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy API Design & Architecture applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using API Design & Architecture."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for API Design & Architecture",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is API Design & Architecture important for tech placement interviews?",
        "answer": "Proficiency in API Design & Architecture demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test API Design & Architecture concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the API Design & Architecture roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "graphql": {
    "title": "GraphQL API Development",
    "subtitle": "Master GraphQL Schema Definition, Queries, Mutations, Subscriptions, Resolvers, Apollo Server/Client, and DataLoader optimization.",
    "shortExplanation": "GraphQL API Development provides the step-by-step technical mastery path to become proficient in graphql api development.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of GraphQL API Development",
      "Apply best practices and industry patterns for GraphQL API Development",
      "Build real-world production projects using GraphQL API Development",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "graphql-1",
        "title": "Phase 1: Core Fundamentals of GraphQL API Development",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of GraphQL API Development syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in GraphQL API Development is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using GraphQL API Development."
        ],
        "resources": [
          {
            "name": "Official GraphQL API Development Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "graphql-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for GraphQL API Development.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with GraphQL API Development."
        ],
        "resources": [
          {
            "name": "Intermediate GraphQL API Development Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "graphql-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy GraphQL API Development applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using GraphQL API Development."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for GraphQL API Development",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is GraphQL API Development important for tech placement interviews?",
        "answer": "Proficiency in GraphQL API Development demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test GraphQL API Development concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the GraphQL API Development roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "mongodb": {
    "title": "MongoDB NoSQL Database",
    "subtitle": "Master Document database modeling, Aggregation Framework pipelines, Indexing strategies, Sharding, and Mongoose ORM.",
    "shortExplanation": "MongoDB NoSQL Database provides the step-by-step technical mastery path to become proficient in mongodb nosql database.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of MongoDB NoSQL Database",
      "Apply best practices and industry patterns for MongoDB NoSQL Database",
      "Build real-world production projects using MongoDB NoSQL Database",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "mongodb-1",
        "title": "Phase 1: Core Fundamentals of MongoDB NoSQL Database",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of MongoDB NoSQL Database syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in MongoDB NoSQL Database is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using MongoDB NoSQL Database."
        ],
        "resources": [
          {
            "name": "Official MongoDB NoSQL Database Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "mongodb-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for MongoDB NoSQL Database.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with MongoDB NoSQL Database."
        ],
        "resources": [
          {
            "name": "Intermediate MongoDB NoSQL Database Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "mongodb-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy MongoDB NoSQL Database applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using MongoDB NoSQL Database."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for MongoDB NoSQL Database",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is MongoDB NoSQL Database important for tech placement interviews?",
        "answer": "Proficiency in MongoDB NoSQL Database demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test MongoDB NoSQL Database concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the MongoDB NoSQL Database roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "redis": {
    "title": "Redis In-Memory Data Store",
    "subtitle": "Master Redis data structures (Strings, Hashes, Lists, Sets, Sorted Sets), Caching strategies (Cache-Aside, Write-Through), and Pub/Sub.",
    "shortExplanation": "Redis In-Memory Data Store provides the step-by-step technical mastery path to become proficient in redis in-memory data store.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Redis In-Memory Data Store",
      "Apply best practices and industry patterns for Redis In-Memory Data Store",
      "Build real-world production projects using Redis In-Memory Data Store",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "redis-1",
        "title": "Phase 1: Core Fundamentals of Redis In-Memory Data Store",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Redis In-Memory Data Store syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Redis In-Memory Data Store is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Redis In-Memory Data Store."
        ],
        "resources": [
          {
            "name": "Official Redis In-Memory Data Store Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "redis-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Redis In-Memory Data Store.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Redis In-Memory Data Store."
        ],
        "resources": [
          {
            "name": "Intermediate Redis In-Memory Data Store Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "redis-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Redis In-Memory Data Store applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Redis In-Memory Data Store."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Redis In-Memory Data Store",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Redis In-Memory Data Store important for tech placement interviews?",
        "answer": "Proficiency in Redis In-Memory Data Store demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Redis In-Memory Data Store concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Redis In-Memory Data Store roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "html": {
    "title": "HTML5 Modern Web Markup",
    "subtitle": "Master semantic HTML tags, Web Accessibility (ARIA), Form validation, SEO meta tags, OpenGraph, and Responsive Media.",
    "shortExplanation": "HTML5 Modern Web Markup provides the step-by-step technical mastery path to become proficient in html5 modern web markup.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of HTML5 Modern Web Markup",
      "Apply best practices and industry patterns for HTML5 Modern Web Markup",
      "Build real-world production projects using HTML5 Modern Web Markup",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "html-1",
        "title": "Phase 1: Core Fundamentals of HTML5 Modern Web Markup",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of HTML5 Modern Web Markup syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in HTML5 Modern Web Markup is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using HTML5 Modern Web Markup."
        ],
        "resources": [
          {
            "name": "Official HTML5 Modern Web Markup Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "html-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for HTML5 Modern Web Markup.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with HTML5 Modern Web Markup."
        ],
        "resources": [
          {
            "name": "Intermediate HTML5 Modern Web Markup Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "html-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy HTML5 Modern Web Markup applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using HTML5 Modern Web Markup."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for HTML5 Modern Web Markup",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is HTML5 Modern Web Markup important for tech placement interviews?",
        "answer": "Proficiency in HTML5 Modern Web Markup demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test HTML5 Modern Web Markup concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the HTML5 Modern Web Markup roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "css": {
    "title": "CSS3 & Modern Styling",
    "subtitle": "Master Flexbox, CSS Grid layouts, Responsive Media Queries, Animations, CSS Custom Properties, and Utility-first CSS.",
    "shortExplanation": "CSS3 & Modern Styling provides the step-by-step technical mastery path to become proficient in css3 & modern styling.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of CSS3 & Modern Styling",
      "Apply best practices and industry patterns for CSS3 & Modern Styling",
      "Build real-world production projects using CSS3 & Modern Styling",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "css-1",
        "title": "Phase 1: Core Fundamentals of CSS3 & Modern Styling",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of CSS3 & Modern Styling syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in CSS3 & Modern Styling is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using CSS3 & Modern Styling."
        ],
        "resources": [
          {
            "name": "Official CSS3 & Modern Styling Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "css-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for CSS3 & Modern Styling.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with CSS3 & Modern Styling."
        ],
        "resources": [
          {
            "name": "Intermediate CSS3 & Modern Styling Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "css-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy CSS3 & Modern Styling applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using CSS3 & Modern Styling."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for CSS3 & Modern Styling",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is CSS3 & Modern Styling important for tech placement interviews?",
        "answer": "Proficiency in CSS3 & Modern Styling demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test CSS3 & Modern Styling concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the CSS3 & Modern Styling roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "react": {
    "title": "React.js Framework",
    "subtitle": "Master JSX, React Hooks (useState, useEffect, useMemo), Context API, Component Lifecycle, State Management, and Next.js.",
    "shortExplanation": "React.js Framework provides the step-by-step technical mastery path to become proficient in react.js framework.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of React.js Framework",
      "Apply best practices and industry patterns for React.js Framework",
      "Build real-world production projects using React.js Framework",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "react-1",
        "title": "Phase 1: Core Fundamentals of React.js Framework",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of React.js Framework syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in React.js Framework is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using React.js Framework."
        ],
        "resources": [
          {
            "name": "Official React.js Framework Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "react-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for React.js Framework.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with React.js Framework."
        ],
        "resources": [
          {
            "name": "Intermediate React.js Framework Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "react-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy React.js Framework applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using React.js Framework."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for React.js Framework",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is React.js Framework important for tech placement interviews?",
        "answer": "Proficiency in React.js Framework demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test React.js Framework concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the React.js Framework roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "angular": {
    "title": "Angular Framework",
    "subtitle": "Master TypeScript Angular framework, Components, Services, RxJS Observables, Dependency Injection, Routing, and NgRx.",
    "shortExplanation": "Angular Framework provides the step-by-step technical mastery path to become proficient in angular framework.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Angular Framework",
      "Apply best practices and industry patterns for Angular Framework",
      "Build real-world production projects using Angular Framework",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "angular-1",
        "title": "Phase 1: Core Fundamentals of Angular Framework",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Angular Framework syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Angular Framework is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Angular Framework."
        ],
        "resources": [
          {
            "name": "Official Angular Framework Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "angular-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Angular Framework.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Angular Framework."
        ],
        "resources": [
          {
            "name": "Intermediate Angular Framework Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "angular-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Angular Framework applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Angular Framework."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Angular Framework",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Angular Framework important for tech placement interviews?",
        "answer": "Proficiency in Angular Framework demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Angular Framework concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Angular Framework roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "design-systems": {
    "title": "Design Systems & UI Engineering",
    "subtitle": "Master Component Library design, Tokens (Colors, Typography, Spacing), Accessibility standards, Storybook, and Figma handoff.",
    "shortExplanation": "Design Systems & UI Engineering provides the step-by-step technical mastery path to become proficient in design systems & ui engineering.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Design Systems & UI Engineering",
      "Apply best practices and industry patterns for Design Systems & UI Engineering",
      "Build real-world production projects using Design Systems & UI Engineering",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "design-systems-1",
        "title": "Phase 1: Core Fundamentals of Design Systems & UI Engineering",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Design Systems & UI Engineering syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Design Systems & UI Engineering is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Design Systems & UI Engineering."
        ],
        "resources": [
          {
            "name": "Official Design Systems & UI Engineering Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "design-systems-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Design Systems & UI Engineering.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Design Systems & UI Engineering."
        ],
        "resources": [
          {
            "name": "Intermediate Design Systems & UI Engineering Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "design-systems-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Design Systems & UI Engineering applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Design Systems & UI Engineering."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Design Systems & UI Engineering",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Design Systems & UI Engineering important for tech placement interviews?",
        "answer": "Proficiency in Design Systems & UI Engineering demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Design Systems & UI Engineering concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Design Systems & UI Engineering roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "system-design": {
    "title": "System Design & Architecture",
    "subtitle": "Master Scalability, Load Balancing, Caching, Sharding, CAP Theorem, Microservices, Message Queues, and Distributed Systems.",
    "shortExplanation": "System Design & Architecture provides the step-by-step technical mastery path to become proficient in system design & architecture.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of System Design & Architecture",
      "Apply best practices and industry patterns for System Design & Architecture",
      "Build real-world production projects using System Design & Architecture",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "system-design-1",
        "title": "Phase 1: Core Fundamentals of System Design & Architecture",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of System Design & Architecture syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in System Design & Architecture is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using System Design & Architecture."
        ],
        "resources": [
          {
            "name": "Official System Design & Architecture Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "system-design-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for System Design & Architecture.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with System Design & Architecture."
        ],
        "resources": [
          {
            "name": "Intermediate System Design & Architecture Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "system-design-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy System Design & Architecture applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using System Design & Architecture."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for System Design & Architecture",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is System Design & Architecture important for tech placement interviews?",
        "answer": "Proficiency in System Design & Architecture demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test System Design & Architecture concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the System Design & Architecture roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "aws": {
    "title": "Amazon Web Services (AWS)",
    "subtitle": "Master EC2, S3, RDS, DynamoDB, Lambda Serverless, IAM roles, VPC networking, CloudFront CDN, and CloudWatch monitoring.",
    "shortExplanation": "Amazon Web Services (AWS) provides the step-by-step technical mastery path to become proficient in amazon web services (aws).",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Amazon Web Services (AWS)",
      "Apply best practices and industry patterns for Amazon Web Services (AWS)",
      "Build real-world production projects using Amazon Web Services (AWS)",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "aws-1",
        "title": "Phase 1: Core Fundamentals of Amazon Web Services (AWS)",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Amazon Web Services (AWS) syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Amazon Web Services (AWS) is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Amazon Web Services (AWS)."
        ],
        "resources": [
          {
            "name": "Official Amazon Web Services (AWS) Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "aws-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Amazon Web Services (AWS).",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Amazon Web Services (AWS)."
        ],
        "resources": [
          {
            "name": "Intermediate Amazon Web Services (AWS) Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "aws-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Amazon Web Services (AWS) applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Amazon Web Services (AWS)."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Amazon Web Services (AWS)",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Amazon Web Services (AWS) important for tech placement interviews?",
        "answer": "Proficiency in Amazon Web Services (AWS) demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Amazon Web Services (AWS) concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Amazon Web Services (AWS) roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "docker": {
    "title": "Docker Containerization",
    "subtitle": "Master Dockerfiles, Container Images, Docker Compose multi-container setups, Volumes, Networking, and Image optimization.",
    "shortExplanation": "Docker Containerization provides the step-by-step technical mastery path to become proficient in docker containerization.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Docker Containerization",
      "Apply best practices and industry patterns for Docker Containerization",
      "Build real-world production projects using Docker Containerization",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "docker-1",
        "title": "Phase 1: Core Fundamentals of Docker Containerization",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Docker Containerization syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Docker Containerization is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Docker Containerization."
        ],
        "resources": [
          {
            "name": "Official Docker Containerization Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "docker-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Docker Containerization.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Docker Containerization."
        ],
        "resources": [
          {
            "name": "Intermediate Docker Containerization Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "docker-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Docker Containerization applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Docker Containerization."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Docker Containerization",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Docker Containerization important for tech placement interviews?",
        "answer": "Proficiency in Docker Containerization demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Docker Containerization concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Docker Containerization roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "kubernetes": {
    "title": "Kubernetes Orchestration",
    "subtitle": "Master Pods, Deployments, Services, Ingress Controllers, ConfigMaps, Secrets, Helm Charts, and Auto-scaling (HPA).",
    "shortExplanation": "Kubernetes Orchestration provides the step-by-step technical mastery path to become proficient in kubernetes orchestration.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Kubernetes Orchestration",
      "Apply best practices and industry patterns for Kubernetes Orchestration",
      "Build real-world production projects using Kubernetes Orchestration",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "kubernetes-1",
        "title": "Phase 1: Core Fundamentals of Kubernetes Orchestration",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Kubernetes Orchestration syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Kubernetes Orchestration is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Kubernetes Orchestration."
        ],
        "resources": [
          {
            "name": "Official Kubernetes Orchestration Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "kubernetes-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Kubernetes Orchestration.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Kubernetes Orchestration."
        ],
        "resources": [
          {
            "name": "Intermediate Kubernetes Orchestration Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "kubernetes-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Kubernetes Orchestration applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Kubernetes Orchestration."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Kubernetes Orchestration",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Kubernetes Orchestration important for tech placement interviews?",
        "answer": "Proficiency in Kubernetes Orchestration demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Kubernetes Orchestration concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Kubernetes Orchestration roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  },
  "terraform": {
    "title": "Terraform Infrastructure as Code",
    "subtitle": "Master HCL syntax, Terraform Providers, Resources, Modules, State management, Workspaces, and Automated Infrastructure Provisioning.",
    "shortExplanation": "Terraform Infrastructure as Code provides the step-by-step technical mastery path to become proficient in terraform infrastructure as code.",
    "whatThisRoleDoes": [
      "Master core concepts and fundamental principles of Terraform Infrastructure as Code",
      "Apply best practices and industry patterns for Terraform Infrastructure as Code",
      "Build real-world production projects using Terraform Infrastructure as Code",
      "Write clean, maintainable, and high-performance code",
      "Prepare for technical interviews and coding assessments"
    ],
    "skillsRequired": [
      {
        "category": "Fundamentals",
        "items": [
          "Core Concepts",
          "Syntax & Syntax Patterns",
          "Best Practices"
        ]
      },
      {
        "category": "Core Architecture",
        "items": [
          "Design Patterns",
          "Data Structures",
          "Performance Optimization"
        ]
      },
      {
        "category": "Tooling & Ecosystem",
        "items": [
          "CLI & Build Tools",
          "Testing & Debugging",
          "CI/CD Integration"
        ]
      }
    ],
    "phases": [
      {
        "phaseNum": 1,
        "title": "Foundations & Core Syntax",
        "color": "#A3E635",
        "topics": [
          "Core Mechanics",
          "Syntax Rules",
          "Basic Patterns",
          "Development Setup"
        ]
      },
      {
        "phaseNum": 2,
        "title": "Intermediate Architecture",
        "color": "#38BDF8",
        "topics": [
          "Data Handling",
          "Modular Design",
          "Error Handling",
          "Testing Basics"
        ]
      },
      {
        "phaseNum": 3,
        "title": "Advanced Mastery",
        "color": "#A855F7",
        "topics": [
          "Performance Tuning",
          "Concurrency / Async",
          "Security Practices",
          "Scalability"
        ]
      },
      {
        "phaseNum": 4,
        "title": "Production Deployment",
        "color": "#F97316",
        "topics": [
          "CI/CD Pipelines",
          "Monitoring & Logs",
          "Cloud Architecture",
          "Best Practices"
        ]
      }
    ],
    "journeyNodes": [
      {
        "id": "terraform-1",
        "title": "Phase 1: Core Fundamentals of Terraform Infrastructure as Code",
        "color": "#A3E635",
        "bgColor": "rgba(163, 230, 53, 0.04)",
        "borderColor": "rgba(163, 230, 53, 0.2)",
        "icon": "fa-solid fa-code",
        "tags": [
          "Fundamentals",
          "Core Syntax",
          "Setup",
          "Basic Operations"
        ],
        "description": "Build a strong foundational understanding of Terraform Infrastructure as Code syntax, environment setup, and fundamental concepts.",
        "whyImportant": [
          "A solid foundation in Terraform Infrastructure as Code is essential for writing error-free, maintainable code.",
          "Mastering core syntax speeds up development and improves problem-solving capabilities."
        ],
        "realProjects": [
          "Build starter projects and baseline applications using Terraform Infrastructure as Code."
        ],
        "resources": [
          {
            "name": "Official Terraform Infrastructure as Code Documentation",
            "type": "Docs",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Fundamental Practice Problem",
            "difficulty": "Easy",
            "slug": "two-sum"
          }
        ]
      },
      {
        "id": "terraform-2",
        "title": "Phase 2: Intermediate Concepts & Patterns",
        "color": "#38BDF8",
        "bgColor": "rgba(56, 189, 248, 0.04)",
        "borderColor": "rgba(56, 189, 248, 0.2)",
        "icon": "fa-solid fa-layer-group",
        "tags": [
          "Data Patterns",
          "Modules",
          "Error Handling",
          "Testing"
        ],
        "description": "Learn intermediate patterns, error handling, state/data management, and testing methodologies for Terraform Infrastructure as Code.",
        "whyImportant": [
          "Intermediate patterns allow you to construct clean, reusable software components.",
          "Proper error handling ensures system resilience and reliability under unexpected conditions."
        ],
        "realProjects": [
          "Develop full-featured modules and services with Terraform Infrastructure as Code."
        ],
        "resources": [
          {
            "name": "Intermediate Terraform Infrastructure as Code Deep Dive",
            "type": "Guide",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Intermediate System Challenge",
            "difficulty": "Medium",
            "slug": "group-anagrams"
          }
        ]
      },
      {
        "id": "terraform-3",
        "title": "Phase 3: Advanced Optimization & Production",
        "color": "#A855F7",
        "bgColor": "rgba(168, 85, 247, 0.04)",
        "borderColor": "rgba(168, 85, 247, 0.2)",
        "icon": "fa-solid fa-rocket",
        "tags": [
          "Performance",
          "Security",
          "Scale",
          "Deployment"
        ],
        "description": "Optimize performance, implement security standards, and deploy Terraform Infrastructure as Code applications to cloud infrastructure.",
        "whyImportant": [
          "Advanced optimization ensures your applications handle high user concurrency efficiently.",
          "Security best practices prevent critical vulnerabilities in enterprise environments."
        ],
        "realProjects": [
          "Deploy scalable, production-ready enterprise applications using Terraform Infrastructure as Code."
        ],
        "resources": [
          {
            "name": "Production Deployment Guide for Terraform Infrastructure as Code",
            "type": "Course",
            "url": "#"
          }
        ],
        "problems": [
          {
            "title": "Advanced Scalability Problem",
            "difficulty": "Hard",
            "slug": "lru-cache"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Why is Terraform Infrastructure as Code important for tech placement interviews?",
        "answer": "Proficiency in Terraform Infrastructure as Code demonstrates technical competence, logical problem-solving, and readiness for real-world software engineering roles.",
        "bullets": [
          "Top tech companies test Terraform Infrastructure as Code concepts during technical interview rounds",
          "Understanding core principles helps you design scalable, efficient software systems",
          "Having projects built with this technology makes your resume stand out to recruiters"
        ]
      },
      {
        "question": "How long does it take to complete the Terraform Infrastructure as Code roadmap?",
        "answer": "With consistent daily practice (1-2 hours a day), most students complete this roadmap in 2 to 4 months.",
        "bullets": [
          "Month 1: Focus on Core Fundamentals and syntax",
          "Month 2: Learn intermediate design patterns and testing",
          "Month 3-4: Build real-world portfolio projects and practice interview questions"
        ]
      }
    ]
  }
};
