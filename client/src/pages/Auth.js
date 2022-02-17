import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Container, Form, Card, Button, Row, Col } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Context } from '..'
import { login, registration } from '../http/userApi'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/constants'

const Auth = observer(() => {
  const { user } = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    try {
      const data = isLogin ? await login(email, password) : await registration(email, password)
      user.setUser(data) //??? data
      user.setIsAuth(true)
      navigate(SHOP_ROUTE)
    } catch (e) {
      console.log(e)
      alert(e.response.data.message)
    }
  }
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш пароль..."
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
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
              <Button variant={'outline-success'} onClick={click}>
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  )
})

export default Auth
