import React, { useEffect, useState } from 'react';
import { addCategory } from '../../../api/category.api';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import { Button, FormInput } from '../../../components';
import "./Category.scss";

const AddCategory = () => {
	const navigate = useNavigate();
	const [category, setCategory] = useState({
		categoryName: '',
		image: '',
		formdata: new FormData()
	});

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
		addCategory(formdata)
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
			<h3>Add New Category</h3>
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

				<Button onClick={handleSubmit}>Add Category</Button>
			</form>
		</div>
	)
}

export default AddCategory;