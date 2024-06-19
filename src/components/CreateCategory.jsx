import { useState } from "react";
import Modal from "./Modal";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";

export default function CreateCategory({ isModalVisible, handleCloseModal }) {
	const [title, setTitle] = useState("");

	const createCategory = async (e) => {
		e.preventDefault(e);
		if (title.trim() === "") {
			alert("Please enter a valid category title");
			return;
		}
		await addDoc(collection(db, "categories"), { title });
		setTitle("");
        handleCloseModal();
	};

	return (
		<Modal isVisible={isModalVisible} onClose={handleCloseModal}>
			<h2 className="text-xl font-bold mb-4">Create Category</h2>
			<form onSubmit={e => createCategory(e)}>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="title"
					>
						Title
					</label>
					<input
						type="text"
						id="title"
						required
                        value={title}
                        onChange={e => setTitle(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
