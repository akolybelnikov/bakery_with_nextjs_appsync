import { Card } from 'bloomer/lib/components/Card/Card'
import { CardContent } from 'bloomer/lib/components/Card/CardContent'
import Vote from './Vote'

export default ({ votes }) => {
  console.log(votes)
  return (
    <div className='votes'>
      {votes.map((vote, i) => (
        <Vote key={i} vote={vote} />
      ))}
      <style jsx>
        {`
          .votes {
            width: 100%;
            height: fit-content;
            display: flex;
            align-items: flex-start;
            justify-content: space-evenly;
            flex-wrap: wrap;
          }
        `}
      </style>
    </div>
  )
}
