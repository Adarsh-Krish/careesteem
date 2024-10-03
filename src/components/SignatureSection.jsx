import React, { useState, useRef } from 'react';
import { Box, TextField, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { styled } from '@mui/system';

const CustomDateField = styled(TextField)({
    '& input[type="date"]::-webkit-calendar-picker-indicator': {
        opacity: 0,
        display: 'none',
    },
    '& input[type="date"]::-moz-calendar-picker-indicator': {
        opacity: 0,
    },
    '& .MuiOutlinedInput-root': {
        cursor: 'pointer',
    },
});

const SignatureSection = ({ onSign, firstSignatureData }) => {
    const [firstSignature, setFirstSignature] = useState(firstSignatureData || { name: '', date: '' });
    const [secondSignature, setSecondSignature] = useState({ name: '', date: '' });
    const [isFirstSigned, setIsFirstSigned] = useState(!!firstSignatureData);
    const [isSecondUserLoggedIn, setIsSecondUserLoggedIn] = useState(false);
    const [secondUserName, setSecondUserName] = useState('');

    const firstDateRef = useRef(null);
    const secondDateRef = useRef(null);

    // validation 
    const [errors, setErrors] = useState({
        firstSignatureName: false,
        firstSignatureDate: false,
        secondUserName: false,
        secondSignatureName: false,
        secondSignatureDate: false,
    });

    // first signature submission
    const handleFirstSign = () => {
        let newErrors = { ...errors };
        let isValid = true;

        if (!firstSignature.name) {
            newErrors.firstSignatureName = true;
            isValid = false;
        }
        if (!firstSignature.date) {
            newErrors.firstSignatureDate = true;
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            setIsFirstSigned(true);
        }
    };

    // second signature
    const handleSecondUserLogin = () => {
        if (!secondUserName) {
            setErrors((prev) => ({ ...prev, secondUserName: true }));
        } else {
            setErrors((prev) => ({ ...prev, secondUserName: false }));
            setIsSecondUserLoggedIn(true);
        }
    };

    const handleSecondSign = () => {
        let newErrors = { ...errors };
        let isValid = true;

        if (!secondSignature.name) {
            newErrors.secondSignatureName = true;
            isValid = false;
        }
        if (!secondSignature.date) {
            newErrors.secondSignatureDate = true;
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            onSign({ firstSignature, secondSignature });
        }
    };

    const handleCalendarIconClick = (ref) => {
        if (ref.current) {
            ref.current.showPicker();
        }
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 3 }}>
                Signatures of all the involved persons in assessment Required
            </Typography>

            <Box display="flex" flexDirection="row" sx={{ marginBottom: 4 }}>
                <Box sx={{ flex: 1, marginRight: 3 }}>
                    <Typography variant="subtitle1" sx={{ marginBottom: 1, fontWeight: 700 }}>Name</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={firstSignature.name}
                        disabled={isFirstSigned}
                        onChange={(e) => {
                            setFirstSignature({ ...firstSignature, name: e.target.value });
                            setErrors((prev) => ({ ...prev, firstSignatureName: false }));
                        }}
                        error={errors.firstSignatureName}
                        helperText={errors.firstSignatureName ? "Name is required." : ""}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                '& fieldset': {
                                    borderColor: 'rgba(0, 128, 128, 0.5)',
                                    borderWidth: 2,
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(0, 128, 128, 0.75)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#008080',
                                    borderWidth: 3,
                                    boxShadow: '0 0 6px rgba(0, 128, 128, 0.5)',
                                },
                            },
                        }}
                    />
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ marginBottom: 1, fontWeight: 700 }}>Date</Typography>
                    <CustomDateField
                        fullWidth
                        variant="outlined"
                        value={firstSignature.date}
                        inputRef={firstDateRef}
                        disabled={isFirstSigned}
                        onChange={(e) => {
                            setFirstSignature({ ...firstSignature, date: e.target.value });
                            setErrors((prev) => ({ ...prev, firstSignatureDate: false }));
                        }}
                        onClick={() => handleCalendarIconClick(firstDateRef)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => handleCalendarIconClick(firstDateRef)} disabled={isFirstSigned}>
                                        <CalendarMonthIcon sx={{ color: '#008080' }} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            inputProps: {
                                type: 'date',
                            },
                        }}
                        error={errors.firstSignatureDate}
                        helperText={errors.firstSignatureDate ? "Date is required." : ""}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                '& fieldset': {
                                    borderColor: 'rgba(0, 128, 128, 0.5)',
                                    borderWidth: 2,
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(0, 128, 128, 0.75)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#008080',
                                    borderWidth: 3,
                                    boxShadow: '0 0 6px rgba(0, 128, 128, 0.5)',
                                },
                            },
                        }}
                    />
                </Box>
            </Box>

            {!isFirstSigned && (
                <Box display="flex" justifyContent="flex-start" sx={{ marginBottom: 3 }}>
                    <Button variant="contained" color="primary" onClick={handleFirstSign}>
                        Submit First Signature
                    </Button>
                </Box>
            )}

            {isFirstSigned && !isSecondUserLoggedIn && (
                <Box sx={{ marginBottom: 4 }}>
                    <Typography variant="subtitle1" sx={{ marginBottom: 2, fontWeight: 700 }}>
                        Second User, Please Log In:
                    </Typography>
                    <TextField
                        fullWidth
                        label="Enter Second User's Name"
                        variant="outlined"
                        value={secondUserName}
                        onChange={(e) => {
                            setSecondUserName(e.target.value);
                            setErrors((prev) => ({ ...prev, secondUserName: false }));
                        }}
                        error={errors.secondUserName}
                        helperText={errors.secondUserName ? "Name is required to proceed." : ""}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                '& fieldset': {
                                    borderColor: 'rgba(0, 128, 128, 0.5)',
                                    borderWidth: 2,
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(0, 128, 128, 0.75)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#008080',
                                    borderWidth: 3,
                                    boxShadow: '0 0 6px rgba(0, 128, 128, 0.5)',
                                },
                            },
                        }}
                    />
                    <Box display="flex" justifyContent="flex-start" sx={{ marginTop: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleSecondUserLogin}>
                            Log In
                        </Button>
                    </Box>
                </Box>
            )}

            {isSecondUserLoggedIn && (
                <>
                    <Box display="flex" flexDirection="row" sx={{ marginBottom: 4 }}>
                        <Box sx={{ flex: 1, marginRight: 3 }}>
                            <Typography variant="subtitle1" sx={{ marginBottom: 1, fontWeight: 700 }}>Second User Name</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={secondSignature.name}
                                onChange={(e) => {
                                    setSecondSignature({ ...secondSignature, name: e.target.value });
                                    setErrors((prev) => ({ ...prev, secondSignatureName: false }));
                                }}
                                error={errors.secondSignatureName}
                                helperText={errors.secondSignatureName ? "Name is required." : ""}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        '& fieldset': {
                                            borderColor: 'rgba(0, 128, 128, 0.5)',
                                            borderWidth: 2,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(0, 128, 128, 0.75)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#008080',
                                            borderWidth: 3,
                                            boxShadow: '0 0 6px rgba(0, 128, 128, 0.5)',
                                        },
                                    },
                                }}
                            />
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" sx={{ marginBottom: 1, fontWeight: 700 }}>Second User Date</Typography>
                            <CustomDateField
                                fullWidth
                                variant="outlined"
                                value={secondSignature.date}
                                inputRef={secondDateRef}
                                onChange={(e) => {
                                    setSecondSignature({ ...secondSignature, date: e.target.value });
                                    setErrors((prev) => ({ ...prev, secondSignatureDate: false }));
                                }}
                                onClick={() => handleCalendarIconClick(secondDateRef)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => handleCalendarIconClick(secondDateRef)}>
                                                <CalendarMonthIcon sx={{ color: '#008080' }} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    inputProps: {
                                        type: 'date',
                                    },
                                }}
                                error={errors.secondSignatureDate}
                                helperText={errors.secondSignatureDate ? "Date is required." : ""}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        '& fieldset': {
                                            borderColor: 'rgba(0, 128, 128, 0.5)',
                                            borderWidth: 2,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(0, 128, 128, 0.75)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#008080',
                                            borderWidth: 3,
                                            boxShadow: '0 0 6px rgba(0, 128, 128, 0.5)',
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Box>

                    <Box display="flex" justifyContent="flex-start">
                        <Button variant="contained" color="primary" onClick={handleSecondSign}>
                            Submit Second Signature
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default SignatureSection;
