// src/components/Services/Services.jsx
import React from "react";
import "./Services.css";

const SERVICE_LIST = [
  {
    title: "Play Therapy",
    body: `Play is a child's primary language. Using play as a therapeutic medium helps
    children develop self-regulation, emotional literacy and adaptable social skills.`,
  },
  {
    title: "Grown-up Consultation",
    body: `Monthly sessions for caregivers and professionals focused on strategies,
    insights, and practical supports to help children thrive.`,
  },
  {
    title: "School Consultation",
    body: `Assessing and improving a child's educational environment to better meet
    developmental and learning needs through targeted interventions.`,
  },
  {
    title: "Clinical Supervision",
    body: `Individual and group supervision to support social workers in building
     confidence, clinical skills, and career growth.`,
  }
];

export default function Services() {
  return (
    <div className="container">
      <div className="section-header">
        <p className="heading">Services</p>
        <h2 className="section-title">What I offer</h2>
        <p className="text-muted">Tailored care rooted in relationship and evidence-based practice.</p>
      </div>

      <div className="services-grid">
        {SERVICE_LIST.map(s => (
          <article key={s.title} className="service-card card">
            <h3 className="service-title">{s.title}</h3>
            <p className="text-muted">{s.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
