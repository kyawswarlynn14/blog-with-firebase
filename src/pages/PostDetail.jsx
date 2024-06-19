import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../utils/DataContext";
import { getCategoryName } from "../utils/services";

const PostDetail = () => {
	const { id } = useParams();
	const { posts, categories } = useData();
	const postDetail = posts?.length && posts.find((i) => i.id === id);
	const navigate = useNavigate();

	return (
		<div className="p-4">
			<button
				onClick={() => navigate(-1)}
				className="bg-slate-800 mb-2 text-white font-semibold text-sm p-2 px-4 rounded-lg"
			>
				Back
			</button>
			<img
				src={postDetail?.image}
				alt="post image"
				className="w-full h-56 rounded object-cover"
			/>

			<div className="w-full flex justify-between my-2">
				<h1 className="font-semibold text-xl left-8">{postDetail?.title}</h1>
				<h1 className="bg-cyan-500 p-1 px-2 rounded-lg">{getCategoryName(categories, postDetail?.category)}</h1>
			</div>

			<p>{postDetail?.content}</p>
		</div>
	);
};

export default PostDetail;
