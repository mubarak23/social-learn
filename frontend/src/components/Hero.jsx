import { Button, Card, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const Hero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>Social Learn</h1>
          <p className='text-center mb-4'>
            Social Media for people that want to mean about mental heamth, personal finance and well beign
          </p>
          <div className='d-flex'>
            <LinkContainer to='/login'>
            <Button variant='primary' className='me-3'>
              Sign In
            </Button>
            </LinkContainer>
            <LinkContainer to='/register'>
            <Button variant='secondary'>
              Register
            </Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
