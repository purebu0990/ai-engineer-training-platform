import { useEffect, useState } from "react";
import { fetchDashboard } from "../services/api";
import { useRouter } from "next/router";
import '../styles/dashboard.css';
import CodeReviewBot from "../components/CodeReviewBot"; // ← import
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [userName, setUserName] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");


    if (!token) {
      router.push("/login");
      return;
    }

     try {
    const decoded = jwtDecode(token);
    setUserName(decoded.name || "");
  } catch (e) {
    console.error("JWT decode failed", e);
  }

    fetchDashboard(token)
      .then((res) => setData(res))
      .catch(() => router.push("/login"));
  }, [router]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">MyStudy</h2>

        <nav>
          <button className="active">Dashboard</button>
          <button>Courses</button>
          <button>Events</button>
          <button>Assignment</button>
          <button>Settings</button>
          <button>Logout</button>
        </nav>
      </aside>

      {/* Main */}
      <main className="main">

        <div className="header">
          <input placeholder="Search courses..." />
        </div>

        <h2>{userName ? `お帰りなさい、${userName}さん！` : "Welcome!"}</h2>
        {!data.hasAssessment && (
        <div className="assessment-card">
        <h3>スキル診断が未実施です</h3>
        <p>まずは診断を受けて学習を開始しましょう。</p>

    <button
      className="assessment-btn"
      onClick={() => router.push("/assessment")}
    >
      診断を開始
    </button>
  </div>
)}
        <div className="courses">
          <div className="card">
            <div className="thumb"></div>
            <h3>Course One</h3>
            <p>Beginner</p>
          </div>

          <div className="card">
            <div className="thumb"></div>
            <h3>Course Two</h3>
            <p>Intermediate</p>
          </div>
        </div>
      </main>

      {/* Right Panel */}
      <section className="right">

        <h3>学習状況</h3>

        <div className="progress-circle">
          65%
        </div>

        <h3>タスク</h3>

        <div className="task">Create Task One</div>
        <div className="task">Create Task Two</div>

      </section>
      <CodeReviewBot />
    </div>
  );
}
