import React from 'react';
import imgBanknote from '../img/bill19zl.jpg';
import { Grid, Typography, Card, CardMedia, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container: {
		marginTop: theme.spacing(12)
	},
	body: {
		marginTop: theme.spacing(3)
	},
	media: {
		height: 0,
		paddingTop: '56.25%' //16:9
	},
	sItalic: {
		fontStyle: 'italic'
	},
	sBold: {
		fontWeight: '700'
	}
}));

const DetailedInfo = () => {
	const classes = useStyles();

	return (
		<Grid container spacing={3} className={classes.container}>
			<Grid item xs={12}>
				<Typography variant="h5" component="h2" color="textPrimary">
					A little more background...
				</Typography>
			</Grid>
			<Grid item md={6} xs={12}>
				<Typography variant="body1" component="p" color="textSecondary">
					On 2nd of October 2019,{' '}
					<Typography
						variant="inherit"
						component="span"
						className={classes.sItalic}
					>
						Polish National Bank (NBP)
					</Typography>{' '}
					emitted collectible banknote to celebrate
					<Typography
						variant="inherit"
						component="span"
						className={classes.sBold}
					>
						{' '}
						100th birthday of 'Polish Security Printing Works' (PWPW), created
						in 1919.
					</Typography>{' '}
					NBP has printed only 55 000 copies of those bills and it was possible
					to buy them for 80zł, either personally in NBP's office or on the
					offical web page. Why it is interesing? Well, because all the copies
					had been sold within just few hours. Since then, the price has been
					skyrocketing - the next day notes were worth around 400zł and some of
					them (e.g. those with low serial number like 00001) reached price of
					over 2000 PLN!
					<Link
						href="https://bezprawnik.pl/banknot-19-zl-cena/"
						rel="noreferrer"
						target="_blank"
						variant="inherit"
						style={{ color: '#144a91', fontStyle: 'italic' }}
					>
						{' '}
						Source
					</Link>
				</Typography>
			</Grid>
			<Grid item md={6} xs={12}>
				<Card>
					<CardMedia
						aria-label="Image of 19 PLN bill, front and back"
						className={classes.media}
						image={imgBanknote}
						title="19 PLN Bill"
					></CardMedia>
				</Card>
			</Grid>
		</Grid>
	);
};

export default DetailedInfo;
