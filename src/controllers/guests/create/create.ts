import { StatusCodes } from "http-status-codes";
import { TReturnObj } from "../../../types/returnObj";
import { trimInputs } from "../../../utils/trim-inputs";
import { zodValidate } from "../../../utils/zod-validation";
import { TGuest } from "../../../entities/guest/t";
import { ZOD_guestSchema } from "./zod-schema";
import { Guest } from "../../../entities/guest/model";

export const CreateGuest = async (inputs: TGuest): Promise<TReturnObj> => {
  try {
    const ti: typeof inputs = trimInputs(inputs);

    const zodValidationErrors = zodValidate(ZOD_guestSchema, ti);
    if (zodValidationErrors) {
      return zodValidationErrors;
    }

    // ------------------------

    const existingGuest = await Guest.findOne({
      $or: [
        { "contactNumber.localNumber": ti.contactNumber.localNumber },
        { "identification.code": ti.identification.code },
      ],
    });
    if (existingGuest) {
      const duplicateFields: string[] = [];

      if (
        existingGuest.contactNumber.localNumber === ti.contactNumber.localNumber
      ) {
        duplicateFields.push("local number");
      }

      if (existingGuest.identification.code === ti.identification.code) {
        duplicateFields.push("identification code");
      }

      return {
        statusCode: StatusCodes.BAD_REQUEST,
        responseCode: "DUPLICATION",
        messages: [
          `A guest with the same ${duplicateFields.join(
            " and "
          )} already exists`,
        ],
      };
    }

    // ------------------------

    const newGuest = await Guest.create(ti);

    return {
      statusCode: StatusCodes.CREATED,
      responseCode: "CREATED",
      messages: ["Guest details saved successfully"],
      data: {
        guest: newGuest.toObject(),
      },
    };
  } catch (e) {
    console.error("Error creating guest:", e);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      messages: ["Internal Server Error"],
    };
  }
};
