import React, { useContext } from 'react'
import { Context } from '..'
import { Nav, Navbar, Button, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { SHOP_ROUTE } from '../utils/constants'
import { observer } from 'mobx-react-lite'

const NavBar = observer(() => {
  const { user } = useContext(Context)

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>
          ДавайПокупай
        </NavLink>

        {user.isAuth ? (
          <Nav className="ml-auto">
            <Button variant={'outline-light'}>Админ панель</Button>
            <Button variant={'outline-light'} style={{ marginLeft: '6px' }} onClick={() => user.setIsAuth(false)}>
              Выход
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button variant={'outline-light'} onClick={() => user.setIsAuth(true)}>
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  )
})
export default NavBar
