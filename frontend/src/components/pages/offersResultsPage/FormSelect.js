import React from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	form: {
		minWidth: '10rem'
	}
}));

const FormSelect = ({ name, value, handleChange }) => {
	const classes = useStyles();
	return (
		<FormControl component="form" className={classes.form}>
			<InputLabel htmlFor={name}>Source</InputLabel>
			<Select
				native
				value={value}
				onChange={handleChange(name)}
				onBlur={handleChange(name)}
				inputProps={{ name: name, id: name }}
			>
				<option value="Both">Both</option>
				<option value="Olx">Olx</option>
				<option value="Allegro">Allegro</option>
			</Select>
		</FormControl>
	);
};

export default FormSelect;
