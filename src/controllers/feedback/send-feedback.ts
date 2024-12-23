import { StatusCodes } from "http-status-codes";
import { TReturnObj } from "../../types/returnObj";
import { trimInputs } from "../../utils/trim-inputs";
import { Room } from "../../entities/room/model";
import { TEmailOptions } from "../../configurations/email-api/types";
import { sendTransactionalEmail } from "../../configurations/email-api/brevo";

type TFeedbackPayload = {
  roomToken: string;
  email: string;
  question1: string;
  question2: string;
  question3: string;
};

export const SendFeedback = async (
  inputs: TFeedbackPayload
): Promise<TReturnObj> => {
  try {
    const trimmedInputs: typeof inputs = trimInputs(inputs);

    const room = await Room.findOne({ token: trimmedInputs.roomToken })
      .select("no")
      .lean();
    if (!room) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        responseCode: "NOT_FOUND",
        messages: ["Room was not found"],
      };
    }

    const emailOptions: TEmailOptions = {
      to: [{ email: trimmedInputs.email, name: trimmedInputs.email }],
      subject: "Feedback",
      templateType: "brevo",
      templateData: {
        id: "10",
        params: {
          roomNo: room.no,
          email: trimmedInputs.email,
          question1: trimmedInputs.question1,
          question2: trimmedInputs.question2,
          question3: trimmedInputs.question3,
        },
      },
    };
    const resetLinkEmailSent = await sendTransactionalEmail(emailOptions);

    if (!resetLinkEmailSent) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        messages: [
          "Couldn't send your feedback at this time. Please try again in a while.",
        ],
      };
    } else {
      return {
        statusCode: StatusCodes.OK,
        messages: ["Feedback sent successfully!"],
      };
    }
  } catch (e) {
    console.error("Error sending feedback:", e);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      messages: ["Internal Server Error"],
    };
  }
};
