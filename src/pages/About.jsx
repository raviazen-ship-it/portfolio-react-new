import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { publicUrl } from '../utils/publicUrl'

const About = () => {
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setPageLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Loader isLoading={pageLoading} />
      <main className={`about-section ${!pageLoading ? 'main-show' : ''}`}>
      <section className="about-container">
          <div className="about-left">
            <div className="about-photo">
              <img src={publicUrl('ray.jpg')} alt="Ray Raharja Santoso" className="profile-image" />
            </div>
          </div>

        <div className="about-right">
          <h1>Ray Raharja Santoso</h1>
          <h3>Graphic Designer</h3>

          <p className="about-tagline">Neon-lean visuals, sharp typography, and product storytelling that converts.</p>

          <div className="about-meta" aria-label="Design specialties">
            <span className="about-chip">E-commerce Banners</span>
            <span className="about-chip">Product Visuals</span>
            <span className="about-chip">Campaign Creative</span>
            <span className="about-chip">Short-form Video</span>
          </div>

          <p>
            I design e-commerce visuals including banners, product pictures, and campaign imagery to help
            brands stand out online. I also produce short promotional videos and motion graphics to bring
            products to life across social platforms.
          </p>

          <h4>Skills</h4>
          <ul className="skills">
            <li>Canva</li>
            <li>After Effects</li>
            <li>Photoshop</li>
            <li>Affinity</li>
          </ul>

          <div className="contact-section">
            <h4>Contact</h4>
            <div className="contact-links">
                <a href="https://www.instagram.com/reyp.u" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="contact-link instagram" title="Instagram">
                  <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                </a>

                <a href="https://www.linkedin.com/in/ray-raharja-santoso" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="contact-link linkedin" title="LinkedIn">
                  <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                </a>

                <a href="https://wa.me/6281381457516" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="contact-link whatsapp" title="WhatsApp">
                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                </a>
            </div>
          </div>

          <Link to="/" className="cta-button about-cta">Back to Home</Link>
        </div>
      </section>
    </main>
    </>
  )
}

export default About
