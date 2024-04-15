import React, { useEffect, useState } from 'react';
import { updateCategory, getCategoryDetails } from '../../../api/category.api';
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom"
import { Button, FormInput } from '../../../components';
import "./Category.scss";

const UpdateCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        categoryName: '',
        image: '',
        formdata: new FormData()
    });

    useEffect(() => {
        getCategoryDetails(id)
            .then((data) => {
                if (data.err) {
                    toast.error(data.err);
                    return navigate('/dashboard/category');
                }
                else {
                    const cname = data.category.categoryName
                    setCategory({ categoryName: cname });
                }
            })
    }, []);

    console.log(category)

    const { categoryName, image, formdata } = category;
    const handleChange = (e) => {
        if (e.target.name === "image") {
            formdata.set(e.target.name, e.target.files[0])
            setCategory({ ...category, [e.target.name]: e.target.value })
        }
        else {
            setCategory({ ...category, [e.target.name]: e.target.value })
            formdata.set(e.target.name, e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateCategory(id, formdata)
            .then(data => {
                if (data.err) {
                    toast.error(data.err)
                }
                else {
                    toast.success(data.msg);
                    return navigate('/dashboard/category');
                }
            })
    }

    return (
        <div className='add-category-container'>
            <h3>Update Product</h3>
            <form action="post" encType='multipart/form-data'>
                <FormInput
                    label='Category Name'
                    type="text"
                    required
                    onChange={handleChange}
                    name='categoryName'
                    value={categoryName}
                />

                <FormInput
                    label='Image'
                    type="file"
                    required
                    onChange={handleChange}
                    name='image'
                    value={image}
                />

                <div className="buttons-container">
                    <Button onClick={handleSubmit}>Update Category</Button>
                    <Button onClick={handleSubmit}>Cancel</Button>
                </div>
            </form>
        </div>
    )
}

export default UpdateCategory;