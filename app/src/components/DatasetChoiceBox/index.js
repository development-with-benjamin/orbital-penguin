import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import './DatasetChoiceBox.css';

const DatasetChoiceBox = ({onChange}) => {

    const [value, setValue] = React.useState('hexagon');

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event.target.value);
    };

    return (
        <div className="dataset_choice_box">
            <h2 className="dataset_choice_box__label">Choose a dataset</h2>
            <FormControl className="form" component="fieldset">
                <RadioGroup aria-label="dataset" name="dataset" value={value} onChange={handleChange}>
                    <FormControlLabel value="hexagon" control={<Radio />} label="Hexagon" />
                    <FormControlLabel value="heatmap" control={<Radio />} label="Heatmap" />
                    <FormControlLabel value="scatterplot" control={<Radio />} label="Scatterplot" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default DatasetChoiceBox;