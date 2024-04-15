import React, { useEffect, useRef, useState } from 'react';
import "./Products.scss";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetails, updateProduct } from '../../../api/product.api';
import { Button, FormInput } from '../../../components';
import { getAllCategories } from '../../../Store/CategorySlice';
import { toast } from 'react-toastify';

const UpdateProduct = () => {
    const navigate = useNavigate();
    const disptach = useDispatch();
    const { id } = useParams();
    const { categories } = useSelector((state) => state.category);

    const [product, setProduct] = useState({
        title: '',
        price: 0,
        description: '',
        category: '',
        countInStock: '',
        formdata: new FormData()
    });
    const { title, price, description, countInStock, formdata } = product;

    const category_ref = useRef();  

    useEffect(() => {
        const fetchData = async () => {
            disptach(getAllCategories());
            await getProductDetails(id)
                .then((data) => {
                    if (data.err) {
                        toast.error(data.err);
                        return navigate('/dashboard/products');
                    }
                    else {
                        setProduct({ ...product, ...data.product });
                        category_ref.current.value = data.product.category?._id;
                        formdata.set('title', data.product.title);
                        formdata.set('price', data.product.price);
                        formdata.set('description', data.product.description);
                        formdata.set('countInStock', data.product.countInStock);
                        formdata.set('category', data.product.category._id);
                    }
                })
        }
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            formdata.set(e.target.name, e.target.files[0]);
        }
        else {
            setProduct({...product, [e.target.name]: e.target.value});
            formdata.set(e.target.name, e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProduct(id, formdata)
            .then(data => {
                if (data.err) {
                    toast.error(data.err)
                }
                else {
                    toast.success(data.msg);
                    return navigate('/dashboard/products');
                }
            })
    }

    return (
        <div className='add-product-container'>
            <h3>Update Product</h3>
            <form action="post" encType='multipart/form-data'>
                <FormInput
                    label='Product Name'
                    type="text"
                    required
                    onChange={handleChange}
                    name='title'
                    value={title}
                />

                <FormInput
                    type="file"
                    required
                    onChange={handleChange}
                    name='image'
                />

                <FormInput
                    label='Price'
                    type="text"
                    required
                    onChange={handleChange}
                    name='price'
                    value={price}
                />

                <FormInput
                    label='Description'
                    type="text"
                    required
                    onChange={handleChange}
                    name='description'
                    value={description}
                />

                <div className="group">
                    <select
                        name="category"
                        id="category"
                        className='form-input'
                        onChange={handleChange}
                        ref={category_ref}
                    >
                        {
                            categories && categories.map((category) => {
                                return <option key={category._id} value={category._id}>{category.categoryName}</option>
                            })
                        }
                    </select>
                </div>

                <FormInput
                    label='Count In Stock'
                    type="text"
                    required
                    onChange={handleChange}
                    name='countInStock'
                    value={countInStock}
                />

                <div className="buttons-container">
                    <Button onClick={handleSubmit}>Update Product</Button>
                    <Button onClick={() => navigate("/dashboard/products")}>Cancel</Button>
                </div>
            </form>
        </div>
    )
}

export default UpdateProduct