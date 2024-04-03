import "./data-source"
import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response, NextFunction } from "express"
import { userRoutes, movieRoutes } from './routes/main'
import * as path from 'path'

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, '..', 'uploads')));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: err.message ?? "something is wrong" });
});
app.get("/", (req: Request, res: Response) => res.send("Hello postgres"));

app.use("/", userRoutes);
app.use("/movie", movieRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});