import { StatusCodes } from "http-status-codes";
import { TRoom } from "../../entities/room/t";
import { TReturnObj } from "../../types/returnObj";
import { isValidObjectId } from "mongoose";
import { Room } from "../../entities/room/model";
import { generateQrCode } from "../utils/generate-qr-code";

export const RegenerateQrCode = async (
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

    const room = await Room.findById(trimmedRoomId);

    if (!room) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        messages: ["Room was not found"],
        responseCode: "NOT_FOUND",
      };
    }

    const { qrCodeUrl, token } = await generateQrCode();

    room.token = token;
    room.qrCode = {
      url: qrCodeUrl,
      updatedAt: new Date(),
    };

    await room.save();

    return {
      statusCode: StatusCodes.OK,
      messages: ["QR code successfully regenerated"],
      responseCode: "SUCCESS",
      data: {
        room: {
          no: room.no,
          qrCode: qrCodeUrl,
        },
      },
    };
  } catch (e) {
    console.error("Error regenerating QR code:", e);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      messages: ["Internal Server Error"],
      responseCode: "INTERNAL_SERVER_ERROR",
    };
  }
};
