import { Card, Tag, Avatar, Typography, Progress, Divider } from "antd";
import { CodeOutlined, ToolOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

/**
 * StudentCard — styled as an engineering "spec sheet" rather than a
 * generic SaaS card: graph-paper corner marks, monospace data labels,
 * a circular gauge for score, and an LED-style status indicator.
 *
 * Conditional rendering rules applied here:
 *  1. active               -> LED color + "ONLINE"/"OFFLINE" label
 *  2. gender                -> accent "channel" color (border stripe + avatar ring)
 *  3. programmingExperience -> outlined Tag ("> EXPERIENCED" / "> BEGINNER")
 *  4. score                 -> gauge color/value + tier label ("Excellent" / "Good" / "Need Improvement")
 */
function StudentCard({ student }) {
  const { id, name, gender, age, class: className, active, programmingExperience, score } = student;

  // --- 2. Gender-based accent "channel" (nod to blueprint revision-pencil colors) ---
  const isFemale = gender === "Female";
  const accent = isFemale ? "var(--channel-b)" : "var(--channel-a)";
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // --- 4. Score-based tier ---
  let scoreLabel = "Need Improvement";
  let scoreColor = "var(--rust)";
  if (score >= 90) {
    scoreLabel = "Excellent";
    scoreColor = "var(--brass)";
  } else if (score >= 75) {
    scoreLabel = "Good";
    scoreColor = "var(--teal)";
  }

  return (
    <Card
      className="spec-card"
      style={{ borderLeft: `4px solid ${accent}` }}
      styles={{ body: { padding: 18 } }}
    >
      {/* decorative sign-off stamp, reinforces active/inactive status */}
      <span
        className="stamp"
        style={{ color: active ? "var(--teal)" : "var(--ink-soft)" }}
      >
        {active ? "VERIFIED" : "PENDING"}
      </span>

      {/* --- header: spec id + 1. active status LED --- */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Text className="label-caps">STU-{String(id).padStart(3, "0")}</Text>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span className={`led-dot ${active ? "online" : "offline"}`} />
          <Text className="label-caps" style={{ color: active ? "var(--teal)" : "var(--rust)" }}>
            {active ? "Online" : "Offline"}
          </Text>
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
        <Avatar
          size={44}
          style={{
            background: "#fff",
            color: accent,
            border: `2px solid ${accent}`,
            fontFamily: "IBM Plex Mono, monospace",
            fontWeight: 600,
          }}
        >
          {initials}
        </Avatar>
        <div>
          <Title level={5} className="display-font" style={{ margin: 0 }}>
            {name}
          </Title>
          <Text className="label-caps">{gender}</Text>
        </div>
      </div>

      <Divider dashed style={{ margin: "14px 0", borderColor: "#c9d6e2" }} />

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <Text className="label-caps">Class</Text>
        <Text strong style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 13 }}>
          {className}
        </Text>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <Text className="label-caps">Age</Text>
        <Text strong style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 13 }}>
          {age}
        </Text>
      </div>

      {/* --- 3. Programming experience --- */}
      {programmingExperience ? (
        <Tag
          icon={<CodeOutlined />}
          style={{
            background: "#fff",
            borderColor: "var(--accent)",
            color: "var(--accent)",
            fontFamily: "IBM Plex Mono, monospace",
          }}
        >
          &gt; EXPERIENCED
        </Tag>
      ) : (
        <Tag
          icon={<ToolOutlined />}
          style={{
            background: "#fff",
            borderColor: "#a9b7c4",
            color: "var(--ink-soft)",
            fontFamily: "IBM Plex Mono, monospace",
          }}
        >
          &gt; BEGINNER
        </Tag>
      )}

      {/* --- 4. Score gauge --- */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 16 }}>
        <Progress
          type="dashboard"
          percent={score}
          size={64}
          strokeColor={scoreColor}
          strokeWidth={8}
          format={(pct) => (
            <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 15, fontWeight: 600 }}>
              {pct}
            </span>
          )}
        />
        <div>
          <div className="label-caps">Score rating</div>
          <div className="display-font" style={{ fontWeight: 600, color: scoreColor, fontSize: 15 }}>
            {scoreLabel}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default StudentCard;
