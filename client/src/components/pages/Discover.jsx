import { useEffect, useState } from 'react'
import axios from 'axios'
import TradeItem from '../subcomponents/TradeItem.jsx'

// Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'


export default function Discover() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    async function fetchItems() {
      try {
        const { data } = await axios.get('/api/items/')
        setItems(data)
      } catch(error) {
        console.log(error.message)
        setError(error.message)
      }
    }
    fetchItems()
  }, [])

  return (
    <>
      <h1 className='text-center my-4'>Events</h1>
      <Container fluid className='text-center'>
        <Row>
          { items.length > 0 ?
            items.map(item => {
              const {id, title, description, image, may_contain} = item
              return (
                <Col className='mb-4' key={id} xs={12} sm={6} md={4} lg={3}>
                  <Card className='h-100'>
                    <Card.Img variant="top" src={image} />
                    <Card.Body className='d-flex flex-column'>
                      <Card.Title>{title}</Card.Title>
                      <Card.Text>
                        Description: {description}<br />
                        Allergens: {may_contain}<br />
                      </Card.Text>
                      <Button variant="primary" onClick={() => setModalShow(true)}>Trade!</Button>
                      <TradeItem 
                        {...items}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              )
            })
            :
            error ?
            <p className='text-danger'>{error}</p>
            :
            <Spinner className='mx-auto' animation="grow" variant="secondary" />
          }

        </Row>
      </Container>
    </>

  )
}