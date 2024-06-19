import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CreatePost from "./CreatePost";
import CreateCategory from "./CreateCategory";
import { useData } from "../utils/DataContext";

const SideBar = () => {
	const [isModalVisible, setModalVisible] = useState({
		createPost: false,
		createCategory: false,
	});
	const { categories, categoryLoading } = useData();

	const handleCreateClick = (key) => {
		setModalVisible((prev) => ({ ...prev, [key]: true }));
	};

	const handleCloseModal = (key) => {
		setModalVisible((prev) => ({ ...prev, [key]: false }));
	};

	return (
		<div className="w-full h-screen flex flex-col justify-between overflow-y-auto p-4 pt-0 border-r-2 border-gray-500">
			<div>
				<h1 className="text-red-600 text-[34px] text-center font-bold">Blog</h1>

				<NavLink to={"/"} className="font-semibold text-lg hover:underline">
					All Posts
				</NavLink>

				<div className="mt-2">
					<h1 className="font-semibold text-lg">Categories</h1>
					{categoryLoading ? (
						<p className="ml-2">Loading...</p>
					) : (
						<div className="ml-4 my-2">
							{categories?.length > 0 && categories.map(c => (
								<NavLink
									key={c.id}
									to={`/category-posts/${c.id}`}
									className="w-full hover:bg-slate-500 hover:text-white font-medium py-1 px-2 rounded block"
								>
									{c.title}
								</NavLink>
							))}
						</div>
					)}
				</div>
			</div>

			<div className="w-full flex flex-col gap-2">
				<button
					onClick={() => handleCreateClick("createPost")}
					className="w-full bg-slate-800 py-2 px-4 text-white rounded-lg font-semibold"
				>
					Create Post
				</button>

				<button
					onClick={() => handleCreateClick("createCategory")}
					className="w-full bg-slate-800 py-2 px-4 text-white rounded-lg font-semibold"
				>
					Create Category
				</button>
			</div>

			<CreatePost
				isModalVisible={isModalVisible.createPost}
				handleCloseModal={() => handleCloseModal("createPost")}
			/>
			<CreateCategory
				isModalVisible={isModalVisible.createCategory}
				handleCloseModal={() => handleCloseModal("createCategory")}
			/>
		</div>
	);
};

export default SideBar;
