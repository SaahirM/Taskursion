"use client";

import { Box, Button, Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <main>
      <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}>
        <Typography
          variant='h1'
          fontSize={{xs: '4rem', sm: '7rem', md: '10rem', lg: '12rem'}}
        >
          Taskursion
        </Typography>

        <Box minWidth={{xs: '100%', sm: 0}}>
          <Button href='/signup' sx={{
            color: 'white',
            fontSize: {xs: '1rem', sm: '1.5rem', md: '1.8rem', lg: '2rem'},
            px: {sm: 8, md: 14, lg: 20},
            py: {xs: 2, md: 3, lg: 4},
            minWidth: {xs: '100%', sm: 0}
          }}>
            Signup
          </Button>
          
          <Button href='/login' sx={{
            color: 'white',
            fontSize: {xs: '1rem', sm: '1.5rem', md: '1.8rem', lg: '2rem'},
            px: {sm: 8, md: 14, lg: 20},
            py: {xs: 2, md: 3, lg: 4},
            minWidth: {xs: '100%', sm: 0}
          }}>
            Login
          </Button>
        </Box>
      </Container>
    </main>
  )
}
