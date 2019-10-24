import React from 'react';

import useResources from './useResources';
import Loader from './Loader';

const OffersData = () => {
	const [results, isLoading] = useResources();

	const renderContent = () => {
		if (isLoading) {
			return <Loader />;
		} else {
			return <div>Results loaded!</div>;
		}
	};

	return <React.Fragment>{renderContent()}</React.Fragment>;
};

export default OffersData;
