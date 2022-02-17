import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu'
import { Context } from '../..'
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceApi'

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data))
    fetchBrands().then((data) => device.setBrands(data))
  }, [device])

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number))
  }
  const changeInfo = (key, value, number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)))
  }

  const selectFile = (e) => {
    setFile(e.target.files[0])
  }

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then(() => {
      resetForm()
      onHide()
    })
  }

  const resetForm = () => {
    device.setSelectedType({})
    device.setSelectedBrand({})
    setInfo([])
    setName('')
    setFile(null)
    setPrice(0)
  }

  return (
    <Modal show={show} onHide={onHide} centered style={{ minWidth: '50%' }}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить устройство</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="d-flex align-content-center justify-content-center">
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle>{device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
              <DropdownMenu>
                {device.types.map((type) => (
                  <Dropdown.Item key={type.id} onClick={() => device.setSelectedType(type)}>
                    {type.name}
                  </Dropdown.Item>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle>{device.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
              <DropdownMenu>
                {device.brands.map((brand) => (
                  <Dropdown.Item key={brand.id} onClick={() => device.setSelectedBrand(brand)}>
                    {brand.name}
                  </Dropdown.Item>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Form.Control
              placeholder={'Введите название устройства'}
              className="mt-2 mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Control
              placeholder={'Введите цену'}
              className="mt-2 mb-2"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Form.Control placeholder={'Изображение'} type="file" className="mt-2 mb-2" onChange={selectFile} />
            <hr />
            <Row>
              <Col md={8}>
                <h4>Характеристики</h4>
              </Col>
              <Col md={4}>
                <Button variant={'outline-dark'} onClick={addInfo}>
                  Добавить
                </Button>
              </Col>
            </Row>
            {info.map((i) => (
              <Row className="mt-4" key={i.number}>
                <Col md={4}>
                  <Form.Control
                    placeholder="Название"
                    value={i.title}
                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                  ></Form.Control>
                </Col>
                <Col md={4}>
                  <Form.Control
                    placeholder="Значение"
                    value={i.description}
                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                  ></Form.Control>
                </Col>
                <Col md={4}>
                  <Button variant={'outline-danger'} onClick={() => removeInfo(i.number)}>
                    Удалить
                  </Button>
                </Col>
              </Row>
            ))}
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addDevice}>
          Добавить
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => {
            resetForm()
            onHide()
          }}
        >
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateDevice
