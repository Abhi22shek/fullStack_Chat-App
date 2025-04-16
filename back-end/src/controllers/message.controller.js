import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Cloudinary from "../lib/cloudinary.js";
import fs from 'fs';
import path from 'path';

export const getUsersFromSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const message = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(message);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Handle image upload if present
    let imageUrl;
    if (req.files && req.files.image) {
      const imageFile = req.files.image[0];
      const uploadResponse = await Cloudinary.uploader.upload(imageFile.path);
      imageUrl = uploadResponse.secure_url;
      
      // Delete the local file after upload
      fs.unlinkSync(imageFile.path);
    }

    // Handle file upload if present
    let fileData = null;
    if (req.files && req.files.file) {
      const uploadedFile = req.files.file[0];
      const uploadResponse = await Cloudinary.uploader.upload(uploadedFile.path, {
        resource_type: "raw"
      });
      
      fileData = {
        name: uploadedFile.originalname,
        size: uploadedFile.size,
        url: uploadResponse.secure_url
      };
      
      // Delete the local file after upload
      fs.unlinkSync(uploadedFile.path);
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text: text || "",
      image: imageUrl,
      file: fileData
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};