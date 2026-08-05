import { useMemo, useState } from "react";
import { Layout, Typography, Row, Col, Radio, Input, Space, Empty } from "antd";
import StudentCard from "./components/StudentCard.jsx";
import students from "./data/students.js";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

function App() {
  const [filter, setFilter] = useState("all"); // all | active | inactive
  const [query, setQuery] = useState("");

  // Bonus 2 (filter) + Bonus 3 (search) combined, memoized so we
  // don't recompute on every unrelated re-render.
  const visibleStudents = useMemo(() => {
    return students
      .filter((s) => {
        if (filter === "active") return s.active;
        if (filter === "inactive") return !s.active;
        return true;
      })
      .filter((s) => s.name.toLowerCase().includes(query.trim().toLowerCase()));
  }, [filter, query]);

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Header style={{ background: "#001529", padding: "0 24px" }}>
        <Title level={3} style={{ color: "#fff", margin: 0, lineHeight: "64px" }}>
          Student Dashboard
        </Title>
      </Header>

      <Content style={{ padding: 24, maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <Space direction="vertical" size="middle" style={{ width: "100%", marginBottom: 24 }}>
          <Text type="secondary">
            Showing {visibleStudents.length} of {students.length} students
          </Text>

          <Space wrap size="middle" style={{ width: "100%", justifyContent: "space-between" }}>
            {/* Bonus 2 — Filter buttons */}
            <Radio.Group value={filter} onChange={(e) => setFilter(e.target.value)}>
              <Radio.Button value="all">All</Radio.Button>
              <Radio.Button value="active">Active</Radio.Button>
              <Radio.Button value="inactive">Inactive</Radio.Button>
            </Radio.Group>

            {/* Bonus 3 — Search by name */}
            <Search
              placeholder="Search student..."
              allowClear
              onChange={(e) => setQuery(e.target.value)}
              style={{ maxWidth: 280 }}
            />
          </Space>
        </Space>

        {visibleStudents.length === 0 ? (
          <Empty description="No students match this filter/search" />
        ) : (
          <Row gutter={[16, 16]}>
            {/* Required: render 20 students via .map(), not manually */}
            {visibleStudents.map((student) => (
              <Col xs={24} sm={12} md={8} lg={6} key={student.id}>
                <StudentCard student={student} />
              </Col>
            ))}
          </Row>
        )}
      </Content>
    </Layout>
  );
}

export default App;
