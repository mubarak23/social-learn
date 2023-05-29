import { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

const  MyScreen = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showOldPosts, setShowOldPosts] = useState(false);

  const handleFollow = () => {
    setIsFollowing(true);
  };

  const handleUnfollow = () => {
    setIsFollowing(false);
  };

  const handleShowOldPosts = () => {
    setShowOldPosts(true);
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src="profile-image.jpg" alt="Profile" />
            <Card.Body>
              <Card.Title>User Profile</Card.Title>
              <Card.Text>
                <strong>Name:</strong> John Doe
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> john.doe@example.com
              </Card.Text>
              <Card.Text>
                <strong>Bio:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Card.Text>
              {isFollowing ? (
                <Button variant="primary" onClick={handleUnfollow}>
                  Unfollow
                </Button>
              ) : (
                <Button variant="primary" onClick={handleFollow}>
                  Follow
                </Button>
              )}
              {showOldPosts ? (
                <div>
                  <h4>Old Posts:</h4>
                  <ul>
                    <li>Post 1</li>
                    <li>Post 2</li>
                    <li>Post 3</li>
                  </ul>
                </div>
              ) : (
                <Button variant="primary" onClick={handleShowOldPosts}>
                  Show Old Posts
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MyScreen;
