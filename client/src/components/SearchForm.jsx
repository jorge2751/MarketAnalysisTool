import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    TextField,
    Typography,
} from '@mui/material';


const NewSearchForm = () => {
    const [state, setState] = useState('');
    const [minMaxPopulation, setMinMaxPopulation] = useState({ min: 0, max: 0 });
    const [selectedMax, setSelectedMax] = useState(0);
    const [selectedMin, setSelectedMin] = useState(0);
    const [selectedNiche, setSelectedNiche] = useState('');
    const [cost, setCost] = useState(0);
    const [stateNames, setStateNames] = useState([]);
    const [confirmed, setConfirmed] = useState(false);
    const navigate = useNavigate()


    useEffect(() => {
        axios
            .get('http://localhost:8000/api/state-data/names')
            .then((res) => {
                setStateNames(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/state-data/population?state=${state}`)
            .then((response) => {
                setMinMaxPopulation({
                    min: response.data.minPopulation,
                    max: response.data.maxPopulation,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, [state]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/state-data/city-populations/${state}/${selectedMin}/${selectedMax}`)
            .then((response) => {
                // set cost to returned number * (logic)
                setCost(response.data.numberOfCities)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [selectedMin, selectedMax]);

    const handleConfirmation = (e) => {
        if (confirmed === true) {
            setConfirmed(false)
        } else {
            setConfirmed(true)
        }
    }

    // const onSubmitHandler = e => {
    //     e.preventDefault();
    //     axios.post('http://localhost:8000/api/results', {
    //         state,
    //         population,
    //         niche
    //     })
    //         .then(res=>console.log(res))
    //         .catch(err=>console.log(err))
    // }

    const tempHandleSubmit = (e) => {
        e.preventDefault();
        navigate('/results/64270c62cb178749eb397f4c')
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
            }}
        >
            <Typography variant="h4" gutterBottom>
                Search
            </Typography>
            <form onSubmit={tempHandleSubmit}>
                <Box sx={{ mb: 2, minWidth: 200 }}>
                    <FormControl fullWidth>
                        <InputLabel>State</InputLabel>
                        <Select
                            onChange={(e) => {
                                setState(e.target.value);
                            }}
                            value={state}
                        >
                            <MenuItem value="">
                                <em>Select State</em>
                            </MenuItem>
                            {stateNames.map((eachState, idx) => (
                                <MenuItem key={idx} value={eachState.state}>
                                    {eachState.state}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography gutterBottom>
                        Population Range: {minMaxPopulation.min} - {minMaxPopulation.max}
                    </Typography>
                    <Slider
                        value={[selectedMin, selectedMax]}
                        onChange={(e, newValue) => {
                            setSelectedMin(newValue[0]);
                            setSelectedMax(newValue[1]);
                        }}
                        min={minMaxPopulation.min}
                        max={minMaxPopulation.max}
                        valueLabelDisplay="auto"
                    />
                    <Typography gutterBottom>
                        Selected Range: {selectedMin} - {selectedMax}
                    </Typography>
                </Box>
                <Box sx={{ mb: 2, minWidth: 200 }}>
                    <TextField
                        label="Niche"
                        type="text"
                        fullWidth
                        onChange={(e) => {
                            setSelectedNiche(e.target.value);
                        }}
                        value={selectedNiche}
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="confirmed"
                                onChange={handleConfirmation}
                                value={confirmed}
                            />
                        }
                        label="I have confirmed the information is correct"
                    />
                </Box>
                <Typography variant="h6" gutterBottom>
                    Cost: {cost}
                </Typography>
                <Button type="submit" variant="contained" fullWidth>
                    Search
                </Button>
            </form>
        </Box>
    );
};

export default NewSearchForm;