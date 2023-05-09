"use client";

import { Button, Col, Container, Row } from 'react-bootstrap';

export default function Home() {
  return (
    <main>
      <Container fluid className='d-flex align-items-center justify-content-center vh-100 flex-column'>
        <Row>
          <h1 className='homepage-title text-center'>Taskursion</h1>
        </Row>
        <Row className='w-100 g-0'>
          {/*Note: switch to anchors. rounded borders look weird on mobile*/}
          <Col xs={12} sm={6}>
            <Button className='w-100 fs-3 py-4 rounded-0 rounded-start' href='/signup' variant='invisible'>Signup</Button>
          </Col>
          <Col xs={12} sm={6}>
            <Button className='w-100 fs-3 py-4 rounded-0 rounded-end' href='/login' variant='invisible'>Login</Button>
          </Col>
        </Row>
      </Container>
    </main>
  )
}
