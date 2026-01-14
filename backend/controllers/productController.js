import { sql } from "../config/db.js";


//CRUD
export const getProducts = async(req,res) =>{
    try {
        
        const products = await sql`
            SELECT*FROM products
            ORDER BY created_at DESC
        `;

        console.log("fetched products", products);
        
        res.status(200).json({success:true, data: products});// why no [0], because the result have multi row/record/result.

    } catch (error) {
        console.error("Failed to fecth data in getProducts", error);
        res.status(500).json({success:false, message:"Internal server Error"});
    }
};

export const getProduct = async(req,res) =>{

    const {id} = req.params;

    try {

        const product = await sql`
            SELECT*FROM products WHERE id=${id}
        `

        res.status(200).json({success:true, data:product[0]}); //We use [0] because the database library always returns an array, even when the result is logically unique — and we only want the single (unique) row/record/result.
        
    } catch (error) {
       console.error("Failed to fecth data in getProduct", error);
       res.status(500).json({success:false, message:"Internal server Error"});
    }
};

export const createProduct = async(req,res) => {

    const {name,price,image} = req.body;

    if(!name || !price || !image){
        return res.status(400).json({success:false, message:"All fields are required"});
    }

    try {
        
       const newProduct = await sql`
            INSERT INTO products (name,price,image)
            VALUES (${name},${price},${image})
            RETURNING *
        `
        console.log("new product added: ", newProduct);

        res.status(201).json({success:true, data: newProduct[0]});
        

    } catch (error) {
        console.error("Failed to fecth data in createProduct", error);
        res.status(500).json({success:false, message:"Internal server Error"});
    }
};

export const updateProduct = async(req,res) => {

    const {id} = req.params;
    const {name, price, image} = req.body;

    try {
        //COALESCE use to avoid field = null , mean if fill in one of them(name, price, image), other record remain same
        const updateProduct = await sql`
            UPDATE products
            SET 
                name= COALESCE(${name}, name), 
                price= COALESCE(${price}, price), 
                image= COALESCE(${image}, image)

            WHERE id=${id}
            RETURNING *
        `
        if(updateProduct.length === 0){
            return res.status(404).json({success:false, message:"Product not found"})
        };

        res.status(200).json({success:true, data:updateProduct[0]});


    } catch (error) {
        console.error("Failed to fecth data in updateProduct", error);
        res.status(500).json({success:false, message:"Internal server Error"});
    }

};

export const deleteProduct = async(req,res) => {

    const {id} = req.params;

    try {
        
        const deleteProduct = await sql`
            DELETE FROM products
            WHERE id=${id}
            RETURNING *
        `

        res.status(200).json({success:true , data:deleteProduct[0]});

    } catch (error) {
       console.error("Failed to fecth data in deleteProduct", error);
       res.status(500).json({success:false, message:"Internal server Error"});
    }
};