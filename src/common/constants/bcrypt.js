import { hash, compare } from "bcrypt";

export const hashedPassword = async (password) => {
    return hash(password, 10);
};

export const verifyPassword = async (userPassword, storedHash) => {
    const isMatch = await compare(userPassword, storedHash);
    console.log(isMatch ? "✅ Correct" : "❌ Incorrect");
    return isMatch;
}