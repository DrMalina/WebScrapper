import React from 'react';
import { CssBaseline, Container } from '@material-ui/core';
import {
	createMuiTheme,
	ThemeProvider,
	makeStyles
} from '@material-ui/core/styles';

import Header from './Header';
import HeroUnit from './HeroUnit';
import DetailedInfo from './DetailedInfo';

const useStyles = makeStyles(theme => ({
	container: {
		marginTop: theme.spacing(10),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	}
}));

const theme = createMuiTheme({
	palette: {
		primary: { main: '#48a684' }
	}
});

const App = () => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Header />
				<Container maxWidth="md" component="main" className={classes.container}>
					<HeroUnit />
					<DetailedInfo />
				</Container>
			</ThemeProvider>
		</React.Fragment>
	);
};

export default App;
