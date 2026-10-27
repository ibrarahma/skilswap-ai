import { UserProfile, ProjectItem, Hackathon, StartupIdea, ForumPost, Poll, ChatChannel, ChatMessage, NotificationItem } from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'usr_student_1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@iitd.ac.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    college: 'IIT Delhi',
    department: 'Computer Science & Engineering',
    semester: 6,
    bio: 'Full-stack builder passionate about AI/ML models, React, and building products for real-world impact.',
    location: 'New Delhi, India',
    githubUrl: 'https://github.com/aaravsharma',
    linkedinUrl: 'https://linkedin.com/in/aaravsharma',
    portfolioUrl: 'https://aarav.dev',
    resumeUrl: 'aarav_sharma_resume_2026.pdf',
    resumeText: 'Aarav Sharma | IIT Delhi B.Tech CSE (GPA: 9.1/10)\nSkills: React, Node.js, Python, PyTorch, TypeScript, Docker, PostgreSQL.\nExperience: Software Intern at TechCorp, Lead Developer for Campus Portal.\nProjects: AI Autonomous Agent, Real-time Code Editor, SkillSwap AI.',
    verificationStatus: 'verified',
    availabilityStatus: 'Available for Projects',
    skillsToTeach: [
      { id: 's1', name: 'React & Next.js', category: 'Web Dev', level: 'Advanced', type: 'teach', endorsements: 18 },
      { id: 's2', name: 'Python & PyTorch', category: 'AI/ML', level: 'Intermediate', type: 'teach', endorsements: 12 },
    ],
    skillsToLearn: [
      { id: 's3', name: 'DevOps & Kubernetes', category: 'Cloud/DevOps', level: 'Beginner', type: 'learn', endorsements: 0 },
      { id: 's4', name: 'System Design', category: 'Web Dev', level: 'Intermediate', type: 'learn', endorsements: 0 },
    ],
    interests: ['AI Hackathons', 'Open Source', 'Web3', 'Competitive Programming'],
    certificates: [
      { id: 'c1', title: 'Deep Learning Specialization', issuer: 'Coursera (DeepLearning.AI)', date: 'Jan 2026' },
      { id: 'c2', title: 'AWS Certified Developer', issuer: 'Amazon Web Services', date: 'Nov 2025' },
    ],
    rating: 4.9,
    reviewCount: 24,
    badges: ['Top Mentor Candidate', 'Hackathon Winner 🏆', 'Verified Student 🎓'],
    compatibilityScore: 95,
  },
  {
    id: 'usr_student_2',
    name: 'Ananya Verma',
    email: 'ananya.v@bits-pilani.ac.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
    college: 'BITS Pilani',
    department: 'Electrical & Electronics',
    semester: 4,
    bio: 'UI/UX Designer and Frontend enthusiast who loves craft, micro-interactions, and accessible web experiences.',
    location: 'Pilani, Rajasthan',
    githubUrl: 'https://github.com/ananyaverma',
    linkedinUrl: 'https://linkedin.com/in/ananyaverma',
    portfolioUrl: 'https://ananyadesigns.framer.website',
    verificationStatus: 'verified',
    availabilityStatus: 'Looking for Hackathon Team',
    skillsToTeach: [
      { id: 's5', name: 'Figma & UI/UX Design', category: 'Design/UI', level: 'Expert', type: 'teach', endorsements: 32 },
      { id: 's6', name: 'Tailwind CSS & Motion', category: 'Web Dev', level: 'Advanced', type: 'teach', endorsements: 21 },
    ],
    skillsToLearn: [
      { id: 's7', name: 'React Native', category: 'Mobile App', level: 'Beginner', type: 'learn', endorsements: 0 },
      { id: 's8', name: 'Three.js & WebGL', category: 'Web Dev', level: 'Beginner', type: 'learn', endorsements: 0 },
    ],
    interests: ['Design Systems', 'EdTech', 'Hackathons', 'Prototyping'],
    certificates: [
      { id: 'c3', title: 'Google UX Design Professional', issuer: 'Coursera', date: 'Dec 2025' },
    ],
    rating: 4.95,
    reviewCount: 31,
    badges: ['Design Master 🎨', 'Star Collaborator', 'Verified Student 🎓'],
    compatibilityScore: 91,
  },
  {
    id: 'usr_student_3',
    name: 'Rohan Kulkarni',
    email: 'rohan.k@nitk.edu.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
    college: 'NIT Surathkal',
    department: 'Information Technology',
    semester: 6,
    bio: 'Backend & Cloud Engineer. Docker, Kubernetes, PostgreSQL, and Go are my daily jam.',
    location: 'Surathkal, Karnataka',
    githubUrl: 'https://github.com/rohank',
    linkedinUrl: 'https://linkedin.com/in/rohankulkarni',
    portfolioUrl: 'https://rohank.io',
    verificationStatus: 'verified',
    availabilityStatus: 'Seeking Co-founder',
    skillsToTeach: [
      { id: 's9', name: 'Docker & Kubernetes', category: 'Cloud/DevOps', level: 'Advanced', type: 'teach', endorsements: 15 },
      { id: 's10', name: 'Golang Microservices', category: 'Web Dev', level: 'Intermediate', type: 'teach', endorsements: 11 },
    ],
    skillsToLearn: [
      { id: 's11', name: 'Next.js Frontend', category: 'Web Dev', level: 'Beginner', type: 'learn', endorsements: 0 },
      { id: 's12', name: 'Generative AI APIs', category: 'AI/ML', level: 'Intermediate', type: 'learn', endorsements: 0 },
    ],
    interests: ['Cloud Native', 'Microservices', 'Startups', 'Fintech'],
    certificates: [
      { id: 'c4', title: 'Certified Kubernetes Administrator (CKA)', issuer: 'CNCF', date: 'Mar 2026' },
    ],
    rating: 4.8,
    reviewCount: 16,
    badges: ['Cloud Guru ☁️', 'Verified Student 🎓'],
    compatibilityScore: 88,
  },
  {
    id: 'usr_mentor_1',
    name: 'Dr. Vikram Malhotra',
    email: 'v.malhotra@iitd.ac.in',
    role: 'mentor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    college: 'IIT Delhi',
    department: 'Computer Science Department',
    semester: 0,
    bio: 'Associate Professor & AI Lab Lead. Mentoring student startups, ML research papers, and career roadmaps.',
    location: 'New Delhi, India',
    githubUrl: 'https://github.com/vmalhotra-research',
    linkedinUrl: 'https://linkedin.com/in/vikrammalhotra',
    portfolioUrl: 'https://iitd.ac.in/faculty/vmalhotra',
    verificationStatus: 'verified',
    availabilityStatus: 'Open for Mentorship',
    skillsToTeach: [
      { id: 'sm1', name: 'AI/ML Research & NLP', category: 'AI/ML', level: 'Expert', type: 'teach', endorsements: 85 },
      { id: 'sm2', name: 'Startup Pitch & Funding Strategy', category: 'Business', level: 'Expert', type: 'teach', endorsements: 62 },
    ],
    skillsToLearn: [],
    interests: ['AI Ethics', 'Deep Tech Startups', 'Research Publications'],
    certificates: [],
    rating: 5.0,
    reviewCount: 78,
    badges: ['Verified Mentor 🛡️', 'Research Pioneer', 'Faculty Specialist'],
  },
  {
    id: 'usr_recruiter_1',
    name: 'Priya Sundaram',
    email: 'priya@techfusion.careers',
    role: 'recruiter',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    college: 'TechFusion Talent Inc.',
    department: 'University Relations & Campus Hiring',
    semester: 0,
    bio: 'Senior Technical Recruiter scouting top 5% student talent in AI, Web Engineering, and Product Design across premier Indian universities.',
    location: 'Bengaluru, India',
    githubUrl: '',
    linkedinUrl: 'https://linkedin.com/in/priyasundaram-recruiter',
    portfolioUrl: 'https://techfusion.careers',
    verificationStatus: 'verified',
    availabilityStatus: 'Hiring Students',
    skillsToTeach: [
      { id: 'sr1', name: 'Technical Interview Prep', category: 'Career', level: 'Expert', type: 'teach', endorsements: 44 },
      { id: 'sr2', name: 'Resume Formatting for FAANG', category: 'Career', level: 'Expert', type: 'teach', endorsements: 51 },
    ],
    skillsToLearn: [],
    interests: ['Campus Hiring', 'Hackathon Sponsoring', 'Tech Internships'],
    certificates: [],
    rating: 4.9,
    reviewCount: 42,
    badges: ['Verified Recruiter 💼', 'Top Hiring Partner'],
  },
  {
    id: 'usr_admin_1',
    name: 'College Admin - Prof. S. N. Ray',
    email: 'admin.dean@iitd.ac.in',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    college: 'IIT Delhi Administration',
    department: 'Academic & Campus Relations Office',
    semester: 0,
    bio: 'Institutional Administrator for SkillSwap AI. Verifying student records, mentor accreditations, and managing hackathon hostings.',
    location: 'New Delhi, India',
    githubUrl: '',
    linkedinUrl: 'https://linkedin.com/in/snray-admin',
    portfolioUrl: '',
    verificationStatus: 'verified',
    availabilityStatus: 'Open for Mentorship',
    skillsToTeach: [],
    skillsToLearn: [],
    interests: ['Campus Growth', 'Skill Accreditation', 'Academic Governance'],
    certificates: [],
    rating: 5.0,
    reviewCount: 99,
    badges: ['Master Admin ⚡', 'College Verifier'],
  }
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj_1',
    title: 'CodeSync - Realtime Collaborative IDE for Campus Teams',
    description: 'A browser-based collaborative code editor with video chat, AI auto-complete, and instant sandbox execution for college hackathons and group projects.',
    techStack: ['Next.js', 'WebSockets', 'Monaco Editor', 'Node.js', 'Docker', 'Tailwind CSS'],
    category: 'Web Dev',
    githubUrl: 'https://github.com/aaravsharma/codesync-campus',
    liveUrl: 'https://codesync-demo.vercel.app',
    likes: 42,
    commentsCount: 9,
    authorId: 'usr_student_1',
    authorName: 'Aarav Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    authorRole: 'student',
    college: 'IIT Delhi',
    createdAt: '2 days ago',
    status: 'In Progress',
    lookingForTeammates: true,
    requiredSkills: ['DevOps / Docker', 'Rust or Go', 'Frontend Animation'],
    upvotedBy: ['usr_student_2', 'usr_student_3'],
    tasks: [
      { id: 't1', title: 'Implement WebSocket operational transformation logic', status: 'done', assignee: 'Aarav Sharma' },
      { id: 't2', title: 'Add dark theme syntax highlighting presets', status: 'in_progress', assignee: 'Ananya Verma' },
      { id: 't3', title: 'Containerize code execution engine sandbox', status: 'todo', assignee: 'Unassigned' }
    ],
    milestones: [
      { id: 'm1', title: 'Alpha Release & Campus Beta Test', dueDate: '2026-08-15', completed: true },
      { id: 'm2', title: 'Multi-language Execution Engine', dueDate: '2026-09-01', completed: false }
    ],
    files: [
      { id: 'f1', name: 'CodeSync_Architecture_Diagram.pdf', size: '2.4 MB', uploadedAt: 'Yesterday', url: '#' },
      { id: 'f2', name: 'UI_Wireframes_v2.fig', size: '14.1 MB', uploadedAt: '3 days ago', url: '#' }
    ]
  },
  {
    id: 'proj_2',
    title: 'MediVision AI - Early Ocular Disease Detection Web App',
    description: 'Uses PyTorch CNN model to diagnose early signs of diabetic retinopathy from retinal scan images uploaded by village clinics.',
    techStack: ['Python', 'PyTorch', 'FastAPI', 'React', 'Tailwind CSS', 'OpenCV'],
    category: 'AI/ML',
    githubUrl: 'https://github.com/ananyaverma/medivision-ai',
    liveUrl: 'https://medivision.ai.studio',
    likes: 68,
    commentsCount: 14,
    authorId: 'usr_student_2',
    authorName: 'Ananya Verma',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
    authorRole: 'student',
    college: 'BITS Pilani',
    createdAt: '4 days ago',
    status: 'Completed',
    lookingForTeammates: false,
    requiredSkills: [],
    upvotedBy: ['usr_student_1', 'usr_mentor_1']
  },
  {
    id: 'proj_3',
    title: 'CampuShare - Peer-to-Peer Book & Hardware Gear Exchange',
    description: 'Hyper-local college marketplace where students list unused textbooks, lab gear, and microcontrollers for free skill swap or nominal rental.',
    techStack: ['React Native', 'Firebase', 'Express', 'Tailwind CSS'],
    category: 'Mobile App',
    githubUrl: 'https://github.com/rohank/campushare',
    likes: 31,
    commentsCount: 6,
    authorId: 'usr_student_3',
    authorName: 'Rohan Kulkarni',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
    authorRole: 'student',
    college: 'NIT Surathkal',
    createdAt: '1 week ago',
    status: 'Idea',
    lookingForTeammates: true,
    requiredSkills: ['UI Design', 'React Native Developer'],
    upvotedBy: ['usr_student_1']
  }
];

export const INITIAL_HACKATHONS: Hackathon[] = [
  {
    id: 'hack_1',
    title: 'National AI Innovation Hackathon 2026',
    organizer: 'Ministry of Education & IIT Bombay',
    banner: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    description: 'Build breakthrough generative AI solutions for healthcare, education, agriculture, and smart cities. Over ₹10 Lakhs in cash prizes and incubator access!',
    tags: ['AI/ML', 'Generative AI', 'Healthcare', 'EdTech'],
    prizePool: '₹10,00,000',
    startDate: '2026-08-10',
    endDate: '2026-08-12',
    location: 'IIT Bombay / Online',
    mode: 'Hybrid',
    registeredStudentsCount: 1420,
    isRegistered: true,
    teamsCount: 310
  },
  {
    id: 'hack_2',
    title: 'Buildathon X - Web3 & Decentralized Future',
    organizer: 'Polygon & BITS Pilani Sandbox',
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    description: '48-hour intense hackathon focused on zero-knowledge proofs, smart contracts, and decentralized student identity systems.',
    tags: ['Web3', 'Blockchain', 'Solidity', 'Security'],
    prizePool: '$15,000 USD',
    startDate: '2026-08-25',
    endDate: '2026-08-27',
    location: 'Online',
    mode: 'Online',
    registeredStudentsCount: 890,
    isRegistered: false,
    teamsCount: 180
  },
  {
    id: 'hack_3',
    title: 'CleanTech & Sustainable Campus Challenge',
    organizer: 'NIT Surathkal & E-Cell',
    banner: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800',
    description: 'Hardware + Software hackathon for energy monitoring, waste reduction, and smart solar micro-grids for university campuses.',
    tags: ['IoT', 'Sustainability', 'Hardware', 'CleanTech'],
    prizePool: '₹5,00,000',
    startDate: '2026-09-05',
    endDate: '2026-09-07',
    location: 'NIT Surathkal Campus',
    mode: 'Offline',
    registeredStudentsCount: 450,
    isRegistered: false,
    teamsCount: 95
  }
];

export const INITIAL_STARTUPS: StartupIdea[] = [
  {
    id: 'start_1',
    title: 'AuraHealth - Personal AI Mental Wellness Companion for Students',
    tagline: 'Empathetic voice AI that helps college students tackle exam anxiety, burnout, and career stress.',
    description: 'AuraHealth provides 24/7 confidential voice and text check-ins grounded in cognitive behavioral therapy (CBT) principles, integrated with campus counselor appointment scheduling.',
    stage: 'MVP',
    category: 'HealthTech & AI',
    founderId: 'usr_student_1',
    founderName: 'Aarav Sharma',
    founderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    college: 'IIT Delhi',
    lookingFor: ['Growth Marketing Co-Founder', 'Clinical Psychology Advisor', 'Flutter Developer'],
    likes: 84,
    mentorsConnected: 3,
    createdAt: '1 week ago'
  },
  {
    id: 'start_2',
    title: 'EcoPack - Biodegradable Algae Packaging for E-Commerce',
    tagline: 'Replacing plastic bubble wrap with 100% compostable seaweed material.',
    description: 'We have developed a patent-pending bio-film material from marine algae that decomposes naturally in standard soil within 21 days with 0 microplastics.',
    stage: 'Seed Stage',
    category: 'Biotech & CleanTech',
    founderId: 'usr_student_3',
    founderName: 'Rohan Kulkarni',
    founderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
    college: 'NIT Surathkal',
    lookingFor: ['Supply Chain Operations Lead', 'Angel Investor Intros'],
    likes: 120,
    mentorsConnected: 5,
    createdAt: '2 weeks ago'
  }
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'forum_1',
    title: 'How should 3rd year CSE students prepare for Off-Campus AI/ML roles in 2026?',
    content: 'Hi everyone! I am looking to transition from basic PyTorch tutorials to production ML engineering. What projects carry the highest weight on resumes during screening?',
    category: 'Career',
    authorId: 'usr_student_1',
    authorName: 'Aarav Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    authorRole: 'student',
    college: 'IIT Delhi',
    createdAt: '3 hours ago',
    likes: 28,
    repliesCount: 4,
    tags: ['CareerAdvice', 'AIML', 'Resumes', 'OffCampus'],
    upvotedBy: ['usr_student_2'],
    replies: [
      {
        id: 'rep_1',
        authorId: 'usr_mentor_1',
        authorName: 'Dr. Vikram Malhotra',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
        content: 'Focus on 2 core things: 1) Model Deployment (e.g. quantization, ONNX export, serving via vLLM/FastAPI), and 2) Real dataset cleaning/evaluation pipelines rather than just Kaggle notebooks. Production ML is 80% data & latency optimization!',
        createdAt: '2 hours ago',
        isBestAnswer: true,
        likes: 19
      },
      {
        id: 'rep_2',
        authorId: 'usr_recruiter_1',
        authorName: 'Priya Sundaram',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
        content: 'Agree with Dr. Vikram! From a recruiter perspective, seeing a deployed web link + GitHub repository with clean README & benchmark stats immediately gets you moved to interview calls.',
        createdAt: '1 hour ago',
        isBestAnswer: false,
        likes: 14
      }
    ]
  },
  {
    id: 'forum_2',
    title: 'Looking for a UI/UX partner for National AI Innovation Hackathon!',
    content: 'Our team already has 2 backend/AI engineers. We need a designer proficient in Figma to craft clean dashboards and presentation pitch deck slides for the final demo.',
    category: 'Projects',
    authorId: 'usr_student_3',
    authorName: 'Rohan Kulkarni',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
    authorRole: 'student',
    college: 'NIT Surathkal',
    createdAt: '1 day ago',
    likes: 15,
    repliesCount: 2,
    tags: ['Hackathon', 'TeamFinder', 'UIUX'],
    replies: [
      {
        id: 'rep_3',
        authorId: 'usr_student_2',
        authorName: 'Ananya Verma',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
        content: 'Hey Rohan! I am super interested. Check out my Figma portfolio on my SkillSwap profile. Sending you a team invite message!',
        createdAt: '20 hours ago',
        isBestAnswer: false,
        likes: 8
      }
    ]
  }
];

export const INITIAL_POLLS: Poll[] = [
  {
    id: 'poll_1',
    question: 'Which Tech Stack are you using for your 2026 Major Degree Project?',
    authorName: 'SkillSwap Campus Team',
    options: [
      { id: 'opt_1', text: 'Next.js + TypeScript + Node/Express', votes: 142 },
      { id: 'opt_2', text: 'Python + FastAPI + PyTorch/LangChain', votes: 189 },
      { id: 'opt_3', text: 'Flutter / React Native (Cross-platform)', votes: 76 },
      { id: 'opt_4', text: 'Java Spring Boot / Go Microservices', votes: 53 }
    ],
    totalVotes: 460,
    createdAt: '1 day ago'
  }
];

export const INITIAL_CHAT_CHANNELS: ChatChannel[] = [
  {
    id: 'chan_1',
    name: 'Ananya Verma',
    type: 'direct',
    members: ['usr_student_1', 'usr_student_2'],
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
    lastMessage: 'Hey Aarav! I loved your CodeSync project outline. Can we do a Figma skill swap for Next.js?',
    lastMessageTime: '10:14 AM',
    unreadCount: 1
  },
  {
    id: 'chan_2',
    name: 'Hackathon Team Alpha 🚀',
    type: 'group',
    members: ['usr_student_1', 'usr_student_2', 'usr_student_3'],
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=300',
    lastMessage: 'Rohan uploaded the backend schema diagram. Check files!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0
  }
];

export const INITIAL_CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  chan_1: [
    {
      id: 'm1',
      channelId: 'chan_1',
      senderId: 'usr_student_2',
      senderName: 'Ananya Verma',
      senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
      text: 'Hey Aarav! I saw your profile on SkillSwap AI.',
      timestamp: '10:10 AM'
    },
    {
      id: 'm2',
      channelId: 'chan_1',
      senderId: 'usr_student_2',
      senderName: 'Ananya Verma',
      senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
      text: 'Hey Aarav! I loved your CodeSync project outline. Can we do a Figma skill swap for Next.js?',
      timestamp: '10:14 AM'
    }
  ],
  chan_2: [
    {
      id: 'm3',
      channelId: 'chan_2',
      senderId: 'usr_student_3',
      senderName: 'Rohan Kulkarni',
      senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
      text: 'Rohan uploaded the backend schema diagram. Check files!',
      timestamp: 'Yesterday'
    }
  ]
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'New Skill Swap Request!',
    message: 'Ananya Verma wants to swap Figma UI/UX for React & Next.js mentorship.',
    time: '15 mins ago',
    read: false,
    type: 'swap'
  },
  {
    id: 'n2',
    title: 'Team Invitation 🚀',
    message: 'Rohan Kulkarni invited you to join "National AI Innovation Hackathon" team.',
    time: '2 hours ago',
    read: false,
    type: 'team'
  },
  {
    id: 'n3',
    title: 'Project Upvoted',
    message: 'Dr. Vikram Malhotra upvoted your project "CodeSync".',
    time: '1 day ago',
    read: true,
    type: 'project'
  }
];
