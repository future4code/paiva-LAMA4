import { app } from "./data/app";
import { bandRouter } from "./routes/bandRouter";
import { showRouter } from "./routes/showRouter";
import { userRouter } from "./routes/userRouter";

app.use("/band", bandRouter)

app.use("/show", showRouter)

app.use("/user", userRouter)