import React, { useState } from "react";

const AssessmentPage = () => {
  const [skillName, setSkillName] = useState("");
  const [score, setScore] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:8080/api/assessments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            skillName,
            score,
          }),
        }
      );

      if (response.ok) {
        setMessage("Assessment saved!");
      } else {
        setMessage("Failed to save assessment");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Assessment登録</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Skill name"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />

        <button type="submit">保存</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AssessmentPage;
