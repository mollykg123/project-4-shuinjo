import axios from 'axios'
import { getAccess } from '../../lib/auth.js'
import FormComponent from './FormComponent.jsx'

export default function CreateItem() {

  const fields = {
    title: {
      type: 'text',
      placeholder: 'name of item here'
    },
    image: {
      type: 'text',
      placeholder: 'upload an image'
    },
    description: {
      type: 'text',
      placeholder: 'please write short description here. (Max 200 characters)'
    },
    may_contain: {
      type: 'multi',
      placeholder: 'multiple options'
    },
    desired_trades: {
            type: 'multi',
      placeholder: 'multiple options'
    }
  }

  async function handleCreate(formData){
    try {
      await axios.post('/api/items/', formData, {
        headers: {
          Authorization: `Bearer ${getAccess()}`
        }
      })
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div className='form-component'>
      <FormComponent
        request={handleCreate}
        fields={fields}
        submit='Upload Item'
      />
    </div>
  )
}