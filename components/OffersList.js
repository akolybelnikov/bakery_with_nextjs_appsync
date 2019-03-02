import { useRef } from 'react'
import { animated, interpolate, useSprings } from 'react-spring'
import { useGesture } from 'react-with-gesture'
import { clamp, move } from '../lib/helpers'
import OfferItem from './OfferItem'

export default function({ items, height }) {
  const fn = (order, down, originalIndex, curIndex, y) => index =>
    down && index === originalIndex
      ? {
          y: curIndex * height + y,
          scale: 1.1,
          zIndex: '1',
          shadow: 15,
          immediate: n => n === 'y' || n === 'zIndex',
        }
      : {
          y: order.indexOf(index) * height,
          scale: 1,
          zIndex: '0',
          shadow: 1,
          immediate: false,
        }

  const order = useRef(items.map((_, index) => index))

  const [springs, setSprings] = useSprings(items.length, fn(order.current))

  const bind = useGesture(({ args: [originalIndex], down, delta: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = clamp(
      Math.round((curIndex * 100 + y) / 100),
      0,
      items.length - 1,
    )
    const newOrder = move(order.current, curIndex, curRow)
    setSprings(fn(newOrder, down, originalIndex, curIndex, y))
    if (!down) order.current = newOrder
  })

  return (
    <div className='list-content' style={{ height: items.length * height }}>
      {springs.map(({ zIndex, shadow, y, scale }, i) => (
        <animated.div
          className='offer-item'
          {...bind(i)}
          key={i}
          style={{
            zIndex,
            boxShadow: shadow.interpolate(
              s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`,
            ),
            transform: interpolate(
              [y, scale],
              (y, s) => `translate3d(0,${y}px,0) scale(${s})`,
            ),
          }}
          children={<OfferItem item={items[i]} />}
        />
      ))}
      <style jsx>
        {`
          :global(.list-content) {
            cursor: url(../static/cursor.png) 20 20, auto;
          }
          .list-content {
            position: relative;
            width: 100%;
          }
          :global(.offer-item) {
            width: 80%;
            position: absolute;
            height: fit-content;
            pointer-events: auto;
            transform-origin: 50% 50% 0px;
            border-radius: 5px;
            color: white;
            padding: 12.5px 32px;
            font-size: 14.5px;
            letter-spacing: 2px;
            height: 175px;
            background: linear-gradient(135deg, #753957 25%, #eaccb2 100%);
            overflow: scroll;
            display: flex;
            align-items: center;
            margin-left: 10%;
          }
          @media all and (max-width: 599px) {
            :global(.offer-item) {
              width: 90%;
              margin-left: 5%;
              height: 425px;
              padding: 10px;
            }
          }
        `}
      </style>
    </div>
  )
}
