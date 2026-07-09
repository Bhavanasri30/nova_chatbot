export const sendSuccess = (res, data, statusCode = 200) => {
  res.status(statusCode).json(data);
};

export const sendError = (res, message, statusCode = 400) => {
  res.status(statusCode).json({ error: message });
};
