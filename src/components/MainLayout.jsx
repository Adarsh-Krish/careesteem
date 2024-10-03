import React from 'react';
import { Grid, Box, Paper, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentForm from './AssessmentForm';
import SignatureSection from './SignatureSection';
import HistoricalAssessments from './HistoricalAssessments';

const MainLayout = ({ onSubmitForm, onSignatures, assessments, onDeleteAssessment }) => {
    const [isEditMode, setIsEditMode] = React.useState(false);

    const toggleEditMode = () => {
        setIsEditMode((prev) => !prev);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8.4}>
                    <Box display="flex" alignItems="center" sx={{ marginBottom: 0.5 }}>
                        <PersonIcon color="primary" sx={{ marginRight: 1 }} />
                        <Typography variant="h6" color="primary">
                            User's Competency
                        </Typography>
                    </Box>
                    <Paper
                        elevation={3}
                        sx={{
                            backgroundColor: '#e0f7f7',
                            padding: 2,
                            borderRadius: 2,
                        }}
                    >
                        <AssessmentForm onSubmit={onSubmitForm} />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3.6}>
                    <Box display="flex" justifyContent="flex-end" sx={{ marginBottom: 0.5 }}>
                        <Button
                            onClick={toggleEditMode}
                            className="teal-button"
                            startIcon={<EditIcon />}
                            sx={{ marginRight: '50px' }}
                        >
                            Edit
                        </Button>
                    </Box>

                    <Paper
                        elevation={0}
                        sx={{
                            backgroundColor: '#e0f7f7',
                            padding: 2,
                            borderRadius: 2,
                        }}
                    >
                        <HistoricalAssessments
                            assessments={assessments}
                            onDeleteAssessment={onDeleteAssessment}
                            isEditMode={isEditMode}
                        />
                    </Paper>
                </Grid>
            </Grid>

            {/* signature section */}
            <Box sx={{ marginTop: 2 }}>
                <Paper
                    elevation={3}
                    sx={{
                        backgroundColor: '#e0f7f7',
                        padding: 2,
                        borderRadius: 2,
                    }}
                >
                    <SignatureSection onSign={onSignatures} />
                </Paper>
            </Box>
        </Box>
    );
};

export default MainLayout;
