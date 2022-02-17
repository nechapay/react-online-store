import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import star from '../assets/star.png'
import { useNavigate } from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/constants'
import { Context } from '..'

const DeviceItem = observer(({ device }) => {
  const deviceStore = useContext(Context).device
  const navigate = useNavigate()

  const brand = (id) => {
    return deviceStore.brands.filter((i) => i.id === id)[0]
  }
  return (
    <Col md={3} className={'mt-3'} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
      <Card style={{ width: 150, cursor: 'pointer' }} border={'light'}>
        <div className="d-flex justify-content-center align-items-center" style={{ width: '150px', height: '150px' }}>
          <Image src={process.env.REACT_APP_API_URL + device.img} style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>

        <div className="text-black-50 d-flex justify-content-between align-items-center">
          <div>
            {brand(device.brandId).name} {}
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>{device.rating}</div>
            <Image src={star} />
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  )
})

export default DeviceItem
