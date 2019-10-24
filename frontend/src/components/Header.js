import React from 'react';
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';

const Header = () => {
	return (
		<AppBar position="static" color="primary">
			<Toolbar>
				<Typography
					component="h2"
					variant="h6"
					color="inherit"
					align="center"
					style={{ flex: 1 }}
				>
					<Link
						variant="h6"
						underline="none"
						style={{ color: 'white' }}
						href="#"
					>
						Banknote Collector Tracker
					</Link>
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
