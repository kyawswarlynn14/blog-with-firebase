import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../utils/firebase";
import CreatePost from "./CreatePost";
import { useData } from "../utils/DataContext";
import { getCategoryName } from "../utils/services";

const PostList = ({ posts }) => {
    const { categories } = useData();
    const [postToUpdate, setPostToUpdate] = useState(null);
	const [isModalVisible, setModalVisible] = useState(false);
	const navigate = useNavigate();

	const handleUpdatePost = (post) => {
		setPostToUpdate(post);
		setModalVisible(true);
	};

	const handleCloseModal = () => {
		setModalVisible(false);
	};

	const deletePost = async (post) => {
		try {
			if (post?.image) {
				const imageRef = ref(storage, post?.image);
				await deleteObject(imageRef);
			}
			await deleteDoc(doc(db, "posts", post?.id));
			console.log(`Post with ID ${id} and its image have been deleted`);
		} catch (error) {
			console.error("Error deleting post or image: ", error);
		}
	};

	return (
        <>
            <div className="w-full grid grid-cols-3 gap-4">
                {posts?.length > 0 ? (
                    posts.map((i) => (
                        <div
                            key={i?.id}
                            className="relative rounded-lg overflow-hidden bg-slate-200 border shadow-lg"
                        >
                            <div className="absolute top-2 right-2 flex items-center gap-2">
                                <button
                                    onClick={() => handleUpdatePost(i)}
                                    className="bg-cyan-500 text-sm p-1 px-2 rounded-lg font-bold"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deletePost(i)}
                                    className="bg-red-500 text-sm p-1 px-2 rounded-lg font-bold"
                                >
                                    Del
                                </button>
                            </div>

                            <img
                                src={i?.image}
                                alt="post image"
                                className="w-full h-48 object-cover"
                            />

                            <div className="cursor-pointer p-4 pt-2">
                                <h1
                                    onClick={() => navigate(`/posts/${i?.id}`)}
                                    className="font-semibold hover:underline text-xl mb-3"
                                >
                                    {i?.title}
                                </h1>
                                <span className="bg-cyan-500 p-1 px-2 rounded-lg">
                                    {getCategoryName(categories, i?.category)}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center font-medium mt-12">No any post yet!</p>
                )}
            </div>

            <CreatePost
				isModalVisible={isModalVisible}
				handleCloseModal={handleCloseModal}
				post={postToUpdate}
			/>
        </>
	);
};

export default PostList;
