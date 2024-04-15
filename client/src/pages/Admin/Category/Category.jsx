import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "../../../components";
import "./Category.scss";
import { getAllCategories } from '../../../Store/CategorySlice';
import { deleteCategory } from '../../../api/category.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);
    
    useEffect(() => {
        dispatch(getAllCategories());
    }, []);

    const handleDeleteCategory = async (id) => {
        await deleteCategory(id)
            .then(data => {
                if (data.err) {
                    toast.error(data.err)
                }
                else {
                    toast.success(data.msg);
                    return;
                }
            })
    }

    return (
        <div className='admin-category-container'>
            <div className="category-title">
                <h3>Categories</h3>
                <Button onClick={() => navigate("/dashboard/add-category")}>Add Category</Button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        categories && categories.map((category, i) => {
                            return (
                                <tr key={i} className='category-header'>
                                    <td>
                                        {i + 1}
                                    </td>
                                    <td>
                                        {category.categoryName}
                                    </td>
                                    <td>
                                        <div className="image-container">
                                            <img src={category.image} alt={category.categoryName} />
                                        </div>
                                    </td>
                                    <td className="buttons">
                                        <Button onClick={() => navigate(`/dashboard/update-category/${category._id}`)}>Update</Button>
                                        <Button onClick={() => handleDeleteCategory(category._id)}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
        </div>
    )
}

export default Category;