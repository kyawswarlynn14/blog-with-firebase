import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";

function useFetchData() {
	const [categories, setCategories] = useState([]);
	const [posts, setPosts] = useState([]);
	const [postLoading, setPostLoading] = useState(true);
	const [categoryLoading, setCategoryLoading] = useState(true);

	useEffect(() => {
		const onStartUp = async () => {
			try {
				const categoriesQuery = query(collection(db, "categories"));
				const unsubscribeCategories = onSnapshot(
					categoriesQuery,
					(querySnapshot) => {
						const categoriesArray = querySnapshot.docs.map((doc) => ({
							...doc.data(),
							id: doc.id,
						}));
						setCategories(categoriesArray);
						setCategoryLoading(false);
					}
				);

				const postsQuery = query(collection(db, "posts"));
				const unsubscribePosts = onSnapshot(postsQuery, (querySnapshot) => {
					const postsArray = querySnapshot.docs.map((doc) => ({
						...doc.data(),
						id: doc.id,
					}));
					setPosts(postsArray);
					setPostLoading(false);
				});

				return () => {
					unsubscribeCategories();
					unsubscribePosts();
				};
			} catch (err) {
				console.log(err);
				setCategories(false);
				setPostLoading(false);
			}
		};

		onStartUp();
	}, []);

	return { categories, posts, categoryLoading, postLoading };
}

export default useFetchData;
