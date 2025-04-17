import jwt from "jsonwebtoken";

export const jwtAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    });
};

export const jwtAccessTokenVerify = (accessToken) => {
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
};

export const jwtRefreshTokenGenerator = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    });
};

export const jwtRefreshTokenVerify = (refreshToken) => {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
};
