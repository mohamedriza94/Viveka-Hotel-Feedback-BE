import { Schema, model } from "mongoose";
import { ERoomStatuses } from "./enum";
import { TRoom } from "./t";

const RoomSchema = new Schema<TRoom>(
  {
    no: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      default: ERoomStatuses.ACTIVE,
    },
    qrCode: {
      url: {
        type: String,
        required: true,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Room = model<TRoom>("Room", RoomSchema);
