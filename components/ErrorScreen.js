import { Message, MessageBody, Section } from "bloomer"
import Link from "next/link"

export default () => {
  return (
    <Section
      style={{
        position: "absolute",
        height: "100vh",
        width: "100vw",
        left: 0,
        top: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="has-text-centered">
      <Message>
        <MessageBody>Произошла досадная ошибка!</MessageBody>
      </Message>
      <Link href="/">
        <a className="button is-primary is-small is-outlined">Вернуться.</a>
      </Link>
    </Section>
  )
}
