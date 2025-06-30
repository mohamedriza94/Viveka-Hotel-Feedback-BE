import { Schema, model } from "mongoose";
import { TGuest } from "./t";
import { ENUM_IdType } from "./enum";

const GuestSchema = new Schema<TGuest>(
  {
    name: { type: String, required: true },
    contactNumber: {
      countryCode: { type: String, required: true },
      localNumber: { type: String, required: true },
    },
    identification: {
      type: {
        type: String,
        enum: Object.values(ENUM_IdType),
        required: true,
      },
      code: { type: String, required: true, unique: true },
    },
    picture: { type: String, required: true },
    dependents: [
      {
        identification: {
          type: {
            type: String,
            enum: Object.values(ENUM_IdType),
          },
          code: { type: String },
          picture: { type: String },
        },
      },
    ],
    isAcceptedPolicy: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

export const Guest = model<TGuest>("Guest", GuestSchema);
