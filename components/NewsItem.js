import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardFooterItem,
  CardImage,
  Icon,
  Media,
  MediaContent,
  MediaLeft,
  MediaRight,
} from "bloomer"
import { BelowDefault, Default } from "../styles/utils"
import Image from "./Image"

export default ({ news }) => {
  return (
    <React.Fragment>
      {news && (
        <Default>
          <Media>
            <MediaLeft>
              <figure className="image figure-media">
                <Image
                  style={{ minWidth: "100%" }}
                  className="media-image"
                  name={news.image}
                  size="320x320"
                  alt="news image"
                />
              </figure>
            </MediaLeft>
            <MediaContent>
              <p className="news-content">{news.content}</p>
              <Button isColor="primary" isInverted isPulled="right">
                <span>Смотреть все наши новости</span>
                <Icon className="fas fa-chevron-right" />
              </Button>
            </MediaContent>
            <MediaRight />
          </Media>
        </Default>
      )}
      {news && (
        <BelowDefault>
          <Card>
            <CardImage>
              <figure className="image figure-card">
                <Image
                  style={{ minWidth: "100%" }}
                  className="media-image"
                  name={news.image}
                  size="620x620"
                  alt="news image"
                />
              </figure>
            </CardImage>
            <CardContent className="media-content">{news.content}</CardContent>
            <CardFooter>
              <CardFooterItem style={{ justifyContent: "space-around" }}>
                <span>Смотреть все наши новости</span>
                <Icon className="fas fa-chevron-right" />
              </CardFooterItem>
            </CardFooter>
          </Card>
        </BelowDefault>
      )}
      <style jsx>{`
        :global(figure.figure-media) {
          width: 200px;
          height: 200px;
          overflow: hidden;
        }
        :global(figure.figure-card) {
          width: 100%;
          height: 100vw;
          overflow: hidden;
        }
        :global(img.media-image) {
          left: 50%;
          top: 50%;
          position: absolute;
          transform: translate(-50%, -50%);
        }
        :global(.media-content) {
          text-align: justify;
          text-justify: inter-word;
        }
        p.news-content {
          margin-bottom: 1rem;
        }
      `}</style>
    </React.Fragment>
  )
}
