import {create} from 'zustand';
import axios from "axios";
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useProductStore = create((set,get)=>({

    products:[],
    loading:false,
    error:null, // it meaning no error currently.
    
    currentProduct: null,

    //form state
    formData: {
        name:"",
        price:"",
       image:"",
    },

    setFormData: (formData) => set({formData}),
    resetForm:()=> set({formData:{name:"", price:"", image:""}}),
 
    addProduct: async(e) => {
        e.preventDefault();
        set({loading :true});

        try {
            const {formData} = get(); //  meaning get the current value which user has key in
            await axios.post(`${BASE_URL}/api/products`, formData);
            await get().fetchProducts();
            get().resetForm();
            toast.success("Product added successfully");
            document.getElementById("add_product_modal").close();

        } catch (error) {
            console.error("Error in addProduct function", error);
            toast.error("Something went wrong");
        }finally {
            set({loading:false});
        }
    },
    

    fetchProducts: async () => {

        set({loading:true});
        try {

            const response = await axios.get(`${BASE_URL}/api/products`);
            set({products:response.data.data , error:null});

        } catch (err) {

            if(err.status === 429) set({error:"Rate limit exceeded", products:[]});
            else set({error:"Something went wrong", products:[]});
            
        }finally{
            set({loading:false});
        }
    },

    deleteProduct: async(id) =>{
        set({loading:true});
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`);
            set(prev => ({products: prev.products.filter(product => product.id !==id)}));
            toast.success("Product deleted successfully!")
        } catch (error) {
            console.error("Error in deleteProduct function", error);
            toast.error("Something went wrong");
        }finally{
            set({loading:false});
        }
    },

    fetchToOneProduct: async (id) => {
        set({loading:true});
        try {
            
            const response = await axios.get(`${BASE_URL}/api/products/${id}`);
            set({
                currentProduct: response.data.data,
                formData: response.data.data, //pre-fill form with current product data
                error: null,
            });


        } catch (error) {

            console.error("Error in fetchToOneProduct function", error);
            set({
                error:"Something went wrong",
                currentProduct:null
            })
            
        }finally{

            set({loading:false});
        }
    },

    updateProduct: async (id) => {
        set({loading:true});

        try {

            const {formData} = get();
            const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
            set({currentProduct: response.data.data});
            toast.success("Priduct updated succesfully");

            
        } catch (error) {
            
            toast.error("Something went wrong");
            console.error("Error in updateProduct function", error)

        }finally{
            set({loading:false});
        }
    }
}));