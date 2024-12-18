import { StatusCodes } from "http-status-codes";
import { TReturnObj } from "../../types/returnObj";
import { trimInputs } from "../../utils/trim-inputs";
import { zodValidate } from "../../utils/zod-validation";
import { ZOD_roomSchema } from "../utils/zod-schema";
import { Room } from "../../entities/room/model";
import { generateQrCode } from "../utils/generate-qr-code";
import { HttpStatusCode } from "axios";
import { TRoom } from "../../entities/room/t";

export const CreateRoom = async (
  inputs: Partial<TRoom>
): Promise<TReturnObj> => {
  try {
    const trimmedInputs: typeof inputs = trimInputs(inputs);

    const zodValidationErrors = zodValidate(ZOD_roomSchema, trimmedInputs);
    if (zodValidationErrors) {
      return zodValidationErrors;
    }

    const isRoomExist = await Room.exists({ no: trimmedInputs.no });
    if (isRoomExist) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        responseCode: "DUPLICATION",
        messages: ["A Room with the same Room No. already exists"],
      };
    }

    // Generate QR Code
    if (!trimmedInputs.no) {
      return {
        statusCode: HttpStatusCode.BadRequest,
        messages: ["Room No. is missing"],
        responseCode: "UNDEFINED_INPUT",
      };
    }

    const { qrCodeUrl, token } = await generateQrCode();

    const newRoom = await Room.create({
      ...trimmedInputs,
      qrCode: {
        url: qrCodeUrl,
        updatedAt: new Date(),
      },
      token,
    });

    return {
      statusCode: StatusCodes.CREATED,
      responseCode: "CREATED",
      messages: ["Room created successfully"],
      data: {
        room: {
          no: newRoom.no,
          qrCode: qrCodeUrl,
        },
      },
    };
  } catch (e) {
    console.error("Error creating room:", e);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      messages: ["Internal Server Error"],
    };
  }
};
