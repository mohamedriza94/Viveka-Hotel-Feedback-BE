import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashText = async (text: string): Promise<string | null> => {
  try {
    return await bcrypt.hash(text, SALT_ROUNDS);
  } catch (error) {
    console.error("Error hashing text:", error);
    return null;
  }
};

export const compareHashedText = async (
  plainText: string,
  hashedText: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(plainText, hashedText);
  } catch (error) {
    console.error("Error comparing hashed text:", error);
    return false;
  }
};
