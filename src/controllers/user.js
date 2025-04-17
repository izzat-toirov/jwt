import { User } from "../modules/user.js";
import { hashedPassword, verifyPassword } from "../common/constants/bcrypt.js";
import { jwtAccessToken, jwtRefreshTokenGenerator } from "../common/constants/jwt.js";

export const userController = {
    signUp: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res.status(400).json({ message: "username, email, and password are required" });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: "User already exists!" });
            }

            const hashed = await hashedPassword(password);
            const newUser = new User({
                username,
                email,
                password: hashed,
            });

            await newUser.save();
            return res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

    signIn: async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ message: "username and password are required" });
            }

            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const match = await verifyPassword(password, user.password);
            if (!match) {
                return res.status(401).json({ message: "Wrong password" });
            }
            const payload = {
                id: user._id,
                username: user.username,
                email: user.email
            };

            const accessToken = jwtAccessToken(payload);
            const refreshToken = jwtRefreshTokenGenerator(payload);

            return res.status(200).json({
                message: "Login successful",
                accessToken,
                refreshToken,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
