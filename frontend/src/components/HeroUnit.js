import React from 'react';
import { Typography, Button } from '@material-ui/core';

const HeroUnit = ({ handleClick }) => {
	return (
		<React.Fragment>
			<Typography
				component="h1"
				variant="h4"
				align="center"
				color="textPrimary"
				gutterBottom
			>
				Track The Latest Data On Collectible Bill
			</Typography>
			<Typography
				variant="h6"
				align="center"
				color="textSecondary"
				component="p"
				style={{ marginTop: '1rem' }}
			>
				Check the most recent statistics on the collectible banknote of 19 zł,
				emitted from <strong>NBP</strong> <i>(Polish National Bank)</i>. Its
				price started only from 80 zł per bill and in no-time it reached value
				of hundreds of PLN. Click the button below to see the latest data from
				<i> Allegro & Olx.</i>
			</Typography>
			<Button
				variant="contained"
				color="primary"
				style={{ color: 'white', marginTop: '2rem' }}
				onClick={() => handleClick()}
			>
				Get started
			</Button>
		</React.Fragment>
	);
};

export default HeroUnit;
