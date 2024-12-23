import { Router } from "express";
import { ReadRoomNo } from "../../controllers/rooms/read-room-no";

const roomRoutes = Router();

roomRoutes.get("/read-room-no/:roomToken", async (req, res) => {
  const result = await ReadRoomNo(req.params.roomToken);

  return res.status(result.statusCode).json({
    responseCode: result.responseCode,
    messages: result.messages,
    data: result.data || null,
  });
});

export default roomRoutes;
