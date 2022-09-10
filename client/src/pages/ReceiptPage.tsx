import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

export default function ReceiptPage() {
  return (
    <Grid container spacing={2} marginTop={3}>
        <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <h1>Receipt Page</h1>
            </Box>
            </Grid>
    </Grid>

  )
}
