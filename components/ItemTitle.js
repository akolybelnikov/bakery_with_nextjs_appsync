import { theme } from '../styles/utils'

export default ({ content, lineHeight, fontSize }) => {
  return (
    <div className='title'>
      <p>{content}</p>
      <style jsx>
        {`
          div {
            font-size: ${fontSize};
            line-height: ${lineHeight};
            color: #fff;
            background: ${theme.infoShadow};
            font-weight: 400;
            padding: 0.5em;
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: center;
          }
        `}
      </style>
    </div>
  )
}
