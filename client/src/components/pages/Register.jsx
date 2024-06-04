import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import FormComponent from '../subcomponents/FormComponent.jsx'

export default function Register() {
  
    const fields = {
      username: {
        type: 'text',
        placeholder: 'please choose a username'
      },
      password: {
        type: 'password',
        placeholder: '***********'
      },
      password_confirmation: {
        type: 'password',
        placeholder: '***********'
      },
      location: 'text'
    }

  const navigate = useNavigate()

  async function handleRegister(formData) {
    await axios.post('/api/auth/register/', formData)
    console.log(formData)
    navigate('/login')
  }

  return (
    <div className="form-page">
      <p style={{ textAlign: 'center', fontSize: '20px' }}><span style={{ fontWeight: '500', fontSize: '25px' }}>Sign Up</span> with your email address</p>
      <FormComponent request={handleRegister} fields={fields} submit="Sign Up" />
    </div>
  )
}