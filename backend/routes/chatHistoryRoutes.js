import express from "express";
import {
  createChat,
  getChats,
  deleteChat,
  getChatById,
  addMessage,
} from "../controllers/chatHistoryController.js";

const router = express.Router();

// Create a new chat
router.post("/", createChat);

// Get all chats
router.get("/", getChats);

// Get a single chat by ID
router.get("/:id", getChatById);

// Add a message to a chat
router.post("/:id/message", addMessage);

// Delete a chat
router.delete("/:id", deleteChat);

export default router;