import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FormComponent from './FormComponent'
import axios from 'axios'
import { getAccess } from '../../lib/auth.js'

export default function TradeItem({ item, onHide, show, getUserProfile }) {
console.log(item)

  if (!item) {
    return null
  }

  const { location, username } = item.owner
  console.log(location, username)

  const fields = {
    item_offered: {
      type: 'text',
      placeholder: 'select which item to trade',
    }
  }

  // async function getUser

  async function handleTradeRequest(){
    try {
      await axios.post('/api/requests/', {
        headers: {
          Authorization: `Bearer ${getAccess()}`
        }
      })
      } catch (error) {
      console.log(error)
    }
  }

  return (
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {item.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>From {username} in {location}</p>
          <p>{item.description}</p>
          < FormComponent 
            request={handleTradeRequest}
            fields={fields}
            submit='Send Request'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
  )
}