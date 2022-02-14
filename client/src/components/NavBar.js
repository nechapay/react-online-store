import React, { useContext } from 'react'
import { Context } from '..'
import { Nav, Navbar, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { SHOP_ROUTE } from '../utils/constants'
import { observer } from 'mobx-react-lite'

const NavBar = observer(() => {
  const { user } = useContext(Context)
  return (
    <Navbar justify bg="dark" variant="dark" style={{ padding: '10px' }}>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <NavLink style={{ color: 'white', marginRight: 'auto' }} to={SHOP_ROUTE}>
        ДавайПокупай
      </NavLink>

      {user.isAuth ? (
        <Nav className="ml-auto">
          <Button variant={'outline-light'}>Админ панель</Button>
          <Button variant={'outline-light'} onClick={() => user.setIsAuth(false)}>
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
    </Navbar>
  )
})
export default NavBar
