import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FormComponent from './FormComponent'
import axios from 'axios'
import { getAccess } from '../../lib/auth.js'
import { useEffect, useState } from 'react'
import { getUserProfile } from '../functions/getUserProfile.js'


export default function TradeItem({ item, onHide, show, onSuccess }) {

  // console.log(item)
  const [userItemsCreated, setUserItemsCreated] = useState([])
  console.log(item)
  // const [itemRequestedValue, setItemRequestedValue] = useState(item.title || '')


  useEffect(() => {
    getUserProfile()
      .then(data => {
        setUserItemsCreated(data.items_created)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  if (!item) {
    return null
  }


  const { location, username } = item.owner
  // console.log(location, username)
  // console.log('item selected:', item.title)

  const fields = {
    item_requested: {
      type: 'select',
      value: item.id,
      options: [{
        value: item.id,
        label: item.title
      }],
      // placeholder: item.title
      disabled: true
    },
    item_offered: {
      type: 'select',
      options: userItemsCreated.map(userItem => {
        return {
          value: userItem.id,
          label: userItem.title
        }
      })
    }
  }



  async function handleTradeRequest(formData) {
    try {
      console.log('item requested:', formData.item_requested.value),
        console.log(formData)
      await axios.post(`/api/requests/`, formData, {
        headers: {
          Authorization: `Bearer ${getAccess()}`
        }
      })
      if (onSuccess) onSuccess()
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
      <img                         
        src={item.image} 
        alt= {item.title} 
        style={{ maxWidth: '100%', height: 'auto'}}/>
      <Modal.Body>
        {`From ${username} in ${location}`}<br />
        {item.description}
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