import { useEffect } from 'react'
import { createPortal } from 'react-dom'

const isVideoFile = (src) => {
  if (!src) return false
  const s = src.split('?')[0].toLowerCase()
  return s.endsWith('.mp4') || s.endsWith('.webm') || s.endsWith('.ogg') || s.endsWith('.mov') || s.endsWith('.mkv')
}

const isYouTubeUrl = (src) => {
  return /youtube\.com|youtu\.be/.test(src)
}

const getYouTubeEmbed = (src) => {
  try {
    const url = new URL(src, window.location.href)
    let id = ''
    if (url.hostname.includes('youtu.be')) {
      id = url.pathname.slice(1)
    } else {
      id = url.searchParams.get('v') || ''
    }
    if (!id) return src
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
  } catch {
    return src
  }
}

const Lightbox = ({ src, alt = '', onClose }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!src) return null

  const renderMedia = () => {
    if (isYouTubeUrl(src)) {
      const embed = getYouTubeEmbed(src)
      return (
        <div className="lightbox-video-wrapper">
          <iframe src={embed} title={alt} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
        </div>
      )
    }

    if (isVideoFile(src)) {
      return (
        <video src={src} controls autoPlay playsInline className="lightbox-video" />
      )
    }

    return <img src={src} alt={alt} />
  }

  return createPortal(
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close">×</button>
        {renderMedia()}
      </div>
    </div>,
    document.body
  )
}

export default Lightbox
