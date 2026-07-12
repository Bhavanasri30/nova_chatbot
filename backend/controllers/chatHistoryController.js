import Chat from "../models/chat.js";

// Create New Chat
export const createChat = async (req, res) => {
  try {
    const { title } = req.body;

    const chat = await Chat.create({
      title: title || "New Chat",
      messages: [],
    });

    res.status(201).json({
      success: true,
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Chats
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find().sort({
      updatedAt: -1,
    });

    res.status(200).json({
      success: true,
      chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Chat
export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Message to Chat
export const addMessage = async (req, res) => {
  try {
    const { sender, text } = req.body;

    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    chat.messages.push({
      sender,
      text,
    });

    await chat.save();

    res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Chat
export const deleteChat = async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Chat Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};