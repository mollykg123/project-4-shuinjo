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
  const [selectedItem, setSelecteditem] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const [error, setError] = useState('')



  useEffect(() => {
    async function fetchItems() {
      try {
        const { data } = await axios.get('/api/items/')
        setItems(data)
      } catch (error) {
        console.log(error.message)
        setError(error.message)
      }
    }
    fetchItems()
  }, [])

  const handleTradeModal = (item) => {
    setSelecteditem(item)
    setModalShow(true)
  }

  const handleCloseModal = () => {
    setModalShow(true)
    setSelecteditem(null)
  }

  console.log(selectedItem)

  return (
    <Container fluid className='text-center discover-background'>
      <h1 className='text-center mb-4'>Find an Item to trade!</h1>
      <Row>
        {items.length > 0 &&
          items.map(item => {
            const { id, title, description, image, may_contain, desired_trades } = item
            return (
              <Col className='mb-4' key={id} xs={12} sm={6} md={4} lg={3}>
                <Card className='h-100'>
                  <Card.Img                           
                    variant="top" 
                    src={item.image} 
                    alt= {item.title} 
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                  <Card.Body className='d-flex flex-column'>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                      {description}<br />
                      {may_contain && `Allergens: ${may_contain}`}<br />
                      {desired_trades && `Desired Trades: ${desired_trades}`}
                    </Card.Text>
                    <Button className='modal-button' onClick={() => {
                      handleTradeModal(item)
                    }}>
                      Trade!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          })
        }
      </Row>
      <TradeItem
        item={selectedItem}
        show={modalShow}
        onHide={handleCloseModal}
        onSuccess={handleCloseModal}
      />
    </Container>
  )
}