import { NavbarBrand, NavbarItem, NavbarLink, NavbarMenu } from 'bloomer'
import Link from 'next/link'
import React, { Component } from 'react'
import { fromEvent, Subscription } from 'rxjs'
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  throttleTime,
} from 'rxjs/operators'
import { Default, Handset, SmallHandset } from '../styles/utils'
import Logo from './logo'
import Burger from './SVG/burger'

const Direction = {
  Up: 'up',
  Down: 'down',
}

export default class MobileHeader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isMenuActive: false,
      isScrolledUp: true,
    }
  }

  scrollUpSubscription = new Subscription()
  scrollDownSubscription = new Subscription()

  componentDidMount() {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(100),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]) => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share(),
    )
    const scrollUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up),
    )

    const scrollDown$ = scroll$.pipe(
      filter(direction => direction === Direction.Down),
    )

    this.scrollUpSubscription = scrollUp$.subscribe(() => {
      return this.setState({ isScrolledUp: true })
    })
    this.scrollDownSubscription = scrollDown$.subscribe(() => {
      if (window.pageYOffset > 0) {
        return this.setState({ isScrolledUp: false })
      }
    })
  }

  componentWillUnmount() {
    this.scrollUpSubscription.unsubscribe()
    this.scrollDownSubscription.unsubscribe()
  }

  onToggleMenu = () => {
    this.setState({
      isMenuActive: !this.state.isMenuActive,
    })
  }

  onCloseMenu = () => {
    if (this.state.isMenuActive) this.setState({ isMenuActive: false })
  }

  render() {
    const { isAuthenticated, email } = this.props
    return (
      <nav className='navbar is-fixed-top'>
        <NavbarBrand>
          <NavbarItem className='logo' isHidden='desktop'>
            <Link href='/'>
              <NavbarLink
                onClick={this.onCloseMenu}
                aria-label='Homepage link'
                className='is-arrowless'>
                <Logo />
              </NavbarLink>
            </Link>
          </NavbarItem>

          {isAuthenticated && (
            <Default>
              <NavbarItem isHidden='desktop'>
                <Link href='/user'>
                  <NavbarLink
                    onClick={this.onCloseMenu}
                    aria-label='User profile page link'
                    className='is-arrowless'>
                    {email}
                  </NavbarLink>
                </Link>
              </NavbarItem>
            </Default>
          )}

          <NavbarItem className='burgericon'>
            <SmallHandset>
              <Burger
                height={60}
                width={60}
                isActive={this.state.isMenuActive}
                onToggleMenu={this.onToggleMenu}
              />
            </SmallHandset>
            <Handset>
              <Burger
                height={70}
                width={70}
                isActive={this.state.isMenuActive}
                onToggleMenu={this.onToggleMenu}
              />
            </Handset>
            <Default>
              <Burger
                height={80}
                width={80}
                isActive={this.state.isMenuActive}
                onToggleMenu={this.onToggleMenu}
              />
            </Default>
          </NavbarItem>
        </NavbarBrand>
        <NavbarMenu isActive={this.state.isMenuActive}>
          <NavbarItem>
            <Link href='/assortment'>
              <NavbarLink
                aria-label='Assortment link'
                onClick={this.onCloseMenu}
                className='is-arrowless is-size-5-tablet'>
                Ассортимент
              </NavbarLink>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='/offers'>
              <NavbarLink
                aria-label='Offers page link'
                onClick={this.onCloseMenu}
                className='is-arrowless is-size-5-tablet'>
                Спецпредложения
              </NavbarLink>
            </Link>
          </NavbarItem>
          <NavbarItem isHidden='touch'>
            <Link href='/'>
              <NavbarLink aria-label='Homepage link' className='is-arrowless'>
                <Logo />
              </NavbarLink>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='/contact'>
              <NavbarLink
                aria-label='Contact page link'
                onClick={this.onCloseMenu}
                className='is-arrowless is-size-5-tablet'>
                Контакт
              </NavbarLink>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='/about'>
              <NavbarLink
                onClick={this.onCloseMenu}
                aria-label='About us page link'
                className='is-arrowless is-size-5-tablet'>
                О нас
              </NavbarLink>
            </Link>
          </NavbarItem>
        </NavbarMenu>
        <style jsx global>
          {`
            .navbar {
              transition: all 0.5s ease-in-out;
              max-width: 1024px;
              margin: 0 auto;
              background-color: rgba(255, 255, 255, 0.5);
              top: ${this.state.isScrolledUp ? 0 : -7.25}em !important;
            }
            .navbar-menu {
              justify-content: space-evenly;
              background-color: rgba(255, 255, 255, 0.5);
            }
            .navbar-brand {
              justify-content: space-between !important;
            }
            .navbar-item {
              transition: all 0.5s ease-in-out;
              text-align: center;
              justify-content: center;
            }
            .burgericon {
              transition: all 0.5s ease-in-out;
              cursor: pointer;
              min-width: 85px;
              min-height: 85px;
              justify-content: flex-end;
            }
            @media all and (max-width: 825px) {
              .navbar-item {
                flex: 0 0 28%;
              }
            }
          `}
        </style>
      </nav>
    )
  }
}
