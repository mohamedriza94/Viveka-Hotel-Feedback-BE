import { Router } from "express";
import { SendFeedback } from "../../controllers/feedback/send-feedback";

const feedbackRoutes = Router();

feedbackRoutes.post("/send-feedback", async (req, res) => {
  const result = await SendFeedback(req.body);

  return res.status(result.statusCode).json({
    responseCode: result.responseCode,
    messages: result.messages,
    data: result.data || null,
  });
});

export default feedbackRoutes;
