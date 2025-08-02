import { colors } from "./colors";


// Mock data
export const categories = [
  { id: "academic", name: "Academic", icon: "🎓" },
  { id: "religious", name: "Religious", icon: "🕌" },
  { id: "language", name: "Language", icon: "📚" },
];

export const carouselData = [
  {
    id: 1,
    title: "Get 10% off your first session!",
    subtitle: "Book now and start learning",
    image: "https://i.pinimg.com/736x/42/b2/2b/42b22b1bfdf2b37be664453ceb1e4f5d.jpg",
    backgroundColor: [colors.indigo, colors.blue],
  },
  {
    id: 2,
    title: "How to book a mentor",
    subtitle: "Step-by-step guide for beginners",
    image: "https://i.pinimg.com/736x/76/93/10/769310fbc339f9c10b79af3e1b9a8b84.jpg",
    backgroundColor: [colors.mint, colors.green],
  },
  {
    id: 3,
    title: "New subjects available!",
    subtitle: "Explore our expanded curriculum",
    image: "/placeholder.svg?height=200&width=350",
    backgroundColor: [colors.amber, "#FF8F00"],
  },
];

export const topMentors = [
  {
    id: 1,
    name: "Dr. Aisha Khan",
    rating: 4.9,
    subjects: ["Mathematics", "Physics"],
    image: "https://i.pinimg.com/736x/1a/5e/18/1a5e1825eb05eace9e35938efd3297f5.jpg",
    price: "$25/hr",
    isOnline: true,
    isVerified: true,
  },
  {
    id: 2,
    name: "Prof. Omar Ali",
    rating: 4.8,
    subjects: ["Quran", "Arabic"],
    image: "https://i.pinimg.com/736x/5a/1b/3a/5a1b3a066a8ba09ce55497b3b0925371.jpg",
    price: "$20/hr",
    isOnline: false,
    isVerified: true,
  },
  {
    id: 3,
    name: "Ms. Sarah Johnson",
    rating: 4.7,
    subjects: ["English", "Literature"],
    image: "https://i.pinimg.com/1200x/b3/5e/f1/b35ef1be51234970aec1a1e76f70ad16.jpg",
    price: "$22/hr",
    isOnline: true,
    isVerified: false,
  },
  {
    id: 4,
    name: "Dr. Hassan Mohamed",
    rating: 4.9,
    subjects: ["Chemistry", "Biology"],
    image: "/placeholder.svg?height=80&width=80",
    price: "$28/hr",
    isOnline: true,
    isVerified: true,
  },
];

export const upcomingBookings = [
  {
    id: 1,
    mentorName: "Dr. Aisha Khan",
    subject: "Mathematics",
    time: "Today, 3:00 PM",
    status: "confirmed",
  },
  {
    id: 2,
    mentorName: "Prof. Omar Ali",
    subject: "Quran",
    time: "Tomorrow, 10:00 AM",
    status: "pending",
  },
];

export const recentlyViewed = [
  {
    id: 1,
    name: "Dr. Ahmed Farouk",
    subject: "Physics",
    rating: 4.6,
    image: "https://i.pinimg.com/736x/5a/1b/3a/5a1b3a066a8ba09ce55497b3b0925371.jpg",
  },
  {
    id: 2,
    name: "Ms. Fatima Al-Zahra",
    subject: "Arabic",
    rating: 4.8,
    image: "https://i.pinimg.com/1200x/b3/5e/f1/b35ef1be51234970aec1a1e76f70ad16.jpg",
  },
];

// Mock data for the MentorDetailScreen
export const mentors = [
    {
      id: 1,
      name: "Dr. Aisha Khan",
      rating: 4.9,
      reviewCount: 127,
      subjects: ["Mathematics", "Physics"],
      price: "RM40",
      location: "Kuala Lumpur",
      image: "https://i.pinimg.com/736x/df/21/b6/df21b6a90480d6206624ceeb6006ed37.jpg",
      isAvailable: true,
      isVerified: true,
      experience: "8 years",
      bio: "Experienced mathematics and physics tutor with PhD in Applied Mathematics. Specializes in helping students excel in IGCSE, A-Levels, and university-level courses.",
      academicLevels: ["IGCSE", "A-Levels", "University"],
      schedule: ["Mon 9AM-5PM", "Tue 9AM-5PM", "Wed 9AM-5PM", "Thu 9AM-5PM", "Fri 9AM-3PM"],
      reviews: [
        {
          id: 1,
          student: "Ahmad Rahman",
          rating: 5,
          comment: "Excellent teacher! Helped me improve my math grades significantly.",
          date: "2 weeks ago",
        },
        {
          id: 2,
          student: "Sarah Lee",
          rating: 5,
          comment: "Very patient and explains concepts clearly.",
          date: "1 month ago",
        },
      ],
    },
    {
      id: 2,
      name: "Prof. Omar Ali",
      rating: 4.8,
      reviewCount: 89,
      subjects: ["Quran", "Arabic", "Islamic Studies"],
      price: "RM35",
      location: "Petaling Jaya",
      image: "https://i.pinimg.com/736x/df/21/b6/df21b6a90480d6206624ceeb6006ed37.jpg",
      isAvailable: false,
      isVerified: true,
      experience: "12 years",
      bio: "Certified Quranic teacher and Arabic language expert. Holds Master's degree in Islamic Studies from Al-Azhar University.",
      academicLevels: ["Beginner", "Intermediate", "Advanced"],
      schedule: ["Sat 8AM-12PM", "Sun 8AM-12PM", "Mon 6PM-9PM", "Wed 6PM-9PM"],
      reviews: [
        {
          id: 1,
          student: "Fatima Hassan",
          rating: 5,
          comment: "Amazing Quran teacher. Very knowledgeable and patient.",
          date: "1 week ago",
        },
      ],
    },
    {
      id: 3,
      name: "Ms. Sarah Johnson",
      rating: 4.7,
      reviewCount: 156,
      subjects: ["English", "Literature"],
      price: "RM45",
      location: "Shah Alam",
      image: "/placeholder.svg?height=80&width=80",
      isAvailable: true,
      isVerified: false,
      experience: "6 years",
      bio: "Native English speaker with extensive experience in teaching English literature and language. Specializes in IELTS and Cambridge exams preparation.",
      academicLevels: ["SPM", "IGCSE", "A-Levels", "IELTS"],
      schedule: ["Mon 2PM-8PM", "Tue 2PM-8PM", "Thu 2PM-8PM", "Fri 2PM-8PM"],
      reviews: [
        {
          id: 1,
          student: "Li Wei",
          rating: 5,
          comment: "Helped me achieve Band 8 in IELTS. Highly recommended!",
          date: "3 days ago",
        },
      ],
    },
    {
      id: 4,
      name: "Dr. Hassan Mohamed",
      rating: 4.9,
      reviewCount: 203,
      subjects: ["Chemistry", "Biology"],
      price: "RM50",
      location: "Subang Jaya",
      image: "/placeholder.svg?height=80&width=80",
      isAvailable: true,
      isVerified: true,
      experience: "10 years",
      bio: "PhD in Biochemistry with extensive teaching experience. Specializes in helping pre-med students and those preparing for medical school entrance exams.",
      academicLevels: ["SPM", "STPM", "A-Levels", "Foundation", "University"],
      schedule: ["Mon 9AM-6PM", "Wed 9AM-6PM", "Fri 9AM-6PM", "Sat 9AM-3PM"],
      reviews: [
        {
          id: 1,
          student: "Priya Sharma",
          rating: 5,
          comment: "Best chemistry teacher ever! Made complex topics easy to understand.",
          date: "5 days ago",
        },
      ],
    },
  ]

// Mock data for subjects
export const subjects = [
    "All",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "History",
    "Quran",
    "Arabic",
    "French",
    "Computer Science",
    "Economics",
  ]

