import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../api/user.api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Home.scss";
import { getAllCategories } from "../../Store/CategorySlice";

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { categories } = useSelector((state) => state.category);
	
	useEffect(() => {
		dispatch(getAllCategories());
		const user = isAuthenticated();
		if (user && user.role === 'admin') {
			return navigate("/dashboard");
		}
		else {
			return navigate("/")
		}
	}, []);


	return (
		<div className="categories-container">
			{
				categories && categories?.map((category) => {
					const { categoryName, image} = category;
					return (
						<div className='directory-container' key={category._id}>
							<div className="background-image" style={{
								backgroundImage: `url(${image})`
							}} />
							<div className="body" onClick={() => navigate('/shop')}>
								<h2>{categoryName}</h2>
								<p>Shop now</p>
							</div>
						</div>
					)
				})
			}
		</div>
	)
}

export default Home;