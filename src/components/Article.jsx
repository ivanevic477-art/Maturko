// Prikazuje članak zadan blokovima (vidi data/essayMatura.js) – bez Word datoteke, izravno u aplikaciji.

// **podebljano** i *kurziv* u običan tekst
function Rich({ text }) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    if (part.startsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>
    return part
  })
}

// Stavka popisa koja se otvara klikom i prikazuje objašnjenje s primjerima (npr. Passive).
function Detail({ item }) {
  return (
    <details className="a-detail">
      <summary>{item.title}</summary>
      {item.details.map((d) => (
        <div key={d.heading} className="a-detail-body">
          <strong>{d.heading}</strong>
          <ul>
            {d.examples.map((e) => (
              <li key={e.label}>
                <span className="a-ex-label">{e.label}:</span> <span lang="en">{e.text}</span>
                {e.translation && <span className="muted"> ({e.translation})</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </details>
  )
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
      return (
        <List className="a-list">
          {block.items.map((item) => (typeof item === 'string'
            ? <li key={item}>{item}</li>
            : <li key={item.title}><Detail item={item} /></li>))}
        </List>
      )
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
