import { z } from "zod";
import { ERoomStatuses } from "../../entities/room/enum";

export const ZOD_roomSchema = z.object({
  no: z
    .string({
      required_error: "Room number is required",
      invalid_type_error: "Room number must be a string",
    })
    .min(1, "Room number cannot be empty"),
  status: z
    .nativeEnum(ERoomStatuses, {
      required_error: "Status is required",
      invalid_type_error: "Status must be a valid enum value",
    })
    .refine(
      (value) => Object.values(ERoomStatuses).includes(value),
      "Status must be either 'active' or 'inactive'"
    ),
});

export type RoomValidationType = z.infer<typeof ZOD_roomSchema>;
