// Renders the page entirely from data/data.json.
// To update content, edit that file (or drop new assets in assets/) — no code changes needed.
fetch("data/data.json")
  .then((r) => r.json())
  .then(render)
  .catch((e) => console.error("Failed to load data.json", e));

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function render(data) {
  document.title = data.name;
  document.getElementById("footer-name").textContent = data.name;

  const header = document.getElementById("header");
  if (data.photo) header.appendChild(el("img", null)).src = data.photo;
  header.appendChild(el("div")).append(
    el("h1", null, data.name),
    el("p", null, data.tagline)
  );

  document.getElementById("about").textContent = data.about || "";

  const cvBtn = document.getElementById("cv-btn");
  if (data.cv) {
    cvBtn.href = data.cv;
    cvBtn.hidden = false;
  }

  renderList("publications", data.publications, (p) =>
    el(
      "li",
      null,
      `<span class="item-title"><a href="${p.url}" target="_blank" rel="noopener">${p.title}</a></span><br>
       <span class="item-meta">${p.venue || ""}</span>`
    )
  );

  // renderList("projects", data.projects, (p) =>
  //   el(
  //     "li",
  //     null,
  //     `<span class="item-title">${p.url ? `<a href="${p.url}" target="_blank" rel="noopener">${p.title}</a>` : p.title}</span><br>
  //      <span class="item-meta">${p.description || ""}</span>
  //      ${p.tags ? `<div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>` : ""}`
  //   )
  // );

  const links = document.getElementById("links");
  (data.links || []).forEach((l) => {
    const a = el("a", null, l.label);
    a.href = l.url;
    a.target = "_blank";
    a.rel = "noopener";
    links.appendChild(a);
  });
}

function renderList(id, items, build) {
  const list = document.getElementById(id);
  if (!items || items.length === 0) {
    list.appendChild(el("li", "empty", "More coming soon."));
    return;
  }
  items.forEach((item) => list.appendChild(build(item)));
}
