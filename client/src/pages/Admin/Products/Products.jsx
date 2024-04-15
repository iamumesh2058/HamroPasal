import React, { useEffect } from 'react';
import "./Products.scss";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../Store/ProductsSlics';
import { Button } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../../api/product.api';
import { toast } from 'react-toastify';

const Products = () => {
    const navigate = useNavigate();
    const disptach = useDispatch();
    const { products } = useSelector((state) => state.product);

    useEffect(() => {
        disptach(getAllProducts());
    }, []); 

    const handleDeleteProduct = async (id) => {
        await deleteProduct(id)
            .then((data) => {
                if (data.err) {

                    toast.error(data.err);
                }
                else {
                    toast.success(data.msg);
                    return navigate({ to: "/dashboard/products", reloadDocument: true});
                }
            });
    }

    return (
        <div className='admin-product-container'>
            <div className="product-title">
                <h3>Products</h3>
                <Button onClick={() => navigate("/dashboard/add-product")}>Add Product</Button>
            </div>

            {
                products && products.length>1 ?
                    <table>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Product</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Available</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                products && products.map((product, i) => {
                                    return (
                                        <tr key={i} className='category-header'>
                                            <td>
                                                {i + 1}
                                            </td>
                                            <td>
                                                {product.title}
                                            </td>
                                            <td>
                                                <div className="image-container">
                                                    <img src={product.image} alt={product.title} />
                                                </div>
                                            </td>
                                            <td>
                                                Rs. {product.price}
                                            </td>
                                            <td>
                                                {product.countInStock}
                                            </td>
                                            <td className="buttons">
                                                <Button onClick={() => navigate(`/dashboard/update-product/${product._id}`)}>Update</Button>
                                                <Button onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                    :
                    <h4>No products yet</h4>
            }

        </div>
    )
}

export default Products;