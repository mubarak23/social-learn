import { Col, Container, Row } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const FormContainer = ({ children }) => {
  return (
    <div>
      <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={12} md={6} className='card p-5'>
          {children}
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default FormContainer