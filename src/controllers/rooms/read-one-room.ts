import { StatusCodes } from "http-status-codes";
import { TReturnObj } from "../../types/returnObj";
import { TRoom } from "../../entities/room/t";
import { Room } from "../../entities/room/model";
import { isValidObjectId } from "mongoose";

export const ReadOneRoom = async (
  roomId: TRoom["id"]
): Promise<TReturnObj> => {
  try {
    const trimmedRoomId = roomId?.trim();

    if (!roomId || !isValidObjectId(trimmedRoomId)) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        messages: ["Invalid Room ID"],
        responseCode: "INVALID_IDENTIFIER",
      };
    }

    const room = await Room.findById(trimmedRoomId).lean();

    if (!room) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        messages: ["Room was not found"],
        responseCode: "NOT_FOUND",
      };
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        room,
      },
    };
  } catch (e) {
    console.error("Error reading room:", e);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      messages: ["Internal Server Error"],
    };
  }
};
