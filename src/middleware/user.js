import { jwtAccessTokenVerify } from "../common/constants/jwt.js"; // DIQQAT: verify funksiyani import qilish kerak
import { User } from "../modules/user.js";

export const middleware = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(" ")[1];
        if (!token) {
            return res.status(404).json({ message: "Token not provided" });
        }

        const decoded = jwtAccessTokenVerify(token);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}
