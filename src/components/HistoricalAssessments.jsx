import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const HistoricalAssessments = ({ assessments, onDeleteAssessment, isEditMode }) => {
    return (
        <Box>
            {/* Title Styled as an Outlined Button with Teal Color */}
            <Box display="flex" justifyContent="center" sx={{ marginBottom: 2 }}>
                <Button
                    variant="outlined"
                    className="teal-outlined-button"
                >
                    Historical Assessments
                </Button>
            </Box>

            <List>
                {assessments.map((assessment, index) => (
                    <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <ListItemText
                            primary={`Assessment #${index + 1}`}
                            secondary={`Training Completed: ${assessment.trainingCompleted}, Policy Read: ${assessment.policyRead}, Policy Access: ${assessment.policyAccess}, Hygiene Measures: ${assessment.hygieneMeasures}, Preparation Completed: ${assessment.preparationCompleted}`}
                        />
                        {isEditMode && (
                            <IconButton edge="end" aria-label="delete" onClick={() => onDeleteAssessment(index)}>
                                <DeleteIcon sx={{ color: '#008080' }} /> {/* Teal color for Delete icon */}
                            </IconButton>
                        )}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default HistoricalAssessments;
