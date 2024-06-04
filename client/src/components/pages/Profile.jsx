import { useState, useEffect } from 'react'
import { getAccess } from "../../lib/auth"
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  ListGroup,
  Button,
  Modal
} from 'react-bootstrap'
import CreateItem from '../subcomponents/CreateItem.jsx'

export default function Profile() {
  const [userProfile, setUserProfile] = useState(null)
  const [profileError, setProfileError] = useState('')
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    async function getUserProfile() {
      try {
        const { data } = await axios.get('/api/profile/', {
          headers: {
            Authorization: `Bearer ${getAccess()}`
          }
        })
        console.log(data)
        setUserProfile(data)
        setLoading(false)
      } catch (error) {
        setProfileError(error.message)
        setLoading(false)
      }
    }
    getUserProfile()
  }, [])

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (profileError) {
    return <Alert variant="danger">{profileError}</Alert>
  }

  if (!userProfile) {
    return <Alert variant="warning">No profile data available.</Alert>
  }

  return (
    <Container className="mt-5">
      <h1>{userProfile.username}&apos;s profile</h1>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>User Profile</Card.Title>
              <Card.Text>
                <strong>Username:</strong> {userProfile.username} <br />
                <strong>Location:</strong> {userProfile.location}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Items</Card.Title>
              {userProfile.items_created.length > 0 ? (
                userProfile.items_created.map(item => (
                  <Card key={item.id} className="mb-2">
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Card.Text>No items found.</Card.Text>
              )}
              <Button onClick={handleShowModal} variant="link">
                Create Item
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Requests</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Sent Requests</Card.Subtitle>
              {userProfile.sent_requests.length > 0 ? (
                <ListGroup variant="flush">
                  {userProfile.sent_requests.map(req => (
                    <ListGroup.Item key={req.id}>
                      {req.item_offered.title} for {req.item_requested.title} - Status: {req.status}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Card.Text>No sent requests.</Card.Text>
              )}
              <Card.Subtitle className="mt-3 mb-2 text-muted">Received Requests</Card.Subtitle>
              {userProfile.received_requests.length > 0 ? (
                <ListGroup variant="flush">
                  {userProfile.received_requests.map(req => (
                    <ListGroup.Item key={req.id}>
                      {req.item_offered.title} for {req.item_requested.title} - Status: {req.status}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Card.Text>No received requests.</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Creating Item */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateItem />
        </Modal.Body>
      </Modal>
    </Container>
  )
}