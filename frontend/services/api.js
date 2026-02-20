const API_BASE = "http://localhost:8080/api";

export async function fetchDashboard(token) {
  const res = await fetch(`${API_BASE}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

export async function saveAssessment(token, data) {
  const res = await fetch(`${API_BASE}/assessment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}
