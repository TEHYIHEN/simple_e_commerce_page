import express from "express";
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

/*router.get("/", (req,res) => {
    //GET ALL product
    
});

router.post("/", (req,res) => {
    //Create a product
});*/

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);


export default router;