import { useState } from 'react'
import axios from 'axios'
import { getAccess } from '../../lib/auth'

export function useUpdateStatusRequest() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateStatus = async (requestId, status, onUpdate) => {
    setLoading(true)
    setError(null)
    try {
      console.log(requestId)
      console.log(`Bearer ${getAccess}`)
      const response = await axios.patch(`/api/requests/${requestId}/`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${getAccess}`
          }
        })
      if (response.status === 200) {
        onUpdate()
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Error updating status')
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, updateStatus }
}