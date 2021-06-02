import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import useAuth from '../../auth/useAuth';
import useInterval from '../../hooks/useInterval';
import logger from '../../utils/logger';
import firebase from "firebase/app";
import "firebase/auth";
import FullScreenLoader from '../../components/FullScreenLoader';
import Form from "../../components/Form";

export default (props) => {

    const { handleNext, phoneNumber, handleBack } = props;

    const [otp, setOtp] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { sendOtpForLogIn, confirmOtpAndLogIn, isPartiallyAuthenticated } = useAuth();
    const [otpSentCount, setOtpSentCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);


    useInterval(() => {
        if (timeLeft < 0) {
            handleBack();
        }
        setTimeLeft(timeLeft - 1);
    }, 1000);

    useEffect(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                console.log("response", response)
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                sendLoginOtp(false);
            }
        });

        window.recaptchaVerifier.verify();

    }, []);

    useEffect(() => {
        if (isPartiallyAuthenticated()) {
            handleNext();
        }
    });

    const sendLoginOtp = async (resend) => {
        setIsLoading(true);

        const response = await sendOtpForLogIn(phoneNumber, resend);

        setIsLoading(false);

        if (response.success) {
            setOtpSentCount(otpSentCount + 1);
            setTimeLeft(60);
            setConfirmation(response.confirmation);
        } else {
            logger.log(response);
            handleBack();
            alert(response.error && response.error.message);
        }
    };

    const onSubmit = async () => {
        if (isPartiallyAuthenticated()) {
            handleNext();
            return;
        }

        setIsLoading(true);

        const response = await confirmOtpAndLogIn(confirmation, otp);

        setIsLoading(false);

        if (response.success) {
            handleNext();
        } else {
            logger.log(response);
            alert(response.error);
        }
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="center" flexDirection="column">

                    <Form onSubmit={onSubmit}>
                        <div id="sign-in-button"></div>

                        <Typography variant="subtitle1">
                            <strong>Verify mobile number</strong>
                        </Typography>

                        <Typography>
                            Kindly enter the OTP we have shared to your mobile number
                            {/* +91 9809 ****11 */}
                        </Typography>

                        <Box mt={3} />

                        <TextField
                            variant="outlined"
                            fullWidth
                            placeholder="Enter OTP"
                            label="Enter OTP"
                            size="small"
                            onChange={(e) => setOtp(e.target.value)}
                            value={otp}
                        />

                        <Box mt={3} />

                        {isLoading && <FullScreenLoader />}
                        <Button variant="contained" fullWidth color="primary" type="submit">
                            Validate
                        </Button>
                    </Form>
                </Box>
            </Grid>
        </Grid>
    )
}