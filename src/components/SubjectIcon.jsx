// Prikazuje sliku zastave ako je predmet ima (emoji zastave se na Windowsima prikazuju kao slova), inače emoji.
export default function SubjectIcon({ subject }) {
  return subject.flag
    ? <img className="flag" src={subject.flag} alt="" />
    : <>{subject.icon}</>
}
