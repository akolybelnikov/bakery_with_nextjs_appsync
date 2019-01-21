import { NavbarItem, NavbarLink, NavbarMenu } from 'bloomer'
import Link from 'next/link'
import React from 'react'
import Logo from './logo'

export default props => {
  const { isAuthenticated, email } = props
  return (
    <nav className='navbar is-fixed-top'>
      <NavbarMenu>
        <NavbarItem>
          <Link href='/'>
            <NavbarLink aria-label='Homepage link' className='is-arrowless'>
              <Logo />
            </NavbarLink>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/assortment'>
            <NavbarLink
              aria-label='Assortment link'
              className='is-arrowless is-size-5'>
              Ассортимент
            </NavbarLink>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/offers'>
            <NavbarLink
              aria-label='Offers page link'
              className='is-arrowless is-size-5'>
              Спецпредложения
            </NavbarLink>
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link href='/contact'>
            <NavbarLink
              aria-label='Contact page link'
              className='is-arrowless is-size-5'>
              Контакт
            </NavbarLink>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/about'>
            <NavbarLink
              aria-label='About us page link'
              className='is-arrowless is-size-5'>
              О нас
            </NavbarLink>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={isAuthenticated ? '/user' : '/authenticate'}>
            <NavbarLink
              aria-label='User page link'
              className={
                isAuthenticated
                  ? `is-arrowless`
                  : `is-arrowless is-size-5`
              }>
              {isAuthenticated ? email : 'Вход пользователя'}
            </NavbarLink>
          </Link>
        </NavbarItem>
      </NavbarMenu>
      <style jsx global>
        {`
          .navbar {
            transition: all 0.5s ease-in-out;
            max-width: 1600px;
            margin: 0 auto;
            background-color: rgba(255, 255, 255, 0.5);
          }
          .navbar-menu {
            justify-content: space-evenly;
          }
          .navbar-item {
            transition: all 0.5s ease-in-out;
            text-align: center;
            justify-content: center;
          }
        `}
      </style>
    </nav>
  )
}
