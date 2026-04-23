import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import Loader from '../components/Loader'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [pageLoading, setPageLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setPageLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill all fields.')
      return
    }

    setSending(true)

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'raviazen@gmail.com'
    }

    try {
      await emailjs.send('service_8t129l2', 'template_i4o3h9n', templateParams, 'pcWdyondr8G6jVez-')
      setSent(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setError('Gagal mengirim lewat server; gunakan email fallback atau coba lagi.')
    } finally {
      setSending(false)
    }
  }

  const mailtoHref = () => {
    const subject = encodeURIComponent('Portfolio contact from ' + (formData.name || 'website'))
    const body = encodeURIComponent((formData.message || '') + '\n\nFrom: ' + (formData.name || '') + ' <' + (formData.email || '') + '>')
    return `mailto:raviazen@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <>
      <Loader isLoading={pageLoading} />
      <main className={`contact-page ${!pageLoading ? 'main-show' : ''}`}>
        <section className="contact-container">
          <div className="contact-grid">
            <div className="contact-form">
              <h1>Let's Connect</h1>
              <p className="projects-intro">Ready for your next neon-powered project? Send me the details below.</p>

              <form onSubmit={handleSubmit} className="form-fields">
                <label className="field">
                  <span>Name</span>
                  <input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    />
                </label>

                <label className="field">
                  <span>Email</span>
                  <input
                    placeholder="Your Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </label>

                <label className="field">
                  <span>Message</span>
                  <textarea
                    placeholder="Tell me about your vision..."
                    rows="6"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </label>

                <div className="form-actions">
                  <button type="submit" className="cta-button" disabled={sending}>
                    {sending ? 'Sending...' : 'Send Message'}
                  </button>

                  <a className="mailto-fallback" href={mailtoHref()} onClick={() => setSent(false)}>
                    Or send via your email
                  </a>
                </div>

                {sent && <div className="form-success">Message sent — I'll get back to you soon.</div>}
                {error && <div className="form-error">{error}</div>}
              </form>
            </div>

            <aside className="contact-info">
              <h4>Contact</h4>
              <p className="muted">Prefer email? Use the form — or reach me directly:</p>
              <ul className="contact-list">
                <li><strong>Email:</strong> <a href="mailto:raviazen@gmail.com">raviazen@gmail.com</a></li>
                <li><strong>Instagram:</strong> <a href="https://www.instagram.com/reyp.u" target="_blank" rel="noreferrer">@reyp.u</a></li>
                <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/ray-raharja-santoso" target="_blank" rel="noreferrer">Ray Raharja Santoso</a></li>
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/6281381457516" target="_blank" rel="noreferrer">+62 813-8145-7516</a></li>
              </ul>

              <div className="small-note">Tip: If the form fails to send, use "Or send via your email" to open your mail client.</div>
            </aside>
          </div>
        </section>
      </main>
    </>
  )
}

export default Contact

