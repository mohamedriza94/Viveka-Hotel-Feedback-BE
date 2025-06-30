import { ENUM_IdType } from "./enum";

export type TGuest = {
  name: string;
  contactNumber: {
    countryCode: string;
    localNumber: string;
  };
  identification: {
    type: ENUM_IdType;
    code: string;
  };
  picture: string;
  dependents: {
    identification: {
      type?: ENUM_IdType;
      code?: string;
      picture: string;
    };
  }[];
  isAcceptedPolicy: boolean;
  createdAt: Date;
  updatedAt: Date;
};
