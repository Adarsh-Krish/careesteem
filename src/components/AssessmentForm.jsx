import React, { useState } from 'react';
import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Typography, FormHelperText } from '@mui/material';

const AssessmentForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        trainingCompleted: '',
        policyRead: '',
        policyAccess: '',
        hygieneMeasures: '',
        preparationCompleted: '',
    });

    const [errors, setErrors] = useState({
        trainingCompleted: false,
        policyRead: false,
        policyAccess: false,
        hygieneMeasures: false,
        preparationCompleted: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (value) {
            setErrors((prev) => ({ ...prev, [name]: false }));
        }
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = true;
                valid = false;
            }
        });

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSubmit(formData);

            setFormData({
                trainingCompleted: '',
                policyRead: '',
                policyAccess: '',
                hygieneMeasures: '',
                preparationCompleted: '',
            });
        }
    };

    return (
        <Box>
            {/* Training and Policy */}
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 3 }}>Training and Policy</Typography>

            <FormControl component="fieldset" sx={{ marginBottom: 4 }} error={errors.trainingCompleted}>
                <FormLabel component="legend" sx={{ marginBottom: 1, fontWeight: 700, fontSize: '1.1rem' }}>
                    1. Has the member of staff completed training on the safe handling of medicines?
                </FormLabel>
                <RadioGroup
                    name="trainingCompleted"
                    value={formData.trainingCompleted}
                    onChange={handleInputChange}
                    row
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.trainingCompleted && (
                    <FormHelperText>Please select an option for training completion.</FormHelperText>
                )}
            </FormControl>

            <FormControl component="fieldset" sx={{ marginBottom: 4 }} error={errors.policyRead}>
                <FormLabel component="legend" sx={{ marginBottom: 1, fontWeight: 700, fontSize: '1.1rem' }}>
                    2. Has the member of staff read the medication policy and signed to indicate that they have done so?
                </FormLabel>
                <RadioGroup
                    name="policyRead"
                    value={formData.policyRead}
                    onChange={handleInputChange}
                    row
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.policyRead && (
                    <FormHelperText>Please select an option for policy read status.</FormHelperText>
                )}
            </FormControl>

            <FormControl component="fieldset" sx={{ marginBottom: 4 }} error={errors.policyAccess}>
                <FormLabel component="legend" sx={{ marginBottom: 1, fontWeight: 700, fontSize: '1.1rem' }}>
                    3. Does the member of staff know how to access the medication policy if they wish to check any information?
                </FormLabel>
                <RadioGroup
                    name="policyAccess"
                    value={formData.policyAccess}
                    onChange={handleInputChange}
                    row
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.policyAccess && (
                    <FormHelperText>Please select an option for policy access knowledge.</FormHelperText>
                )}
            </FormControl>

            {/* Administration of Medicines  */}
            <Typography variant="h5" gutterBottom sx={{ marginTop: 4, marginBottom: 3 }}>Administration of Medicines</Typography>
            <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>Preparation and Hygiene</Typography>

            <FormControl component="fieldset" sx={{ marginBottom: 4 }} error={errors.hygieneMeasures}>
                <FormLabel component="legend" sx={{ marginBottom: 1, fontWeight: 700, fontSize: '1.1rem' }}>
                    1. Did the member of staff wash their hands before starting to administer any medication and follow appropriate hygiene measures throughout the medication round?
                </FormLabel>
                <RadioGroup
                    name="hygieneMeasures"
                    value={formData.hygieneMeasures}
                    onChange={handleInputChange}
                    row
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.hygieneMeasures && (
                    <FormHelperText>Please select an option for hygiene measures.</FormHelperText>
                )}
            </FormControl>

            <FormControl component="fieldset" sx={{ marginBottom: 4 }} error={errors.preparationCompleted}>
                <FormLabel component="legend" sx={{ marginBottom: 1, fontWeight: 700, fontSize: '1.1rem' }}>
                    2. Did the member of staff make sure that everything was properly prepared before starting the medication round?
                </FormLabel>
                <RadioGroup
                    name="preparationCompleted"
                    value={formData.preparationCompleted}
                    onChange={handleInputChange}
                    row
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.preparationCompleted && (
                    <FormHelperText>Please select an option for preparation completion.</FormHelperText>
                )}
            </FormControl>

            <Box display="flex" justifyContent="start" sx={{ marginTop: 3 }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit Assessment
                </Button>
            </Box>
        </Box>
    );
};

export default AssessmentForm;
