import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';

const Chart = ({ prices }) => {
	const pricesCords = prices.map((el, index) => {
		return { x: index, y: el };
	});

	const data = {
		datasets: [
			{
				label: 'Prices',
				backgroundColor: '#48a684',
				pointBackgroundColor: '#48a684',
				data: pricesCords
			}
		],
		options: {
			tooltips: {
				enabled: false
			},
			scales: {
				xAxes: [
					{
						type: 'linear',
						position: 'bottom'
					}
				]
			}
		}
	};

	return (
		<React.Fragment>
			<Typography variant="h6" component="h4" align="left">
				Banknote Prices Range
			</Typography>
			<Scatter data={data} />
		</React.Fragment>
	);
};

export default Chart;
