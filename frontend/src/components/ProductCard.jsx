import { EditIcon, Trash2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore.js'

const ProductCard = ({product}) => {

    const {deleteProduct} = useProductStore();

    const [showConfirm, setShowConfirm] = useState(false);
      const confirmDelete = () => {
      //console.log("Delete clicked");
      setShowConfirm(true);
    };

  return (
    <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300'>
      
        {/* Product IMAGE */}
        <figure className='relative pt-59.25'>
            <img src={product.image} alt={product.name}
                 className='absolute top-0 left-0w-full h-full object-cover'/>
        </figure>

        <div className='card-body'>
            {/* Product INFO */}
            <h2 className='card-title text-lg font-semibold'>{product.name}</h2>
            <p className='text-2xl font-bold text-primary'>${Number(product.price).toFixed(2)}</p>

            {/* Card Action */}
            <div className='card-actions justify-end mt-4'>
                <Link to={`/product/${product.id}`} className='btn btn-sm btn-info btn-outline'>
                    <EditIcon className='size-4'/>
                </Link>

                <button className='btn btn-sm btn-error btn-outline'
                        onClick={confirmDelete}
                >
                    <Trash2Icon className='size-4' />
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
                              onClick={() => deleteProduct(product.id)}
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

            </div>

        </div>


    </div>
  )
}

export default ProductCard
