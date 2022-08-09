import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CreateIcon from '@mui/icons-material/Create';
import Avatar from '@mui/material/Avatar';
import {ThemeProvider, useTheme} from '@mui/material/styles';


export default function CreateItem() {

    const theme = useTheme();

    return(
        <>
        <ThemeProvider theme={theme}>
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <CreateIcon />
          </Avatar>
        <Typography id="transition-modal-title" variant="h6" component="h2">
              Create Item
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
        </Box>
        </ThemeProvider>
            </>
    )
}