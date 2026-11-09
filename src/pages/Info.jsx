import { Navigate, useParams } from 'react-router-dom'
import { INFO_PAGES } from '../data/infoPages'
import { LEGAL_PAGES } from '../data/footer'

// Stranica iz izbornika (FAQ, Profesori, Više o nama) ili pravna stranica iz podnožja – za sada prazna.
export default function Info() {
  const { page } = useParams()
  const info = [...INFO_PAGES, ...LEGAL_PAGES].find((p) => p.path === page)
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
