import React from "react";
import { useData } from "../utils/DataContext";
import PostList from "../components/PostList";

const Posts = () => {
	const { posts, postLoading } = useData();

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold leading-8 tracking-widest mb-4">
				All Posts
			</h1>
			{postLoading ? (
				<p>Loading...</p>
			) : (
				<PostList posts={posts} />
			)}
		</div>
	);
};

export default Posts;
