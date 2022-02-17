import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Context } from '..'

const BrandBar = observer(() => {
  const { device } = useContext(Context)
  return (
    <Row>
      <Col className="d-flex flex-wrap">
        {device.brands.map((brand) => (
          <Card
            style={{ cursor: 'pointer' }}
            border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
            onClick={() =>
              brand.id !== device.selectedBrand.id ? device.setSelectedBrand(brand) : device.setSelectedBrand({})
            }
            key={brand.id}
            className="m-2 p-2"
          >
            {brand.name}
          </Card>
        ))}
      </Col>
    </Row>
  )
})

export default BrandBar
