import { Icon, Section } from "bloomer"

export default () => {
  return (
    <Section
      hasTextColor="primary"
      style={{
        position: "absolute",
        height: "100vh",
        width: "100vw",
        left: 0,
        top: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div>
        <Icon
          className="fas fa-spinner fa-pulse fa-2x"
          style={{ display: "block" }}
        />
      </div>
    </Section>
  )
}
