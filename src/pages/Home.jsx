import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'

const Home = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return (
    <>
      <Loader isLoading={loading} />
      <main className={!loading ? 'main-show' : ''}>
        <section className="hero">
          <h1>Ray Raharja Santoso</h1>
          <p className="hero-subtitle">Design that speaks for itself — bold visuals, clean UX, neon energy.</p>
          <Link to="/projects" className="cta-button">Explore Projects</Link>
        </section>
      </main>
    </>
  )
}

export default Home

