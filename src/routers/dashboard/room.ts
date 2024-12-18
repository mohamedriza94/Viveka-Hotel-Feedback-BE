import { Router } from "express";
import { CreateRoom } from "../../controllers/rooms/create";
import { ReadOneRoom } from "../../controllers/rooms/read-one-room";
import { RegenerateQrCode } from "../../controllers/rooms/regenerate-qr-code";
import { UpdateRoom } from "../../controllers/rooms/update";
import { TRoom } from "../../entities/room/t";
import {
  ReadManyRooms,
  TRoomsQueryParams,
} from "../../controllers/rooms/read-many-rooms";
import { StatusCodes } from "http-status-codes";

const roomRoutes = Router();

roomRoutes.post("/create-room", async (req, res) => {
  const roomData: Partial<TRoom> = req.body;

  const result = await CreateRoom(roomData);

  return res.status(result.statusCode).json({
    responseCode: result.responseCode,
    messages: result.messages,
    data: result.data || null,
  });
});

roomRoutes.get("/read-one-room/:roomId", async (req, res) => {
  const result = await ReadOneRoom(req.params.roomId);

  return res.status(result.statusCode).json({
    responseCode: result.responseCode,
    messages: result.messages,
    data: result.data || null,
  });
});

roomRoutes.get("/read-many-rooms", async (req, res) => {
  const queryParams = req.query as unknown as TRoomsQueryParams;
  const result = await ReadManyRooms(queryParams);

  return res.status(result.statusCode).json({
    responseCode: result.responseCode,
    messages: result.messages,
    data: result.data || null,
  });
});

roomRoutes.get("/regenerate-qr-code/:roomId", async (req, res) => {
  const result = await RegenerateQrCode(req.params.roomId);

  return res.status(result.statusCode).json({
    responseCode: result.responseCode,
    messages: result.messages,
    data: result.data || null,
  });
});

roomRoutes.put("/update-room", async (req, res) => {
  const roomData: Partial<TRoom> = req.body;

  const result = await UpdateRoom(roomData);

  return res.status(result.statusCode).json({
    responseCode: result.responseCode,
    messages: result.messages,
    data: result.data || null,
  });
});

export default roomRoutes;
