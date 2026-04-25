import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Lightbox from '../components/Lightbox'
import { publicUrl } from '../utils/publicUrl'

const Projects = () => {
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setPageLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  const feedFiles = [
    '1.png',
    'agustus_upscaled_compressed_023915.jpg',
    'erigo x jkt_040944.png',
    'night_053403.png',
    'peyek_022620.png',
    'asdw-01.png',
    'sjw-Recovered.png',
    'ss_102626.png'
  ]

  const [lightboxSrc, setLightboxSrc] = useState(null)
  const [missingMedia, setMissingMedia] = useState({})
  const [mediaErrors, setMediaErrors] = useState({})

  const openLightbox = (path) => setLightboxSrc(path)
  const closeLightbox = () => setLightboxSrc(null)

  const markMissing = (file) => {
    setMissingMedia((prev) => (prev[file] ? prev : { ...prev, [file]: true }))
  }

  const markError = (file) => {
    setMediaErrors((prev) => (prev[file] ? prev : { ...prev, [file]: true }))
  }

  const verticalRef = useRef(null)
  const horizontalRef = useRef(null)
  const [verticalPlaying, setVerticalPlaying] = useState(false)
  const [horizontalPlaying, setHorizontalPlaying] = useState(false)

  const instaReelFiles = [
    'instasave.website_AQMftacslt5l2Kxi6eBpP9JCKlt98gGtCCiMLddDiID-hNCUN4OnsFlRlkdD_J8b1GMZIia_rhH7gyL5bE4wP1J2QrP8PbhU8vgCjmo.mp4',
    'instasave.website_AQMHRTqOrE4EOme9SKeEBA97dMfNoCpnmbtdY1UCPVRzzr7eUd67GCmuBF0nKb7_RX2SJ6iAiZumxSUtYuRM1qpCxZgVkcFxwO9orNM.mp4'
  ]

  const visibleFeedFiles = feedFiles.filter((f) => !missingMedia[f])

  const videoErrorHint = (file) => (
    <div className="media-error">
      Video error.{' '}
      <a href={encodeURI(publicUrl(file))} target="_blank" rel="noreferrer">
        Open file
      </a>
    </div>
  )

  const toggleVertical = () => {
    const v = verticalRef.current
    if (!v) return
    if (v.paused) v.play()
    else v.pause()
  }

  const toggleHorizontal = () => {
    const v = horizontalRef.current
    if (!v) return
    if (v.paused) v.play()
    else v.pause()
  }

  return (
    <>
      <Loader isLoading={pageLoading} />
      <main className={`projects-section ${!pageLoading ? 'main-show' : ''}`}>
        <section className="projects-container">
          <h1>Projects</h1>
          <p className="projects-intro">Check out my latest work coming soon!</p>

          <div className="projects-media">
            <h2>Video Projects</h2>
            <div className="video-row">
              <figure className="project-item">
                <div className={`media media-vertical media-video ${verticalPlaying ? 'playing' : ''}`} role="img" aria-label="Vertical video placeholder">
                  <video
                    ref={verticalRef}
                    preload="metadata"
                    controls
                    playsInline
                    muted
                    loop
                    onPlay={() => setVerticalPlaying(true)}
                    onPause={() => setVerticalPlaying(false)}
                    onError={() => markError('jw sli_021931.mp4')}
                  >
                    <source src={encodeURI(publicUrl('jw sli_021931.mp4'))} type="video/mp4" />
                  </video>
                    <div className="media-overlay" onClick={toggleVertical} role="button" aria-label="Toggle vertical video">
                      <i className={verticalPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'} aria-hidden="true"></i>
                    </div>
                    <div
                      className="media-expand"
                      onClick={(e) => { e.stopPropagation(); openLightbox(encodeURI(publicUrl('jw sli_021931.mp4'))) }}
                      role="button"
                      aria-label="Open vertical video in lightbox"
                      tabIndex={0}
                    >
                      <i className="fa-solid fa-expand" aria-hidden="true"></i>
                    </div>
                    {mediaErrors['jw sli_021931.mp4'] && videoErrorHint('jw sli_021931.mp4')}
                </div>
                <figcaption className="media-caption">Vertical Video — 9:16 (jw sli_021931)</figcaption>
              </figure>

              <figure className="project-item">
                <div className={`media media-horizontal media-video ${horizontalPlaying ? 'playing' : ''}`} role="img" aria-label="Horizontal video placeholder">
                  <video
                    ref={horizontalRef}
                    preload="metadata"
                    controls
                    playsInline
                    muted
                    loop
                    onPlay={() => setHorizontalPlaying(true)}
                    onPause={() => setHorizontalPlaying(false)}
                    onError={() => markError('typhography dikit2_052853.mp4')}
                  >
                    <source src={encodeURI(publicUrl('typhography dikit2_052853.mp4'))} type="video/mp4" />
                  </video>
                    <div className="media-overlay" onClick={toggleHorizontal} role="button" aria-label="Toggle horizontal video">
                      <i className={horizontalPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'} aria-hidden="true"></i>
                    </div>
                    <div
                      className="media-expand"
                      onClick={(e) => { e.stopPropagation(); openLightbox(encodeURI(publicUrl('typhography dikit2_052853.mp4'))) }}
                      role="button"
                      aria-label="Open horizontal video in lightbox"
                      tabIndex={0}
                    >
                      <i className="fa-solid fa-expand" aria-hidden="true"></i>
                    </div>
                    {mediaErrors['typhography dikit2_052853.mp4'] && videoErrorHint('typhography dikit2_052853.mp4')}
                </div>
                <figcaption className="media-caption">Horizontal Video — 16:9 (typhography dikit2)</figcaption>
              </figure>
            </div>

            <h2>Instagram Reels</h2>
            <div className="reels-grid">
              {instaReelFiles.map((file, i) => (
                <figure className="project-item" key={file}>
                  <div className="media media-vertical media-video" role="img" aria-label={`Instagram reel ${i + 1}`}>
                    <video
                      preload="metadata"
                      controls
                      playsInline
                      muted
                      loop
                      onError={() => markError(file)}
                    >
                      <source src={encodeURI(publicUrl(file))} type="video/mp4" />
                    </video>
                    <div
                      className="media-expand"
                      onClick={(e) => { e.stopPropagation(); openLightbox(encodeURI(publicUrl(file))) }}
                      role="button"
                      aria-label={`Open Instagram reel ${i + 1} in lightbox`}
                      tabIndex={0}
                    >
                      <i className="fa-solid fa-expand" aria-hidden="true"></i>
                    </div>
                    {mediaErrors[file] && videoErrorHint(file)}
                  </div>
                  <figcaption className="media-caption">Reel {i + 1}</figcaption>
                </figure>
              ))}
            </div>

            <h2>Banners</h2>
            <div className="banner-row">
              <figure className="project-item">
                <div className="media media-banner" onClick={() => openLightbox(encodeURI(publicUrl('Lembar Kerja 1.png')))} role="button" tabIndex={0}>
                  <img src={encodeURI(publicUrl('Lembar Kerja 1.png'))} alt="Lembar Kerja 1" />
                </div>
                <figcaption className="media-caption">Lembar Kerja 1 — 2:1</figcaption>
              </figure>

              <figure className="project-item">
                <div className="media media-banner" onClick={() => openLightbox(encodeURI(publicUrl('Artboard 4.jpg')))} role="button" tabIndex={0}>
                  <img src={encodeURI(publicUrl('Artboard 4.jpg'))} alt="Artboard 4" />
                </div>
                <figcaption className="media-caption">Artboard 4 — 2:1</figcaption>
              </figure>
            </div>

            <h2>Instagram Feed</h2>
            <div className="insta-grid">
              {visibleFeedFiles.map((f, i) => (
                <figure className="project-item" key={f}>
                  <div className="media media-square" onClick={() => openLightbox(encodeURI(publicUrl(f)))} role="button" tabIndex={0}>
                    <img src={encodeURI(publicUrl(f))} alt={`Feed ${i + 1}`} onError={() => markMissing(f)} />
                  </div>
                  <figcaption className="media-caption">Feed {i + 1}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <Link to="/" className="cta-button">Back to Home</Link>
            {lightboxSrc && <Lightbox src={lightboxSrc} alt="Full size" onClose={closeLightbox} />}
        </section>
      </main>
    </>
  )
}

export default Projects
