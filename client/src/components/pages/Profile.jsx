import { useState, useEffect } from 'react'
import { getUserProfile } from '../functions/getUserProfile.js'

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
import UpdateItem from '../subcomponents/UpdateItem.jsx'
import DeleteItem from '../subcomponents/DeleteItem.jsx'
// import UpdateStatusRequest from '../subcomponents/UpdateStatusRequest.jsx'


export default function Profile() {
  const [userProfile, setUserProfile] = useState(null)
  const [profileError, setProfileError] = useState('')
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  // const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  // const [showConfirmDelete, setShowConfirmDelete] = useState(false)


  // useEffect(() => {
  //   getUserProfile()
  //     .then(data => {
  //       setUserProfile(data)
  //     })
  //     .catch(error => {
  //       setProfileError(error.message)
  //     })
  // }, [])

  const fetchUserProfile = async () => {
    try {
      const data = await getUserProfile()
      setUserProfile(data)
    } catch (error) {
      setProfileError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])


  // Create Modal Handlers
  const handleShowCreateModal = () => setShowCreateModal(true)
  const handleCloseCreateModal = async () => {
    setShowCreateModal(false)
    await fetchUserProfile()
  }

  // Update Modal Handlers
  const handleShowUpdateModal = (item) => {
    setSelectedItem(item)
    setShowUpdateModal(true)
  }
  const handleCloseUpdateModal = async () => {
    setSelectedItem(null)
    setShowUpdateModal(false)
    await fetchUserProfile()
  }
  // const handleItemUpdated = async () => {
  //   handleCloseUpdateModal()
  //   // setLoading(true)
  //   getUserProfile()
  // }

  // Delete Modal Handlers

  const handleShowDeleteModal = (item) => {
    setSelectedItem(item)
    setShowDeleteModal(true)
  }

  const handleCloseDeleteModal = async () => {
    setShowDeleteModal(false)
    await fetchUserProfile()
  }


  // const handleShowConfirmDelete = (item) => {
  //   setSelectedItem(item)
  //   setShowConfirmDelete(true)
  // }

  // const handleCancelDelete = () => {
  //   setShowConfirmDelete(false)
  // }

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    )
  }

  if (profileError) {
    return <Alert variant="danger">{profileError}</Alert>
  }

  if (!userProfile) {
    return <Alert variant="warning">No profile data available.</Alert>
  }

  return (
    <Container className="mt-1 profile-background">
      <div className='profile-background-image'>
        <h1 className='profile-background fira-code-bold'>Welcome Back, {userProfile.username}.</h1>
        <Row className="mt-4">
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Details</Card.Title>
                <Card.Text>
                  <p className='card-details '><strong>{userProfile.username}</strong></p>
                  <p className='card-details'>{userProfile.location}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                {userProfile.items_created.length > 0 ? (
                  userProfile.items_created.map(item => (
                    <Card key={item.id} className="mb-2">
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                        <Card.Img 
                          variant="top" 
                          src={item.image} 
                          alt= {item.title} 
                          style={{ maxWidth: '100%', height: 'auto' }}
                        />
                        <Button
                          className='modal-button'
                          onClick={() => handleShowUpdateModal(item)}
                        >
                          Update Item
                        </Button>
                        <div
                          className='delete-button'
                          onClick={() => handleShowDeleteModal(item)}
                        >
                          Delete
                        </div>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <Card.Text>No items found.</Card.Text>
                )}
                <Button 
                  className="mt-3 modal-button" 
                  onClick={handleShowCreateModal} 
                >
                  Create Item
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Requests</Card.Title>
                <Card.Subtitle className="mb-2 fira-code-bold">Sent Requests</Card.Subtitle>
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
                <Card.Subtitle className="mt-3 mb-2 fira-code-bold">Received Requests</Card.Subtitle>
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
        <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateItem
              getUserProfile={getUserProfile}
              onCreated={handleCloseCreateModal}
            />
          </Modal.Body>
        </Modal>

        {/* Modal for Updating Item */}
        <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <UpdateItem
                item={selectedItem}
                onUpdated={handleCloseUpdateModal}
                onCancel={handleCloseUpdateModal}
              />
            )}
          </Modal.Body>
        </Modal>

        {/* Modal for Deleting Item */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <DeleteItem
                item={selectedItem}
                onDelete={handleCloseDeleteModal}
                onCancel={() => setShowDeleteModal(false)}
              />
            )}
          </Modal.Body>
        </Modal>
      </div>
    </Container>
  )
}