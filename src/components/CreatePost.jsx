import { useEffect, useState } from "react";
import Modal from "./Modal";
import { db, storage } from "../utils/firebase";
import { getDownloadURL, uploadBytes, ref, deleteObject } from "firebase/storage";
import { useData } from "../utils/DataContext";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

const initialValues = {
    title: "",
    category: "",
    content: "",
    image: "",
};

export default function CreatePost({ isModalVisible, handleCloseModal, post }) {
    const [values, setValues] = useState(initialValues);
    const { categories } = useData();
    const postId = post?.id || "";

    useEffect(() => {
        if(postId) {
            setValues({
                title: post?.title,
                category: post?.category,
                content: post?.content,
                image: post?.image,
            })
        }
    }, [postId, post])

    const handleChange = (e) => {
        const { id, value } = e.target;
        setValues(prev => ({ ...prev, [id]: value }));
    }

    const handleUploadPostImage = async (e) => {
        const file = e.target.files?.[0];

        try {
            if (post?.image) {
              const imageRef = ref(storage, post?.image);
              await deleteObject(imageRef);
            }
            
            if (file) {
                const imageRef = ref(storage, `blog/${file.name + Date.now()}`);
    
                uploadBytes(imageRef, file).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        setValues(prev => ({ ...prev, image: url }));
                    });
                });
            }
        } catch (error) {
            console.error("Error deleting post or image: ", error);
        }

    };

	const createPost = async (e) => {
		e.preventDefault();
		if (values.title.trim() === "") {
			alert("Please enter a valid post title");
			return;
		}
        if(postId) {
            await updateDoc(doc(db, 'posts', postId), values);
        } else {
            await addDoc(collection(db, "posts"), values);
		    setValues(initialValues);
        }
        handleCloseModal();
	}

    return (
        <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
            <h2 className="text-xl font-bold mb-4 text-center">Create Post</h2>
            <form onSubmit={createPost}>
                <div className="w-full">
                    <input
                        type="file"
                        id="image"
                        className="hidden"
                        onChange={handleUploadPostImage}
                        accept="image/*"
                    />

                    <label htmlFor="image" className="">
                        {values.image !== "" ? (
                            <img
                                src={values.image}
                                alt="uploaded"
                                className="w-auto h-40 rounded object-cover"
                            />
                        ) : (
                            <div className="w-52 h-40 rounded-lg flex items-center justify-center bg-slate-800 text-white text-center">
                                <p>Click to add image</p>
                            </div>
                        )}
                    </label>
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="title"
                    >
                        Title
                    </label>
                    <input
                        type="text"
						required
                        id="title"
                        value={values.title}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="category"
                    >
                        Category
                    </label>
                    <select
                        id="category"
						required
                        value={values.category}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="" disabled>Select a category</option>
                        {categories?.length > 0 && categories.map((c) => (
                            <option className="text-black" key={c.id} value={c.id}>{c.title}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="content"
                    >
                        Content
                    </label>
                    <textarea
                        id="content"
                        value={values.content}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="5"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
        </Modal>
    );
}
