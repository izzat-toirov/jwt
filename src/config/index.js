export const config = {
    api: {
      port: process.env.PORT,
    },
    db: {
      url: process.env.DATABASE_URL,
    },
    jwt: {
      access: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
      },
      refresh: {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
      },
    },
  };
  