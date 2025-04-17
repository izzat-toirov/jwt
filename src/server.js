import express from "express";

import { connectionDB } from "./db.js/db.js";
import { userRouter } from "./routers/user.js";
import { productRouter } from "./routers/product.js";
import { categoryRouter } from "./routers/category.js";


const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());
connectionDB();

app.use("/user", userRouter);
app.use('/product', productRouter);
app.use('category', categoryRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
