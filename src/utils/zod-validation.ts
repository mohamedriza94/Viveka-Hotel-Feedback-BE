import { ZodSchema } from "zod";
import { TReturnObj } from "../types/returnObj";
import { StatusCodes } from "http-status-codes";

export const zodValidate = <T>(
  schema: ZodSchema<T>,
  inputs: unknown
): TReturnObj | null => {
  const result = schema.safeParse(inputs);

  if (!result.success) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      responseCode: "ZOD",
      messages: result.error.errors.map((err) => err.message),
    };
  }

  return null;
};
