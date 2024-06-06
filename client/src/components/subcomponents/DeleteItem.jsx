import axios from 'axios'
import { Button, Modal, Alert } from 'react-bootstrap'
import { getAccess } from '../../lib/auth'

export default function DeleteItem({ item, onDelete, onCancel }) {


  const handleDelete = async () => {
    try {
      await axios.delete(`/api/items/${item.id}`, {
        headers: {
          Authorization: `Bearer ${getAccess()}`
        }
      })
      onDelete()
    } catch (error) {
      // Handle error, maybe show an alert
      console.error('Error deleting item', error)
    }
  }

  return (
    <div className='form-component'>
      <Modal.Body>
        <Alert variant="warning">Are you sure you want to delete this item?</Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Item
        </Button>
      </Modal.Footer>
    </div>
  )
}
