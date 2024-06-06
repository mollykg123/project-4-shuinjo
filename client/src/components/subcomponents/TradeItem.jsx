import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FormComponent from './FormComponent'
import axios from 'axios'
import { getAccess } from '../../lib/auth.js'
import { useEffect, useState } from 'react'
import { getUserProfile } from '../functions/getUserProfile.js'


export default function TradeItem({ item, onHide, show }) {
// console.log(item)
const [userItemsCreated, setUserItemsCreated] = useState([])
const [itemRequestedValue, setItemRequestedValue] = useState('')


useEffect(() => {
  getUserProfile()
    .then(data => {
      setUserItemsCreated(data.items_created)
      setItemRequestedValue(item.title)
    })
    .catch(error => {
      console.log(error)
    })
}, [])

  if (!item) {
    return null
  }


  const { location, username } = item.owner
  console.log(location, username)
  console.log('item selected:', item.title)

  const fields = {
    item_requested: {
      type: 'text',
      value: itemRequestedValue,
      // placeholder: item.title
      disabled: true
    },
    item_offered: {
      type: 'select',
      options: userItemsCreated.map(userItem => userItem.title)
    }
  }
  
  
  
  async function handleTradeRequest(formData){
    try {
      console.log('item requested:', formData.item_requested.value),
      console.log(formData)
      await axios.post(`/api/requests/`, formData, {
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
          <p>From <strong>{username}</strong> in <strong>{location}</strong></p>
          <p>{item.description}</p>
          < FormComponent 
            request={handleTradeRequest}
            fields={fields}
            submit='Send Request'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className='modal-button' onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
  )
}