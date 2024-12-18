import { ERoomStatuses } from "./enum";

export type TRoom = {
  id?: string;
  no: string;
  token: string;
  status: ERoomStatuses;
  qrCode: {
    url: string;
    updatedAt: Date;
  };
};
