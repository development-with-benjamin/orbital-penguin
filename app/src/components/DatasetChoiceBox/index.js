import React, { useEffect, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import './DatasetChoiceBox.css';

const DatasetChoiceBox = ({ categories, onGetData, onChange }) => {

    const [value, setValue] = useState('co2:2019-12-20');
    const [currentCategory, setCurrentCategory] = useState("co2");
    const [currentDate, setCurrentDate] = useState("2019-12-20");

    useEffect(() => {onGetData({category: currentCategory, date: currentDate})},[onGetData, currentDate, currentCategory])

    window.categories = categories

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event.target.value);
        const categoryAndDate = event.target.value.split(":");
        setCurrentCategory(categoryAndDate[0])
        setCurrentDate(categoryAndDate[1])
        //onGetData({category: currentCategory, date: currentDate})
    };

    return (
        <div className="dataset_choice_box">
            <h2 className="dataset_choice_box__label">Choose a Dataset:</h2>
            <FormControl className="form" component="fieldset">
                <RadioGroup aria-label="dataset" name="dataset" value={value} onChange={(evt) => handleChange(evt)}>
                    {categories && categories?.map((c) => (
                        <div className="category" key={c.category}>
                            <h2 className="category__label">{c.category.toUpperCase()}</h2>
                            <div className="category__dates"> 
                                {c.dates.map((date) => (
                                    <FormControlLabel key={`${c.category}${date}`} value={`${c.category}:${date}`} control={<Radio />} label={date} />
                                ))}
                            </div>
                            
                        </div>
                    ))}
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default DatasetChoiceBox;