import { getChatResponse } from "../services/chatService.js";

export const chat = async (req, res, next) => {
  try {
    const { message } = req.body;

    const response = await getChatResponse(message);

    res.status(200).json({
      success: true,
      message: response,
    });
  } catch (error) {
    next(error);
  }
};