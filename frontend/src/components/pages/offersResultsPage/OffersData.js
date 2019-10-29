import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import useResources from '../../useResources';
import Loader from '../../Loader';
import FormSelect from './FormSelect';
import LatestResultsList from './LatestResultsList';
import DetailedDataList from './DetailedDataList';

const calcAvg = prices => {
	return prices
		.reduce((avg, value, _, { length }) => {
			return avg + value / length;
		}, 0)
		.toFixed(2);
};

const calcMedian = prices => {
	prices.sort((a, b) => a - b);
	const half = Math.floor(prices.length / 2);

	if (prices.length % 2) return prices[half].toFixed(2);

	return ((prices[half - 1] + prices[half]) / 2.0).toFixed(2);
};

const calcMode = prices => {
	let modeMap = {};
	let maxEl = prices[0];
	let maxCount = 1;

	prices.forEach(price => {
		if (!modeMap[price]) {
			modeMap[price] = 1;
		} else {
			modeMap[price]++;
		}

		if (modeMap[price] > maxCount) {
			maxEl = price;
			maxCount = modeMap[price];
		}
	});

	return maxEl.toFixed(2);
};

const findHighest = prices => {
	return Math.max(...prices).toFixed(2);
};

const findLowest = prices => {
	return Math.min(...prices).toFixed(2);
};

const findFreshest = offers => {
	//TODO
	if (!offers[0].date) return null;
	return offers[0].date;
};

const calcAvgProfit = avgPrice => {
	return (avgPrice - 80).toFixed(2);
};

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
		let avg, median, mode, highest, lowest, freshest, avgProfit;
		let offers = [];
		let prices = [];

		if (state.source === 'Both') {
			offers = results;
		} else if (state.source === 'Allegro') {
			offers = results.filter(result => result.source === 'allegro');
		} else if (state.source === 'Olx') {
			offers = results.filter(result => result.source === 'olx');
		}

		prices = offers.map(el => el.price);

		avg = calcAvg(prices);
		median = calcMedian(prices);
		mode = calcMode(prices);
		highest = findHighest(prices);
		lowest = findLowest(prices);
		freshest = findFreshest(offers);
		avgProfit = calcAvgProfit(avg);

		return { avg, median, mode, highest, lowest, freshest, avgProfit };
	};

	const renderContent = () => {
		if (isLoading) {
			return <Loader />;
		} else if (results.length > 0) {
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
						<DetailedDataList {...getDataBySource()} />
					</Grid>
				</Grid>
			);
		}
	};

	return <React.Fragment>{renderContent()}</React.Fragment>;
};

export default OffersData;
