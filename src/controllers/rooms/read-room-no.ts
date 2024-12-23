import { StatusCodes } from "http-status-codes";
import { TReturnObj } from "../../types/returnObj";
import { TRoom } from "../../entities/room/t";
import { Room } from "../../entities/room/model";

export const ReadRoomNo = async (
  roomToken: TRoom["token"]
): Promise<TReturnObj> => {
  try {
    const trimmedRoomToken = roomToken?.trim();

    if (!trimmedRoomToken) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        messages: ["Invalid Room Token"],
        responseCode: "INVALID_IDENTIFIER",
      };
    }

    const room = await Room.findOne({ token: trimmedRoomToken }).lean();

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
        roomNo: room.no,
      },
    };
  } catch (e) {
    console.error("Error reading room no:", e);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      messages: ["Internal Server Error"],
    };
  }
};
