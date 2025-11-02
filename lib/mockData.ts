// Mock data for Sangharsha application

export const mockJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp India',
    location: 'Bangalore, India',
    type: 'Full-time',
    experience: '3-5 years',
    salary: '₹15-25 LPA',
    platform: 'LinkedIn',
    matchPercentage: 92,
    postedDate: '2 days ago',
    description: 'We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building scalable web applications using React, Next.js, and modern frontend technologies.\n\nResponsibilities:\n• Develop user-facing features using React.js and Next.js\n• Build reusable components and front-end libraries\n• Optimize applications for maximum speed and scalability\n• Collaborate with backend developers and designers\n\nRequirements:\n• 3+ years of experience with React.js\n• Strong proficiency in JavaScript, HTML, CSS\n• Experience with Next.js, TypeScript\n• Knowledge of RESTful APIs\n• Good understanding of responsive design',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'REST API'],
    logo: '🚀'
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'Remote',
    type: 'Full-time',
    experience: '2-4 years',
    salary: '₹12-20 LPA',
    platform: 'Naukri',
    matchPercentage: 85,
    postedDate: '1 week ago',
    description: 'Join our fast-growing startup as a Full Stack Engineer. Work on cutting-edge technologies and build products that impact millions of users.\n\nWhat you\'ll do:\n• Design and develop full-stack web applications\n• Work with Node.js, React, and MongoDB\n• Participate in code reviews and technical discussions\n• Deploy and maintain applications on cloud platforms\n\nWhat we\'re looking for:\n• 2+ years of full-stack development experience\n• Proficiency in JavaScript/TypeScript\n• Experience with Node.js and Express\n• Knowledge of MongoDB or PostgreSQL\n• Understanding of cloud services (AWS/GCP)',
    skills: ['Node.js', 'React', 'MongoDB', 'AWS', 'Express'],
    logo: '⚡'
  },
  {
    id: '3',
    title: 'Backend Developer - Python',
    company: 'DataTech Solutions',
    location: 'Hyderabad, India',
    type: 'Full-time',
    experience: '3-6 years',
    salary: '₹18-28 LPA',
    platform: 'LinkedIn',
    matchPercentage: 78,
    postedDate: '3 days ago',
    description: 'We are seeking a talented Backend Developer with strong Python skills to join our data engineering team.\n\nKey Responsibilities:\n• Design and implement scalable backend services\n• Work with Python, FastAPI, and PostgreSQL\n• Build and maintain RESTful APIs\n• Optimize database queries and application performance\n• Collaborate with data scientists and frontend teams\n\nQualifications:\n• 3+ years of Python development experience\n• Strong knowledge of FastAPI or Django\n• Experience with PostgreSQL or MySQL\n• Understanding of microservices architecture\n• Familiarity with Docker and Kubernetes',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Redis'],
    logo: '🐍'
  },
  {
    id: '4',
    title: 'UI/UX Designer',
    company: 'Design Studio Inc',
    location: 'Mumbai, India',
    type: 'Full-time',
    experience: '2-4 years',
    salary: '₹10-18 LPA',
    platform: 'Naukri',
    matchPercentage: 65,
    postedDate: '5 days ago',
    description: 'Looking for a creative UI/UX Designer to create amazing user experiences for our products.\n\nResponsibilities:\n• Design intuitive user interfaces for web and mobile\n• Create wireframes, prototypes, and high-fidelity mockups\n• Conduct user research and usability testing\n• Collaborate with developers to implement designs\n\nRequirements:\n• 2+ years of UI/UX design experience\n• Proficiency in Figma, Adobe XD, or Sketch\n• Strong portfolio demonstrating design skills\n• Understanding of design systems\n• Knowledge of HTML/CSS is a plus',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
    logo: '🎨'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudOps Ltd',
    location: 'Pune, India',
    type: 'Full-time',
    experience: '4-7 years',
    salary: '₹20-32 LPA',
    platform: 'LinkedIn',
    matchPercentage: 88,
    postedDate: '1 day ago',
    description: 'Join our DevOps team to build and maintain robust infrastructure for our cloud-native applications.\n\nWhat you\'ll do:\n• Design and implement CI/CD pipelines\n• Manage AWS infrastructure using Terraform\n• Monitor and optimize application performance\n• Implement security best practices\n• Automate deployment and scaling processes\n\nRequired Skills:\n• 4+ years of DevOps experience\n• Strong knowledge of AWS or GCP\n• Experience with Docker, Kubernetes\n• Proficiency in Terraform or CloudFormation\n• Scripting skills in Python or Bash',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD'],
    logo: '☁️'
  },
  {
    id: '6',
    title: 'Product Manager',
    company: 'InnovateTech',
    location: 'Delhi NCR, India',
    type: 'Full-time',
    experience: '5-8 years',
    salary: '₹25-40 LPA',
    platform: 'Naukri',
    matchPercentage: 70,
    postedDate: '1 week ago',
    description: 'Seeking an experienced Product Manager to drive product strategy and execution for our SaaS platform.\n\nKey Responsibilities:\n• Define product vision and roadmap\n• Gather and prioritize product requirements\n• Work closely with engineering and design teams\n• Analyze market trends and competitor products\n• Track and measure product metrics\n\nQualifications:\n• 5+ years of product management experience\n• Strong analytical and problem-solving skills\n• Experience with Agile methodologies\n• Excellent communication skills\n• Technical background preferred',
    skills: ['Product Strategy', 'Agile', 'Analytics', 'Stakeholder Management', 'User Stories'],
    logo: '📊'
  }
];

export const mockUser = {
  id: 'user-1',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  resumeScore: 75,
  appliedJobs: 12,
  completedSuggestions: 8,
  totalSuggestions: 15,
  currentRole: 'Frontend Developer',
  connectedPlatforms: {
    linkedin: true,
    naukri: false
  }
};

export const mockResumes = [
  {
    id: 'resume-1',
    userId: 'user-1',
    fileName: 'Rahul_Sharma_Resume.pdf',
    uploadDate: '2024-06-10',
    atsScore: 75,
    detectedRole: 'Frontend Developer',
    wordCount: 450,
    status: 'analyzed',
    keywords: {
      present: ['React', 'JavaScript', 'HTML', 'CSS', 'Git', 'Responsive Design'],
      missing: ['TypeScript', 'Next.js', 'Testing', 'CI/CD']
    },
    improvements: [
      {
        type: 'keyword',
        priority: 'high',
        suggestion: 'Add TypeScript to your skills section',
        impact: '+5 ATS score'
      },
      {
        type: 'structure',
        priority: 'medium',
        suggestion: 'Add measurable achievements in your experience section',
        impact: '+3 ATS score'
      },
      {
        type: 'formatting',
        priority: 'low',
        suggestion: 'Use consistent bullet point formatting',
        impact: '+2 ATS score'
      }
    ],
    checklist: [
      { item: 'Contact information', completed: true },
      { item: 'Professional summary', completed: true },
      { item: 'Work experience with dates', completed: true },
      { item: 'Education details', completed: true },
      { item: 'Skills section', completed: true },
      { item: 'Measurable achievements', completed: false },
      { item: 'Keywords for target role', completed: false },
      { item: 'No spelling/grammar errors', completed: true }
    ]
  }
];

export const mockTestimonials = [
  {
    id: 1,
    name: 'Priya Patel',
    role: 'Software Engineer',
    company: 'Tech Mahindra',
    content: 'Sangharsha helped me land my dream job! The AI-powered resume analysis identified gaps I never noticed, and the job matching was spot-on.',
    rating: 5
  },
  {
    id: 2,
    name: 'Amit Kumar',
    role: 'Data Scientist',
    company: 'Flipkart',
    content: 'The resume improvement suggestions were incredibly helpful. My ATS score went from 60 to 88 in just two iterations. Highly recommend!',
    rating: 5
  },
  {
    id: 3,
    name: 'Sneha Reddy',
    role: 'Product Manager',
    company: 'Swiggy',
    content: 'Saarthi, the AI agent, guided me through every step. From resume optimization to interview prep, it felt like having a personal career coach.',
    rating: 5
  }
];

export const mockChatMessages = [
  {
    id: 'msg-1',
    type: 'agent',
    text: 'Hello! I\'m Saarthi, your AI career guide. How can I help you today?',
    timestamp: new Date(Date.now() - 3600000)
  },
  {
    id: 'msg-2',
    type: 'user',
    text: 'I want to improve my resume for frontend developer roles',
    timestamp: new Date(Date.now() - 3500000)
  },
  {
    id: 'msg-3',
    type: 'agent',
    text: 'Great! I can help you with that. Based on your current resume, here are my top 3 suggestions:\n\n1. Add TypeScript and Next.js to your skills\n2. Include quantifiable achievements (e.g., "Improved page load time by 40%")\n3. Add more frontend-specific keywords like "Component Library" and "State Management"\n\nWould you like me to analyze specific sections of your resume?',
    timestamp: new Date(Date.now() - 3400000)
  }
];
