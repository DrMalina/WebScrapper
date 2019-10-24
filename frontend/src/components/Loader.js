import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';

const Loader = props => {
	return (
		<React.Fragment>
			<CircularProgress style={{ marginTop: '4rem', marginBottom: '2rem' }} />
			<Typography
				variant="h5"
				align="center"
				color="textSecondary"
				gutterBottom
			>
				Fetching data from Allegro and Olx... <br />
				It may take a moment, please be patient.
			</Typography>
		</React.Fragment>
	);
};

export default Loader;
