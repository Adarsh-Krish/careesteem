import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MainLayout from './components/MainLayout';

function App() {
  //historical assessments
  const [assessments, setAssessments] = useState([]);

  const handleSubmitForm = (formData) => {
    setAssessments((prev) => [...prev, formData]);
  };

  const handleDeleteAssessment = (index) => {
    setAssessments((prev) => prev.filter((_, i) => i !== index));
  };

  // signatures 
  const handleSignatures = (signatures) => {
    console.log('Signatures Collected:', signatures);
  };

  const tealTheme = createTheme({
    palette: {
      primary: {
        main: '#008080', // teal color
      },
    },
    typography: {
      fontFamily: '"Times New Roman", Times, serif',
      fontWeightBold: 700,
      allVariants: {
        fontWeight: 700,
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '8px',
              },
              '&:hover fieldset': {
                borderColor: '#008080',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#008080',
              },
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#008080',
            fontWeight: 700,
            '&.Mui-focused': {
              color: '#008080',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={tealTheme}>
      <CssBaseline />
      <MainLayout
        onSubmitForm={handleSubmitForm}
        onSignatures={handleSignatures}
        assessments={assessments}
        onDeleteAssessment={handleDeleteAssessment}
      />
    </ThemeProvider>
  );
}

export default App;
