import React from 'react';
import {
	Typography,
	List,
	ListItem,
	Card,
	CardMedia,
	CardContent,
	Link
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import imgPlaceholder from '../../../img/imgsPlaceholder.jpg';

const useStyle = makeStyles(theme => ({
	card: {
		display: 'flex',
		width: '100%',
		minHeight: 130
	},
	details: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column'
	},
	media: {
		width: '40%'
	},
	sBold: {
		fontWeight: 700
	}
}));

const LatestResultsList = ({ offers }) => {
	const classes = useStyle();

	return (
		<React.Fragment>
			<Typography variant="h6" component="h3" color="textPrimary">
				5 Latest Results:
			</Typography>
			<List>
				{offers.map((element, index) => (
					<ListItem key={index}>
						<Card className={classes.card}>
							<CardMedia
								image={!element.img ? imgPlaceholder : element.img}
								title={element.title}
								className={classes.media}
							/>
							<div className={classes.details}>
								<CardContent>
									<Typography
										variant="body1"
										align="left"
										className={classes.sBold}
									>
										<Link
											href={element.url}
											color="inherit"
											underline="none"
											target="_blank"
											rel="noopener"
										>
											{element.title}
										</Link>
									</Typography>
									<Typography variant="body2" align="left">
										{element.price} zł
									</Typography>
									<Typography variant="body2" align="left">
										{element.date}
									</Typography>
								</CardContent>
							</div>
						</Card>
					</ListItem>
				))}
			</List>
		</React.Fragment>
	);
};

export default LatestResultsList;
