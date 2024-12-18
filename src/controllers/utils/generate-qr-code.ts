import QRCode from "qrcode";
import { envData } from "../../constants/env-data";
import { frontendPaths } from "../../constants/paths";
import { nanoid } from "nanoid";
import { generateRandomPassword } from "../../utils/generate-random-password";

export const generateQrCode = async () => {
  const token = nanoid(60);

  const modifiedToken = token.replace(
    token.substring(0, 3),
    generateRandomPassword()
  );

  const qrCodeUrl = await QRCode.toDataURL(
    `${envData.frontendURI}${frontendPaths.feedbackForm}?room=${modifiedToken}`
  );

  return { token: modifiedToken, qrCodeUrl };
};
