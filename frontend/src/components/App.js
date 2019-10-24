import React, { useState } from 'react';
import { CssBaseline, Container } from '@material-ui/core';
import {
	createMuiTheme,
	ThemeProvider,
	makeStyles
} from '@material-ui/core/styles';

import Header from './Header';
import HeroUnit from './HeroUnit';
import DetailedInfo from './DetailedInfo';
import Footer from './Footer';
import OffersData from './OffersData';

const useStyles = makeStyles(theme => ({
	container: {
		marginTop: theme.spacing(10),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	footer: {
		position: 'absolute',
		bottom: 0,
		maxWidth: '100%',
		marginBottom: theme.spacing(4)
	}
}));

const theme = createMuiTheme({
	palette: {
		primary: { main: '#48a684' },
		secondary: { main: '#178454' }
	}
});

const App = () => {
	const classes = useStyles();
	const [isFetchingData, startFetchingData] = useState(false);

	const handleClick = () => {
		startFetchingData(true);
	};

	const renderContent = () => {
		if (!isFetchingData) {
			return (
				<React.Fragment>
					<HeroUnit handleClick={handleClick} />
					<DetailedInfo />
				</React.Fragment>
			);
		} else {
			return <OffersData />;
		}
	};

	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Header />
				<Container maxWidth="md" component="main" className={classes.container}>
					{renderContent()}
				</Container>
				<Container maxWidth="sm" component="footer" className={classes.footer}>
					<Footer />
				</Container>
			</ThemeProvider>
		</React.Fragment>
	);
};

export default App;
