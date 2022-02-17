import React, { useContext } from 'react'
import { Context } from '..'
import { Nav, Navbar, Button, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/constants'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

const NavBar = observer(() => {
  const { user } = useContext(Context)
  const navigate = useNavigate()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    navigate(LOGIN_ROUTE)
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>
          ДавайПокупай
        </NavLink>

        {user.isAuth ? (
          <Nav className="ml-auto">
            <Button variant={'outline-light'} onClick={() => navigate(ADMIN_ROUTE)}>
              Админ панель
            </Button>
            <Button variant={'outline-light'} style={{ marginLeft: '6px' }} onClick={() => logOut()}>
              Выход
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  )
})
export default NavBar
