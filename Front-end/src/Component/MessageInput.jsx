import React, { useRef, useState } from "react";
import { Image, Paperclip, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";
import { useChatStore } from "../Store/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [fileData, setFileData] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const { sendMessages } = useChatStore();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      setImageFile(compressedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      toast.error("Image compression failed");
      console.error("Compression error:", error);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = null;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileData(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview({
        name: file.name,
        size: file.size,
        type: file.type
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imageFile && !fileData) return;

    try {
      // Create FormData object
      const formData = new FormData();
      
      // Add text if present
      if (text.trim()) {
        formData.append("text", text.trim());
      }
      
      // Add image if present
      if (imageFile) {
        formData.append("image", imageFile);
      }
      
      // Add file if present
      if (fileData) {
        formData.append("file", fileData);
      }

      // Send the message with FormData
      await sendMessages(formData);

      // Reset form state
      setText("");
      setImageFile(null);
      setImagePreview(null);
      setFileData(null);
      setFilePreview(null);

      if (imageInputRef.current) {
        imageInputRef.current.value = null;
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      console.error("Send message error 👉", error);
      toast.error("Failed to send message");
    }
  };

  const removeFile = () => {
    setFileData(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="relative">
          <img
            src={imagePreview}
            alt="preview"
            className="w-1/2 h-1/2 object-cover rounded-lg"
          />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-base-300 rounded-full p-1"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {filePreview && (
        <div className="relative p-3 border rounded-lg w-fit mb-2 bg-base-200">
          <div className="text-sm font-medium">{filePreview.name}</div>
          <div className="text-xs text-gray-500">
            {(filePreview.size / 1024).toFixed(1)} KB
          </div>
          <button
            onClick={removeFile}
            className="absolute top-0 right-0 p-1 text-gray-500 hover:text-red-500"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 gap-2 flex">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg sm:input-md input-sm"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message here..."
          />

          <input
            type="file"
            ref={imageInputRef}
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept="application/pdf,.doc,.docx,.txt"
          />

          <button
            type="button"
            onClick={() => imageInputRef.current.click()}
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
          >
            <Image size={20} />
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className={`hidden sm:flex btn btn-circle text-zinc-400`}
          >
            <Paperclip size={20} />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-circle btn-sm"
          disabled={!text.trim() && !imagePreview && !filePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
