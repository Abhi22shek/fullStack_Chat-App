import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Female Users
  {
    email: "priya.sharma@example.com",
    fullName: "Priya Sharma",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    email: "ananya.verma@example.com",
    fullName: "Ananya Verma",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    email: "isha.patel@example.com",
    fullName: "Isha Patel",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/women/23.jpg",
  },
  {
    email: "sneha.singh@example.com",
    fullName: "Sneha Singh",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/women/24.jpg",
  },
  {
    email: "kavya.nair@example.com",
    fullName: "Kavya Nair",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    email: "rhea.kapoor@example.com",
    fullName: "Rhea Kapoor",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    email: "meera.jain@example.com",
    fullName: "Meera Jain",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/women/27.jpg",
  },
  {
    email: "aisha.iyer@example.com",
    fullName: "Aisha Iyer",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/women/28.jpg",
  },

  // Male Users
  {
    email: "arjun.mehta@example.com",
    fullName: "Arjun Mehta",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    email: "rahul.gupta@example.com",
    fullName: "Rahul Gupta",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    email: "rohan.kumar@example.com",
    fullName: "Rohan Kumar",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    email: "vikram.singh@example.com",
    fullName: "Vikram Singh",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/men/24.jpg",
  },
  {
    email: "siddharth.patel@example.com",
    fullName: "Siddharth Patel",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/men/25.jpg",
  },
  {
    email: "amit.agarwal@example.com",
    fullName: "Amit Agarwal",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/men/26.jpg",
  },
  {
    email: "manish.joshi@example.com",
    fullName: "Manish Joshi",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/men/27.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();