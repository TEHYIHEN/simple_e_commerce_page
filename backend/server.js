import express from "express";
import helmet, { contentSecurityPolicy } from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath} from "url";

import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(__filename);

//console.log(PORT);

app.use(express.json());

app.use(cors());
app.use(helmet({contentSecurityPolicy:false})); //Helmet is a Node.js middleware that improves web app security by setting safe HTTP headers.
app.use(morgan("dev")); //Morgan is an Express middleware that logs HTTP requests to help with debugging and monitoring.

/*app.get("/test", (req,res) => {;
    console.log(res.getHeaders());
    res.send("Hello From the test route")
})*/

//apply Arcjet rate-limit to all routes
app.use(async(req, res, next) => {

    try {
        const decision = await aj.protect(req, {
            
            requested:1, //each request consume 1 token

        });

        if(decision.isDenied()){
            if (decision.reason.isRateLimit()) {
                res.status(429).json({error:"Too many requests"});
            }else if(decision.reason.isBot()){
                res.status(403).json({error:"Bot access denied"});
            }else {
                res.status(403).json({error:"Forbidden"});
            }
            return;
        }

        //check for spoofed bots
        if(decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())){
            res.status(403).json({error:"Spoofed bot detected"});
        }

        next();

    } catch (error) {
        console.error("Arcjet error", error);
        next(error);
    }

});

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production"){
    
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));

    app.get(/.*/, (_,res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
    })
}

async function initDB() {
    try {

        await sql`
            CREATE TABLE IF NOT EXISTS products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `
        console.log("Database initialized successfully");
        
    } catch (error) {
        console.error("Error initDB",error);
    }
}

initDB();

app.listen(PORT,()=>{
    console.log("Server is running in port " + PORT);
})
