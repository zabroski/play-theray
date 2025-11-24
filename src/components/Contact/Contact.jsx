// src/components/Contact/Contact.jsx
import React from "react";
import "./Contact.css";
import Drawing from "../../assets/drawing.png";

const FORMSPREE_ENDPOINT = process.env.REACT_APP_FORMSPREE_ENDPOINT || "https://formspree.io/f/yourFormId";

export default function Contact() {
  const [form, setForm] = React.useState({ name: "", email: "", message: "", _gotcha: "" });
  const [status, setStatus] = React.useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = React.useState("");

  function update(e) {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    // honeypot
    if (form._gotcha) {
      setStatus("success");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Website: New message from ${form.name}`
        })
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "", _gotcha: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error || data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Network error. Please try again later.");
    }
  }

  return (
    <div className="container contact">
      <div className="row">
        <div>
          <div className="heading">Contact</div>
          <h2 className="section-title">Let's connect</h2>
          <p className="text-muted">If you'd like to schedule or ask a question, send a short message below.</p>

          <form className="contact-form card" onSubmit={handleSubmit} noValidate aria-label="Contact form">
            {/* honeypot */}
            <input type="text" name="_gotcha" value={form._gotcha} onChange={update} style={{display:"none"}} autoComplete="off" />

            <div className="form-row">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" value={form.name} onChange={update} required placeholder="Your name" autoComplete="name" />
            </div>

            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={update} required placeholder="you@example.com" autoComplete="email" />
            </div>

            <div className="form-row">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" value={form.message} onChange={update} required placeholder="Tell me a bit about what you'd like help with…" />
            </div>

            <div style={{marginTop:12, display:"flex", gap:12}}>
              <button className="btn" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
              </button>

              <button type="button" className="btn-ghost" onClick={() => { setForm({ name: "", email: "", message: "", _gotcha: "" }); setErrorMsg(""); setStatus("idle"); }}>
                Reset
              </button>
            </div>

            <div aria-live="polite" style={{marginTop:12}}>
              {status === "success" && <div className="success">Thanks — your message has been sent. I’ll get back to you shortly.</div>}
              {status === "error" && <div className="error">Sorry: {errorMsg}</div>}
              {errorMsg && status === "idle" && <div className="error">{errorMsg}</div>}
            </div>

            <p className="text-muted" style={{marginTop:10}}>
              Or email directly: <a href="mailto:summersheridanzabreLCSW@gmail.com">summersheridanzabreLCSW@gmail.com</a>
            </p>
          </form>
        </div>

        <aside>
          <div className="card">
            <img src={Drawing} alt="Therapeutic drawing" />
            <div style={{marginTop:12}}>
              <div className="heading">Office</div>
              <div style={{fontWeight:600}}>295 Central Park West</div>
              <div className="text-muted">New York, NY 10024</div>

              <div style={{marginTop:10}}>
                <div className="heading">Hours</div>
                <div className="text-muted">By appointment only</div>
              </div>

              <div style={{marginTop:10}}>
                <a href="mailto:summersheridanzabreLCSW@gmail.com" className="text-muted">summersheridanzabreLCSW@gmail.com</a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
