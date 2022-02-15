import React from 'react'
import { Container, Form, Card, Button, Row, Col } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/constants'

const Auth = () => {
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control className="mt-3" placeholder="Введите ваш email..." />
          <Form.Control className="mt-3" placeholder="Введите ваш пароль..." />
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            <Col className="d-flex justify-content-between">
              {isLogin ? (
                <div style={{ display: 'inline-block' }}>
                  Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегистрируйся!</Link>
                </div>
              ) : (
                <div style={{ display: 'inline-block' }}>
                  Есть аккаунт? <Link to={LOGIN_ROUTE}>Войди!</Link>
                </div>
              )}
              <Button variant={'outline-success'}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  )
}

export default Auth
