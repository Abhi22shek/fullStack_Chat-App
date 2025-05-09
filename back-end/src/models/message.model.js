import mongoose from "mongoose";

 const messageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: String,
    image: String,
    file: {
      name: String,
      size: Number,
      url: String,
    },
  },
  { timestamps: true }
);

const message = mongoose.model("Message",messageSchema);

export default message;
