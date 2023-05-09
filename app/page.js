"use client";

import { Col, Container, Row } from 'react-bootstrap';

export default function Home() {
  return (
    <main>
      <Container fluid className='d-flex align-items-center justify-content-center vh-100 flex-column'>
        <Row>
          <h1 className='homepage-title text-center'>Taskursion</h1>
        </Row>
        <Row className='w-100 g-0'>
          <Col xs={12} sm={6}>
            <a className='btn btn-invisible w-100 fs-3 py-4' href='/signup'>Signup</a>
          </Col>
          <Col xs={12} sm={6}>
            <a className='btn btn-invisible w-100 fs-3 py-4' href='/login'>Login</a>
          </Col>
        </Row>
      </Container>
    </main>
  )
}
