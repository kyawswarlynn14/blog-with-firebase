import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";

function useGetRequest(tableName) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const onStartUp = async () => {
			try {
				const dataQuery = query(collection(db, tableName));
				const unsubscribe = onSnapshot(
					dataQuery,
					(querySnapshot) => {
						const dataArray = querySnapshot.docs.map((doc) => ({
							...doc.data(),
							id: doc.id,
						}));
						setData(dataArray);
						setLoading(false);
					}
				);

				return () => {
					unsubscribe();
				};
			} catch (err) {
				console.log(err);
				setLoading(false);
			}
		};

		onStartUp();
	}, []);

	return { loading, data };
}

export default useGetRequest;
