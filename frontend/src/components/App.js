import React, { useState } from 'react';
import { CssBaseline, Container } from '@material-ui/core';
import {
	createMuiTheme,
	ThemeProvider,
	makeStyles
} from '@material-ui/core/styles';

import Header from './Header';
import HeroUnit from './pages/startingPage/HeroUnit';
import DetailedInfo from './pages/startingPage/DetailedInfo';
import Footer from './Footer';
import OffersData from './pages/offersResultsPage/OffersData';

const useStyles = makeStyles(theme => ({
	container: {
		marginTop: theme.spacing(10),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	footer: {
		width: '100%',
		paddingBottom: theme.spacing(4),
		marginTop: theme.spacing(6)
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
				<Container maxWidth="md" component="main" className={classes.container}>
					<HeroUnit handleClick={handleClick} />
					<DetailedInfo />
				</Container>
			);
		} else {
			return (
				<Container maxWidth="lg" component="main" className={classes.container}>
					<OffersData />
				</Container>
			);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Header />
			{renderContent()}
			<Container maxWidth="sm" component="footer" className={classes.footer}>
				<Footer />
			</Container>
		</ThemeProvider>
	);
};

export default App;
