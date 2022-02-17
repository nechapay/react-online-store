import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import bigStar from '../assets/bigStar.png'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { fetchSingleDevice } from '../http/deviceApi'

const DevicePage = observer(() => {
  const [device, setDevice] = useState({ info: [] })
  const { id } = useParams()
  useEffect(() => {
    fetchSingleDevice(id).then((data) => setDevice(data))
  }, [id])

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4} className="d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex justify-content-center align-items-center" style={{ width: '300px', height: '300px' }}>
            <Image src={process.env.REACT_APP_API_URL + device.img} style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </div>
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center justify-content-center">
            <h2 className="d-flex flex-column align-items-center justify-content-center">{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 286,
                height: 272,
                backgroundSize: 'cover',
                fontSize: 64
              }}
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgrey' }}
          >
            <h3>От: {device.price} руб.</h3>
            <Button variant={'outline-dark'}>Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {device.info.map((info, index) => (
          <Row key={info.id} style={{ background: index % 2 === 0 ? 'lightgrey' : 'transparent', padding: 10 }}>
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  )
})

export default DevicePage
