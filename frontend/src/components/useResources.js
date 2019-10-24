import { useState, useEffect } from 'react';
import offers from '../api/offers';

const useResources = () => {
	const [results, setResults] = useState([]);
	const [isLoading, setLoading] = useState(false);

	const fetchResults = async () => {
		setLoading(true);
		try {
			const response = await offers.get('/offers');
			setResults(response.data);
			setLoading(false);
		} catch (err) {
			alert(`Something wrong... \n${err}`);
		}
	};

	useEffect(() => {
		fetchResults();
		return () => {};
	}, []);

	return [results, isLoading];
};

export default useResources;
