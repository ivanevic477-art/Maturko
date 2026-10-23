// Prikazuje članak zadan blokovima (vidi data/essayMatura.js) – bez Word datoteke, izravno u aplikaciji.

// **podebljano** i *kurziv* u običan tekst
function Rich({ text }) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    if (part.startsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>
    return part
  })
}

function Block({ block }) {
  switch (block.type) {
    case 'p':
      return <p><Rich text={block.text} /></p>
    case 'note':
      return <div className="a-note">💡 <Rich text={block.text} /></div>
    case 'tip':
      return <div className="a-tip"><strong>📏 Važno:</strong> <Rich text={block.text} /></div>
    case 'h':
      return <h3 className="a-h">{block.text}</h3>
    case 'list': {
      const List = block.ordered ? 'ol' : 'ul'
      return <List className="a-list">{block.items.map((t) => <li key={t}>{t}</li>)}</List>
    }
    case 'outline':
      return (
        <div className="a-outline">
          {block.items.map((o) => (
            <div key={o.title} className="a-outline-item">
              <strong>{o.title}</strong>
              <ul>{o.parts.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          ))}
        </div>
      )
    case 'task':
      return (
        <div className="a-task">
          <div className="a-task-label">Zadatak</div>
          <strong>{block.title}</strong>
          <em>{block.instruction}</em>
        </div>
      )
    case 'step':
      return (
        <div className="a-step">
          <div className="a-step-label">{block.label}</div>
          {block.text && <p><Rich text={block.text} /></p>}
          {block.phrases && (
            <div className="a-phrases">
              <span>{block.phrasesTitle}:</span>
              {block.phrases.map((ph) => <code key={ph}>{ph}</code>)}
            </div>
          )}
          {block.example && <blockquote lang="en"><Rich text={block.example} /></blockquote>}
        </div>
      )
    case 'essay':
      return (
        <div className="a-essay" lang="en">
          {block.paragraphs.map((p) => <p key={p}>{p}</p>)}
        </div>
      )
    default:
      return null
  }
}

export default function Article({ article }) {
  return (
    <details className="lesson">
      <summary>
        <span className="num">📄</span>
        {article.title}
      </summary>
      <div className="article">
        {article.blocks.map((b, i) => <Block key={i} block={b} />)}
      </div>
    </details>
  )
}
