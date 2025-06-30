import { z } from "zod";
import { ENUM_IdType } from "../../../entities/guest/enum";

export const ZOD_guestSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name cannot be empty"),

  contactNumber: z.object({
    countryCode: z
      .string({ required_error: "Country code is required" })
      .min(1, "Country code cannot be empty"),

    localNumber: z
      .string({ required_error: "Local number is required" })
      .min(1, "Local number cannot be empty"),
  }),

  identification: z.object({
    type: z.nativeEnum(ENUM_IdType, {
      required_error: "Identification type is required",
      invalid_type_error: "Invalid identification type",
    }),
    code: z
      .string({ required_error: "Identification code is required" })
      .min(1, "Identification code cannot be empty"),
  }),

  picture: z
    .string({ required_error: "Picture URL is required" })
    .min(1, "Picture URL cannot be empty"),

  dependents: z
    .array(
      z.object({
        identification: z.object({
          type: z
            .nativeEnum(ENUM_IdType)
            .optional()
            .refine(
              (val) =>
                val === undefined || Object.values(ENUM_IdType).includes(val),
              {
                message: "Invalid dependent ID type",
              }
            ),
          code: z.string().optional(),
          picture: z
            .string({ required_error: "Dependent picture is required" })
            .min(1, "Dependent picture URL cannot be empty"),
        }),
      })
    )
    .optional(),

  isAcceptedPolicy: z.boolean({
    required_error: "You must accept the policy",
    invalid_type_error: "Policy acceptance must be a boolean",
  }),
});
