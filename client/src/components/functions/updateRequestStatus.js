export const updateRequestStatus = async (requestId, newStatus) => {
  const response = await fetch(`/api/requests/${requestId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: newStatus }),
  })

  if (!response.ok) {
    throw new Error('Failed to update request status');
  }

  return response.json()
}