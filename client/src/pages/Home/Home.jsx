import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../store/CategorySlice";
import "./Home.scss";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(getAllCategories());
    }, []);

    return (
        <div className="categories-container">
            {
                category.loading && <h1>Loading...</h1>
            }
            {
                !category.loading && category.error ? <h3>Error : {category.error}</h3> : null
            }
            {
                !category.loading && category.categories?.map((category) => {
                    const { categoryName, image } = category;
                    return (
                        <div className="directory-container" key={category._id}>
                            <div
                                className="background-image"
                                style={{ backgroundImage: `url(${image})` }}
                            />
                            <div className="body">
                                <h2>{categoryName}</h2>
                                <p>Shop Now</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home;