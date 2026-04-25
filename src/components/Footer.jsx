import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="logo">RAY RAHARJA SANTOSO</div>
          <p className="footer-desc">Design that speaks for itself — banners, product visuals, campaigns, and short-form video.</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="footer-contact">
          <div className="footer-social">
            <a href="https://www.instagram.com/reyp.u" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram" aria-hidden="true"></i></a>
            <a href="https://www.linkedin.com/in/ray-raharja-santoso" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" aria-hidden="true"></i></a>
            <a href="https://wa.me/6281381457516" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp" aria-hidden="true"></i></a>
          </div>
          <div className="footer-email"><a href="mailto:raviazen@gmail.com">raviazen@gmail.com</a></div>
        </div>
      </div>

      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} Ray Raharja Santoso — Designed & Created by Ray</small>
      </div>
    </footer>
  )
}

export default Footer
