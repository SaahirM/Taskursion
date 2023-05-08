"use client";

import { Button } from 'react-bootstrap';

export default function Home() {
  return (
    <main>
      <h1>Taskursion</h1>
      <Button href='/signup' variant='secondary'>Signup</Button>
      <Button href='/login' variant='primary'>Login</Button>
    </main>
  )
}
