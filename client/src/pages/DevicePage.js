import React from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import bigStar from '../assets/bigStar.png'

const DevicePage = () => {
  const device = {
    id: 1,
    name: 'iPhone 12 pro',
    price: 100000,
    rating: 5,
    img: 'https://mgppu.ru/resources/images/300x300.png'
  }
  const description = [
    { id: 1, title: 'Оперативная память', description: '5гб' },
    { id: 1, title: 'Камера', description: '12мп' },
    { id: 1, title: 'Процессор', description: 'Пентиум 3' },
    { id: 1, title: 'Кол-во ядер', description: '2' },
    { id: 1, title: 'Аккумулятор', description: '4000' }
  ]
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4} className="d-flex flex-column align-items-center justify-content-center">
          <Image width={300} height={300} src={device.img} />
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
        {description.map((info, index) => (
          <Row key={info.id} style={{ background: index % 2 === 0 ? 'lightgrey' : 'transparent', padding: 10 }}>
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  )
}

export default DevicePage
