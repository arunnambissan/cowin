import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import EnterPhoneNumber from './EnterPhoneNumber';
import VerifyOtp from './VerifyOtp';

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleNext = () => {
        if (activeStep < 2)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        if (activeStep > 0)
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <EnterPhoneNumber
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    handleNext={handleNext}
                    handleBack={handleBack}
                />
            case 1:
                return <VerifyOtp
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    handleNext={handleNext}
                    handleBack={handleBack}
                />
            default:
                return <></>
        }
    }

    return (
        <Card>
            <CardHeader>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                </Button>
            </CardHeader>
            <CardContent>
                <Box p={6} maxWidth={350}>
                    {getStepContent(activeStep)}
                </Box>
            </CardContent>
        </Card>
    );
}
