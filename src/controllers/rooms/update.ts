import { StatusCodes } from "http-status-codes";
import { TReturnObj } from "../../types/returnObj";
import { TRoom } from "../../entities/room/t";
import { Room } from "../../entities/room/model";
import { isValidObjectId } from "mongoose";
import { trimInputs } from "../../utils/trim-inputs";
import { ZOD_roomSchema } from "../utils/zod-schema";
import { zodValidate } from "../../utils/zod-validation";
import { getModifiedFields } from "../../utils/get-modified-fields";

export const UpdateRoom = async (
  inputs: Partial<TRoom>
): Promise<TReturnObj> => {
  try {
    const { id, ...restInputs } = trimInputs(inputs);
    const trimmedRoomId = id;

    if (!isValidObjectId(trimmedRoomId)) {
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

    const combinedInputs = { ...room, ...restInputs };
    const zodValidationErrors = zodValidate(ZOD_roomSchema, combinedInputs);
    if (zodValidationErrors) {
      return zodValidationErrors;
    }

    const modifiedFields = getModifiedFields(restInputs, room);

    if (Object.keys(modifiedFields).length > 0) {
      const result = await Room.findByIdAndUpdate(
        trimmedRoomId,
        modifiedFields,
        { new: true }
      );

      return {
        statusCode: StatusCodes.OK,
        messages: ["Room Details Updated"],
        data: {
          room: result?.toObject(),
        },
      };
    } else {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        responseCode: "NO_CHANGES_DETECTED",
        messages: ["No changes detected"],
      };
    }
  } catch (e) {
    console.error("Error update room:", e);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      messages: ["Internal Server Error"],
    };
  }
};
