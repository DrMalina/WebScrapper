import React from 'react';
import {
	Typography,
	List,
	ListItem,
	ListItemText,
	Link
} from '@material-ui/core';

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

	if (prices.length % 2) return prices[half];

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

const findHighest = offers => {
	let highestOffer = offers.reduce((highest, offer) =>
		highest.price > offer.price ? highest : offer
	);

	return highestOffer;
};

const findLowest = offers => {
	let lowestOffer = offers.reduce((lowest, offer) =>
		lowest.price < offer.price ? lowest : offer
	);

	return lowestOffer;
};

const calcAvgProfit = avgPrice => {
	return (avgPrice - 80).toFixed(2);
};

const returnAllData = offers => {
	const prices = offers.map(el => el.price);
	const avg = calcAvg(prices);

	return {
		avg,
		median: calcMedian(prices),
		mode: calcMode(prices),
		highest: findHighest(offers),
		lowest: findLowest(offers),
		avgProfit: calcAvgProfit(avg)
	};
};

const DetailedDataList = ({ offers }) => {
	const { avg, median, mode, highest, lowest, avgProfit } = returnAllData(
		offers
	);

	return (
		<List style={{ marginTop: '1.5rem' }}>
			<ListItem alignItems="flex-start" style={{ textAlign: 'center' }}>
				<ListItemText
					primary="Average:"
					secondary={
						<React.Fragment>
							<Typography variant="h6" component="span" color="primary">
								{avg} zł
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItem>
			<ListItem alignItems="flex-start" style={{ textAlign: 'center' }}>
				<ListItemText
					primary="Median:"
					secondary={
						<React.Fragment>
							<Typography variant="h6" component="span" color="primary">
								{median} zł
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItem>
			<ListItem alignItems="flex-start" style={{ textAlign: 'center' }}>
				<ListItemText
					primary="Mode:"
					secondary={
						<React.Fragment>
							<Typography variant="h6" component="span" color="primary">
								{mode} zł
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItem>
			<ListItem alignItems="flex-start" style={{ textAlign: 'center' }}>
				<ListItemText
					primary="Most Expensive:"
					secondary={
						<React.Fragment>
							<Typography variant="h6" component="span" color="primary">
								<Link
									href={highest.url}
									color="inherit"
									underline="none"
									target="_blank"
									rel="noopener"
								>
									{highest.price.toFixed(2)} zł
								</Link>
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItem>
			<ListItem alignItems="flex-start" style={{ textAlign: 'center' }}>
				<ListItemText
					primary="Cheapest:"
					secondary={
						<React.Fragment>
							<Typography variant="h6" component="span" color="primary">
								<Link
									href={lowest.url}
									color="inherit"
									underline="none"
									target="_blank"
									rel="noopener"
								>
									{lowest.price.toFixed(2)} zł
								</Link>
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItem>
			<ListItem alignItems="flex-start" style={{ textAlign: 'center' }}>
				<ListItemText
					primary="Average Profit:"
					secondary={
						<React.Fragment>
							<Typography variant="h6" component="span" color="primary">
								{avgProfit > 0 ? `+ ` : '-'} {avgProfit} zł
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItem>
		</List>
	);
};

export default DetailedDataList;
