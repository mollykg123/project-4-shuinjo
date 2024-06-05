import { useState, useEffect } from 'react'
import axios from 'axios'
import { getAccess } from '../../lib/auth'
import FormComponent from './FormComponent.jsx'

export default function UpdateItem({ item, onUpdated }) {
  const fields = {
    title: {
      type: 'text',
      placeholder: 'Name of item here'
    },
    image: {
      type: 'text',
      placeholder: 'Upload an image'
    },
    description: {
      type: 'text',
      placeholder: 'Please write short description here. (Max 200 characters)'
    },
    may_contain: {
      type: 'multi',
      placeholder: 'Multiple options'
    },
    desired_trades: {
      type: 'multi',
      placeholder: 'Multiple options'
    }
  }

  const [formData, setFormData] = useState({
    title: item.title,
    image: item.image,
    description: item.description,
    may_contain: item.may_contain || [],
    desired_trades: item.desired_trades || []
  })

  useEffect(() => setFormData({
    title: item.title,
    image: item.image,
    description: item.description,
    may_contain: item.may_contain || [],
    desired_trades: item.desired_trades || []
  }), [item])

  async function handleUpdate(formData) {
    try {
      await axios.put(`/api/items/${item.id}/`, formData, {
        headers: {
          Authorization: `Bearer ${getAccess()}`
        }
      })
      onUpdated()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <FormComponent
      request={handleUpdate}
      fields={fields}
      initialData={formData}
      submit='Update Item'
    />
  )
}