// src/components/Testimonials/Testimonials.jsx
import React from "react";
import "./Testimonials.css";

const DATA = [
  { quote: "Summer helped our child gain confidence and find joy at school again.", author: "– Parent" },
  { quote: "Thoughtful supervision that helped me grow as a social worker.", author: "– Social Work Student" }
];

export default function Testimonials() {
  return (
    <div className="container">
      <div>
        <p className="heading">Testimonials</p>
        <h3 className="section-title">Kind words from families and colleagues</h3>
      </div>

      <div className="test-grid">
        {DATA.map((t, i) => (
          <figure className="testimonial-card card" key={i}>
            <blockquote style={{margin:0}} className="text-muted">“{t.quote}”</blockquote>
            <figcaption style={{marginTop:12, fontWeight:600}}>{t.author}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
