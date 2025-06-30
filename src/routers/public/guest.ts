import { Router } from "express";
import { CreateGuest } from "../../controllers/guests/create/create";

const guestRoutes = Router();

guestRoutes.post("/create", async (req, res) => {
  const result = await CreateGuest(req.body);

  return res.status(result.statusCode).json({
    responseCode: result.responseCode,
    messages: result.messages,
    data: result.data || null,
  });
});

export default guestRoutes;
