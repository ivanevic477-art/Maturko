import { Navigate, useParams } from 'react-router-dom'
import QuizRunner from '../components/QuizRunner'
import { SUBJECTS, lessonsOf } from '../data/subjects'
import { useProgress } from '../progress/useProgress'
import { FINAL_PASS_PERCENT, FINAL_QUESTIONS } from '../quiz/quizUtils'

// Završni ispit predmeta: /ucionice/:slug/zavrsni (dostupan tek kad su sve lekcije položene)
export default function FinalExam() {
  const { slug } = useParams()
  const { subjectProgress, recordFinal } = useProgress()
  const subject = SUBJECTS.find((s) => s.slug === slug)
  if (!subject) return <Navigate to="/ucionice" replace />

  const back = `/ucionice/${slug}`
  const { final } = subjectProgress(subject)
  if (!final?.unlocked) return <Navigate to={back} replace />

  return (
    <QuizRunner
      key={slug}
      title={`Završni ispit: ${subject.name}`}
      subtitle="Pitanja iz svih lekcija predmeta"
      trail={[
        { label: 'Učionice po predmetima', to: '/ucionice' },
        { label: subject.name, to: back },
        { label: 'Završni ispit' },
      ]}
      pool={lessonsOf(subject).flatMap((l) => l.quiz ?? [])}
      count={FINAL_QUESTIONS}
      passPercent={FINAL_PASS_PERCENT}
      passMessage="Položeno! Tečaj je završen. 🎓"
      back={back}
      onFinish={(percent) => recordFinal(slug, percent)}
    />
  )
}
