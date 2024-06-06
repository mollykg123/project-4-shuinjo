import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { updateRequestStatus } from '../functions/updateRequestStatus.js'

export default function UpdateStatusRequest({ requestId, currentStatus, onUpdate }) {
  const [showModal, setShowModal] = useState(false)
  const [newStatus, setNewStatus] = useState(currentStatus)
  const [error, setError] = useState('')

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value)
  }

  const handleSubmit = async () => {
    try {
      await updateRequestStatus(requestId, newStatus)
      onUpdate()
      handleCloseModal()
    } catch (error) {
      console.error('Failed to update request status:', error)
      setError(error.message)
    }
  };

  return (
    <>
      <Button className='modal-button' onClick={handleShowModal}>
        Update Status
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Request Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" value={newStatus} onChange={handleStatusChange}>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}