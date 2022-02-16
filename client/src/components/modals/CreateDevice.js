import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu'
import { Context } from '../..'

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context)
  const [info, setInfo] = useState([])
  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number))
  }
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить устройство</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="d-flex align-content-center justify-content-center">
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle>Выберите тип</Dropdown.Toggle>
              <DropdownMenu>
                {device.types.map((type) => (
                  <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle>Выберите бренд</Dropdown.Toggle>
              <DropdownMenu>
                {device.brands.map((brand) => (
                  <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Form.Control placeholder={'Изображение'} type="file" className="mt-2 mb-2" />
            <Form.Control placeholder={'Введите название устройства'} className="mt-2 mb-2" />
            <Form.Control placeholder={'Введите цену'} className="mt-2 mb-2" />
            <hr />
            <Button variant={'outline-dark'} onClick={addInfo}>
              Добавить характеристику
            </Button>
            {info.map((i) => (
              <Row className="mt-4" key={i.number}>
                <Col md={4}>
                  <Form.Control placeholder="Название"></Form.Control>
                </Col>
                <Col md={4}>
                  <Form.Control placeholder="Значение"></Form.Control>
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
        <Button variant="outline-success" onClick={onHide}>
          Добавить
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateDevice
