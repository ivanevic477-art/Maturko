const user = Auth.current();
if (!user) location.href = "index.html";

const main = document.getElementById("main");
const tabs = document.getElementById("tabs");
const crumb = document.getElementById("crumb");
document.getElementById("userName").textContent = user.name;
document.getElementById("avatar").textContent = user.name[0].toUpperCase();

const ICONS = { lesson: "📖", assignment: "📝", test: "✅", video: "▶", file: "📎" };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function go(view, courseId, tab = "stream") {
  tabs.classList.add("hidden");
  crumb.textContent = "";
  if (!user.paid) return checkout();
  if (view === "home") return home();
  course(Store.courses().find(c => c.id === courseId), tab);
}

function checkout() {
  main.innerHTML = `
    <div class="checkout">
      <h2>Otključaj potpuni pristup</h2>
      <p>Dobro došao/dobro došla, ${esc(user.name)}! Uplati članarinu kako bi pristupio/pristupila učionicama.</p>
      <div style="font-size:30px;font-weight:600;margin:16px 0">${priceLabel()}</div>
      <div class="notice">Demo način: stvarna uplata se ne provodi. Ovdje će se povezati usluga plaćanja (npr. Stripe).</div>
      <button class="btn" style="width:100%" onclick="pay()">Plati i nastavi</button>
    </div>`;
}
function pay() { Auth.markPaid(); user.paid = true; go("home"); }

function home() {
  main.innerHTML = `<h2>Tvoje učionice</h2><div class="cards">${Store.courses().map(c => `
    <div class="course-card" onclick="go('course','${c.id}')">
      <div class="head" style="background:${c.color}"><h3>${esc(c.title)}</h3><small>${esc(c.section)}</small></div>
      <div class="body">${esc(c.description)}</div>
    </div>`).join("")}</div>`;
}

function course(c, tab) {
  crumb.textContent = "› " + c.title;
  tabs.classList.remove("hidden");
  tabs.innerHTML = [["stream", "Obavijesti"], ["classwork", "Gradivo"]].map(([id, label]) =>
    `<div class="tab ${tab === id ? "active" : ""}" onclick="go('course','${c.id}','${id}')">${label}</div>`).join("");

  const banner = `<div class="banner" style="background:${c.color}"><h1>${esc(c.title)}</h1><div>${esc(c.section)}</div></div>`;
  if (tab === "stream") {
    const posts = c.announcements.map(a => `
      <div class="post"><div class="meta">${esc(a.date)}</div>${esc(a.text)}</div>`).join("");
    main.innerHTML = banner + (posts || `<div class="empty">Još nema obavijesti.</div>`);
  } else {
    const body = c.topics.map(t => `
      <div class="topic">${esc(t.name)}</div>
      ${t.items.map(i => `
        <div class="item">
          <div class="dot" style="background:${c.color}">${ICONS[i.type] || "📎"}</div>
          <div class="info"><a href="${esc(i.link)}" target="_blank" rel="noopener">${esc(i.title)}</a></div>
          <div class="meta">${esc(i.date || "")}</div>
        </div>`).join("")}`).join("");
    main.innerHTML = banner + (body || `<div class="empty">Još nema gradiva.</div>`);
  }
}

go("home");
