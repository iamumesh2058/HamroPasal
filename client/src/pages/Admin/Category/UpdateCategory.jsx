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
        categoryName: 'Womens',
        formdata: new FormData()
    });

    const { categoryName, formdata } = category;


    useEffect(() => {
        const setValues = async () => {
            await getCategoryDetails(id)
                .then((data) => {
                    if (data.err) {
                        toast.error(data.err);
                        return navigate('/dashboard/category');
                    }
                    else {
                        setCategory({ ...category, ...data.category });
                        formdata.set('categoryName', data.category.categoryName);
                    }
                })
        }
        setValues();
    }, [id]);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            formdata.set(e.target.name, e.target.files[0]);
        }
        else {
            setCategory({ ...category, [e.target.name]: e.target.value });
            formdata.set(e.target.name, e.target.value);
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
            <h3>Update Category</h3>
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
                    type="file"
                    required
                    onChange={handleChange}
                    name='image'
                />

                <div className="buttons-container">
                    <Button onClick={handleSubmit}>Update Category</Button>
                    <Button onClick={() => navigate('/dashboard/category')}>Cancel</Button>
                </div>
            </form>
        </div>
    )
}

export default UpdateCategory;