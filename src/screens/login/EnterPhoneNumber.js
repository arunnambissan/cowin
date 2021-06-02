import React, { useEffect } from 'react';
import { Grid, Box, Typography, TextField, Button } from '@material-ui/core';
import CountrySelector from "../../components/CountrySelector";
import Form from "../../components/Form";
import storageHelper from '../../utils/storageHelper';
import apiHelper from '../../api/apiHelper';

export default (props) => {

    const { handleNext, phoneNumber, setPhoneNumber, countryCode, setCountryCode } = props;

    const handleContinue = () => {
        storageHelper.setItem("phoneNumber", phoneNumber);
        apiHelper.sendOTP({ phoneNumber });
        // handleNext();
    }

    useEffect(() => {
        let savedPhoneNumber = storageHelper.getItem("phoneNumber");

        if (savedPhoneNumber) {
            setPhoneNumber(savedPhoneNumber);
        }
    }, []);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                    <Form onSubmit={handleContinue}>
                        <Typography variant="h1" gutterBottom align="center">
                            CoWIN
                        </Typography>

                        <Box mt={3} />
                        <Box mt={3} />

                        <TextField
                            variant="outlined"
                            fullWidth
                            size="small"
                            placeholder="Phone Number"
                            label="Phone Number"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={phoneNumber}
                        />

                        <Box mt={3} />

                        <Button variant="contained" fullWidth type="submit" color="primary">
                            Continue
                        </Button>

                        <Box mt={3} />
                    </Form>
                </Box>
            </Grid>
        </Grid>
    )
}