import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'
import CreatType from '../components/modals/CreateType'

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  const [deviceVisible, setDeviceVisible] = useState(false)
  return (
    <Container className="d-flex flex-column">
      <Button variant={'outline-dark'} className="m-4 p-2" onClick={() => setBrandVisible(true)}>
        Добавить бренд
      </Button>
      <Button variant={'outline-dark'} className="m-4 p-2" onClick={() => setDeviceVisible(true)}>
        Добавить устройство
      </Button>
      <Button variant={'outline-dark'} className="m-4 p-2" onClick={() => setTypeVisible(true)}>
        Добавить тип
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
      <CreatType show={typeVisible} onHide={() => setTypeVisible(false)} />
    </Container>
  )
}

export default Admin
