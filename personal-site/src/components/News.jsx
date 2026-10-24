// News.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2025-03-04" -> { month: "Mar", day: 4, year: 2025 }
// Parsed by hand so timezones can't shift the day.
function parseDate(str) {
  const [y, m, d] = str.split("-").map(Number);
  return { month: MONTHS[m - 1], day: d, year: y };
}

function DateTile({ date }) {
  const { month, day, year } = parseDate(date);
  return (
    <div
      style={{
        flex: "0 0 auto",
        width: 64,
        height: 76,
        background: "#282828",
        borderRadius: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1.1,
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 600, color: "#e1e1e1" }}>{month}</span>
      <span style={{ fontSize: 26, fontWeight: 700, color: "#fff" }}>{day}</span>
      <span style={{ fontSize: 11, fontWeight: 500, color: "#888", marginTop: 2 }}>{year}</span>
    </div>
  );
}

function News({ news }) {
  const navigate = useNavigate();

  // newest first
  const items = [...news].sort((a, b) => (a.date < b.date ? 1 : -1));

  const open = (item) => {
    if (!item.url) return;
    if (/^https?:\/\//.test(item.url)) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      navigate(item.url);
    }
  };

  return (
    <section style={{ padding: "0 0 32px 0" }}>
      <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 700, marginBottom: 24 }}>News</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item) => {
          const { year } = parseDate(item.date);
          const clickable = Boolean(item.url);
          return (
            <div
              key={item.title + item.date}
              onClick={() => open(item)}
              tabIndex={clickable ? 0 : -1}
              role={clickable ? "link" : undefined}
              onKeyDown={(e) => {
                if (clickable && (e.key === "Enter" || e.key === " ")) open(item);
              }}
              onMouseEnter={(e) => {
                if (clickable) e.currentTarget.style.background = "rgba(80, 80, 80, 0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: 8,
                borderRadius: 8,
                cursor: clickable ? "pointer" : "default",
                transition: "background 0.2s ease",
              }}
            >
              <DateTile date={item.date} />

              <div style={{ minWidth: 0 }}>
                <div style={{ color: "#fff", fontSize: 18, fontWeight: 700, lineHeight: 1.3 }}>{item.title}</div>
                <div style={{ color: "#b3b3b3", fontSize: 15, marginTop: 2, lineHeight: 1.4 }}>
                  {item.description}
                </div>
                <div style={{ color: "#888", fontSize: 14, marginTop: 2 }}>
                  {year}
                  {item.tag && (
                    <div style={{ color: "#888", fontSize: 14, marginTop: 2 }}>{item.tag}</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default News;