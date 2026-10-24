import { Navigate, useParams } from 'react-router-dom'
import QuizRunner from '../components/QuizRunner'
import { SUBJECTS, lessonsOf } from '../data/subjects'
import { useProgress } from '../progress/useProgress'
import { PASS_PERCENT, QUIZ_QUESTIONS } from '../quiz/quizUtils'

// Kviz na kraju lekcije: /ucionice/:slug/kviz/:n
export default function Quiz() {
  const { slug, n } = useParams()
  const { recordQuiz } = useProgress()
  const subject = SUBJECTS.find((s) => s.slug === slug)
  const index = Number(n)
  const lesson = subject ? lessonsOf(subject)[index] : undefined
  if (!lesson) return <Navigate to={subject ? `/ucionice/${slug}` : '/ucionice'} replace />

  const back = `/ucionice/${slug}`
  return (
    <QuizRunner
      key={`${slug}-${n}`}
      title={`Kviz: ${lesson.title}`}
      subtitle={subject.name}
      trail={[
        { label: 'Učionice po predmetima', to: '/ucionice' },
        { label: subject.name, to: back },
        { label: `Kviz: ${lesson.title}` },
      ]}
      pool={lesson.quiz ?? []}
      count={QUIZ_QUESTIONS}
      passPercent={PASS_PERCENT}
      passMessage="Položeno! Ova lekcija je dovršena. 🎉"
      back={back}
      onFinish={(percent) => recordQuiz(slug, index, percent)}
    />
  )
}
