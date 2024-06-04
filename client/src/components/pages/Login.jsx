import FormComponent from '../subcomponents/FormComponent.jsx'
import axios from 'axios'
import { setAccess } from '../../lib/auth.js'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const fields = {
    username: 'username',
    password: {
      type: 'password',
      placeholder: '***********'
    },
  }

  const navigate = useNavigate()

  async function handleLogin(formData){
    const { data } = await axios.post('/api/auth/login/', formData)
    setAccess(data.access)
    navigate('/profile')
  }

  return (
    <div className="form-page">
      <p style={{ textAlign: 'center', fontSize: '20px' }}><span style={{ fontWeight: '500', fontSize: '25px' }}>Login</span> with your email address</p>
      <FormComponent request={handleLogin} fields={fields} submit="Login" />
    </div>
  )
}