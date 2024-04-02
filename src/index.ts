import "./data-source"
import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response, NextFunction } from "express"
import userRoutes from './routes/user.routes';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: err.message ?? "something is wrong" });
});
app.get("/", (req: Request, res: Response) => res.send("Hello postgres"));

app.use("/", userRoutes);





const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});