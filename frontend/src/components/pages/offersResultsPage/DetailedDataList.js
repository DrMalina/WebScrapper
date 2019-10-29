import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const DetailedDataList = ({
	avg,
	median,
	mode,
	highest,
	lowest,
	freshest,
	avgProfit
}) => {
	return (
		<List style={{ marginTop: '1.5rem' }}>
			<ListItem alignItems="flex-start" style={{ textAlign: 'center' }}>
				<ListItemText
					primary="Average:"
					secondary={
						<React.Fragment>
							<Typography variant="h6" component="span" color="primary">
								{avg} zł
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItem>
			<ListItem alignItems="flex-start" style={{ textAlign: 'center' }}>
				<ListItemText
					primary="Median:"
					secondary={
						<React.Fragment>
							<Typography variant="h6" component="span" color="primary">
								{median} zł
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItem>
			<ListItem alignItems="flex-start" style={{ textAlign: 'center' }}>
				<ListItemText
					primary="Mode:"
					secondary={
						<React.Fragment>
							<Typography variant="h6" component="span" color="primary">
								{mode} zł
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItem>
			<ListItem alignItems="flex-start" style={{ textAlign: 'center' }}>
				<ListItemText
					primary="Most Expensive:"
					secondary={
						<React.Fragment>
							<Typography variant="h6" component="span" color="primary">
								{highest} zł
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItem>
			<ListItem alignItems="flex-start" style={{ textAlign: 'center' }}>
				<ListItemText
					primary="Cheapest:"
					secondary={
						<React.Fragment>
							<Typography variant="h6" component="span" color="primary">
								{lowest} zł
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItem>
			<ListItem alignItems="flex-start" style={{ textAlign: 'center' }}>
				<ListItemText
					primary="Freshest Offer:"
					secondary={
						<React.Fragment>
							<Typography variant="h6" component="span" color="primary">
								{freshest ? `${freshest} zł` : 'N/A'}
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItem>
			<ListItem alignItems="flex-start" style={{ textAlign: 'center' }}>
				<ListItemText
					primary="Average Profit:"
					secondary={
						<React.Fragment>
							<Typography variant="h6" component="span" color="primary">
								{avgProfit} zł
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItem>
		</List>
	);
};

export default DetailedDataList;
