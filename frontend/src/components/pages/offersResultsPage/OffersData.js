import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import useResources from '../../useResources';
import Loader from '../../Loader';
import FormSelect from './FormSelect';
import LatestResultsList from './LatestResultsList';
import DetailedDataList from './DetailedDataList';
import Chart from './Chart';

const OffersData = () => {
	const [results, isLoading] = useResources();
	const [state, setState] = useState({ source: 'Both' });

	const handleChange = name => event => {
		setState({ ...state, [name]: event.target.value });
	};

	const showLatestOffers = numOfOffers => {
		let newestOffers = [];
		for (let i = 0; i <= numOfOffers; i++) {
			newestOffers.push(results[i]);
		}
		return newestOffers;
	};

	const getDataBySource = () => {
		let offers = [];

		if (state.source === 'Both') {
			offers = results;
		} else if (state.source === 'Allegro') {
			offers = results.filter(result => result.source === 'allegro');
		} else if (state.source === 'Olx') {
			offers = results.filter(result => result.source === 'olx');
		}

		return offers;
	};

	const renderContent = () => {
		if (isLoading) {
			return <Loader />;
		} else if (results.length > 0) {
			const offers = getDataBySource();
			const pricesSorted = offers.map(el => el.price).sort((a, b) => a - b);
			return (
				<Grid container spacing={3}>
					<Grid item lg={6} xs={12}>
						<LatestResultsList offers={showLatestOffers(5)} />
					</Grid>
					<Grid
						item
						lg={6}
						xs={12}
						style={{
							textAlign: 'center'
						}}
					>
						<FormSelect
							value={state.value}
							name="source"
							handleChange={handleChange}
						/>
						<DetailedDataList offers={offers} />
						<Chart prices={pricesSorted} />
					</Grid>
				</Grid>
			);
		}
	};

	return <React.Fragment>{renderContent()}</React.Fragment>;
};

export default OffersData;
