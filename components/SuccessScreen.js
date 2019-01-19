import { Icon, Section } from "bloomer"

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
      hasTextColor="primary">
      <div>
        <Icon className="fas fa-thumbs-up fa-2x" />
      </div>
    </Section>
  )
}
