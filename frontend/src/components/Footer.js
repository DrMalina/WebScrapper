import React from 'react';
import { Typography, Link } from '@material-ui/core';

const Footer = () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link
				color="inherit"
				href="https://github.com/drmalina"
				target="_blank"
				rel="noopener"
			>
				DrMalina
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};

export default Footer;
