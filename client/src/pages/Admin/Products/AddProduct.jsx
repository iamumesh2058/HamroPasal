import React, { useEffect, useState } from 'react';
import { Button, FormInput } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../../Store/CategorySlice';
import { addProduct } from '../../../api/product.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();
    const disptach = useDispatch();
    const { categories } = useSelector((state) => state.category);

    const [product, setProduct] = useState({
        title: '',
        price: 0,
        description: '',
        category: '',
        countInStock: '',
        formdata: new FormData()
    })
    const { title, price, description, countInStock, formdata } = product;

    useEffect(() => {
        disptach(getAllCategories());
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.name === 'image') {
            formdata.set(e.target.name, e.target.files[0]);
        }
        else {
            setProduct({ ...product, [e.target.name]: e.target.value });
            formdata.set(e.target.name, e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addProduct(formdata)
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
            <h3>Add New Product</h3>
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

                <Button onClick={handleSubmit}>Add Product</Button>
            </form>
        </div>
    )
}

export default AddProduct