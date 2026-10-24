import { Navigate, useParams } from 'react-router-dom'
import { INFO_PAGES } from '../data/infoPages'

// Stranica iz izbornika (FAQ, Pretplata, Profesori, Više o nama) – za sada prazna.
export default function Info() {
  const { page } = useParams()
  const info = INFO_PAGES.find((p) => p.path === page)
  if (!info) return <Navigate to="/" replace />
  return (
    <>
      <div className="page-banner">
        <h1>{info.title}</h1>
        <p>{info.subtitle}</p>
      </div>
      <section className="content">
        <div className="empty">Sadržaj uskoro stiže.</div>
      </section>
    </>
  )
}
