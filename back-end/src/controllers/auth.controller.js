import { genrateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import Cloudinary from "../lib/cloudinary.js"


export const signup = async (req, res) => {
   const {fullName, email, password} = req.body
   try {

        if(!fullName || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        if(password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters long"})
        }

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "email already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            email,
            fullName,
            password: hashedPassword    
        })

        if(newUser){
            genrateToken(newUser._id,res)
             await  newUser.save()
            return res.status(201).json({
                message: "User created successfully",
            })}else{
            return res.status(400).json({message: "User not created"})
        }
   } catch (error) {
        return res.status(500).json({message: error.message})   
   }
}
export const login =  async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message: "invalid credentials"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(400).json({message: "invalid credentials"})
        }
        genrateToken(user._id,res)

        return res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePicture,
            password:user.password,
        })

    } catch (error) {
        res.status(500).json({message: error.message})

    }
}
export const logout = (req, res) => {
    try {
      res.cookie("jwt", "" , {maxAge:0})
      res.status(200).json({message: "Logout successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateProfile = async (req, res) => {
    try {
        

        const { profilePicture } = req.body;
        const userId = req.user._id;

        if (!profilePicture) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        const uploadResponse = await Cloudinary.uploader.upload(profilePicture);
        console.log("Cloudinary upload response:", uploadResponse);

        const updateUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: uploadResponse.secure_url },
            { new: true }
        );

        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updateUser);

        console.log("userId:", userId);
        console.log("Uploading this pic:", profilePicture);
        console.log("Upload secure_url:", uploadResponse.secure_url);
        console.log("Updated user:", updateUser);

    } catch (error) {
        console.error("Update Profile Error:", error); // LOG THIS
        res.status(500).json({ message: "Internal server error" });
    }
};


export const checkAuth = (req,res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}