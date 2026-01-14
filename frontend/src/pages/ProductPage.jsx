import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore.js"
import { useEffect, useState } from "react";
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react";

const ProductPage = () => {

  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchToOneProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();

  const navigate = useNavigate();
  const {id} = useParams(); 

  useEffect(()=> {
    fetchToOneProduct(id);
  }, [fetchToOneProduct, id]);

  //console.log(currentProduct); //testing the fetchToOneProduct, check the console result

  const handleDelete = async () => {
   
    //if(window.confirm)("Are you sure want to delete this product")
    await deleteProduct(id);
    navigate("/");
  } 

  const [showConfirm, setShowConfirm] = useState(false);
  const confirmDelete = () => {
  //console.log("Delete clicked");
  setShowConfirm(true);
};



   if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button onClick={()=> navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden shadow-lg  bg-base-100">
          <img src={currentProduct?.image} alt={currentProduct?.name} className="size-full object-cover"/>
        </div>

        {/* Product Form */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Edit Product</h2>

            <form onSubmit={(e) => {
                    e.preventDefault();
                    updateProduct(id);
            }}
                 
            >
              
                <div className="space-y-12">
                  {/* Product Name */}
                  <div>
                  <label className="label">
                    <span className="text-base font-medium mb-1">Product Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    className="input rounded-4xl w-full"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  </div>
                  {/* Product Price */}
                  <div>
                  <label className="label">
                    <span className="text-base font-medium mb-1">Price</span>
                  </label>
                  <input
                    type="text"
                    placeholder="0.00"
                    className="input rounded-4xl w-full"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                  </div>
                  {/* Product Image */}
                  <div>
                  <label className="label">
                    <span className="text-base font-medium mb-1">Image URL</span>
                  </label>
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    className="input rounded-4xl w-full"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                  </div>

                 


                </div>

                 {/* Form Action */}
                  <div className="flex justify-between mt-12 gap-3">
                    <button type="button" onClick={confirmDelete} className="btn btn-error flex-1">
                    <Trash2Icon className="size-4 mr-2" />
                      Delete Product
                    </button>

                    {showConfirm && (
                      <div className="modal modal-open">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Confirm Delete</h3>
                          <p className="py-4">Are you sure you want to delete this product?</p>

                          <div className="modal-action">
                            <button
                              type="button"
                              className="btn btn-error flex-1"
                              onClick={handleDelete}
                            >
                            Confirm
                            </button>

                            <button
                              type="button"
                              className="btn flex-1"
                              onClick={() => setShowConfirm(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}


                    <button
                      type="submit"
                      className="btn btn-primary flex-1"
                      disabled={loading || !formData.name || !formData.price || !formData.image}
                    >
                      {loading ? (<span className="loading loading-spinner loading-sm" />) 
                               : (
                                  <>
                                    <SaveIcon className="size-4 mr-2" />
                                    Save Changes
                                  </>
                      )}
                </button>
              </div>
            </form>

          </div>
        </div>

      </div>
      
    </div>
  )
}

export default ProductPage
