export function renderToolCard(tool) {
  return `
    <a class="tool-card" href="./#/${tool.id}" data-tool-card data-title="${tool.title.toLowerCase()} ${tool.tags.join(' ')}">
      <span>
        <span class="tool-card-top">
          <span class="tool-code" aria-hidden="true">${tool.code}</span>
          <span class="badge">${tool.category}</span>
        </span>
        <h3>${tool.title}</h3>
        <p>${tool.description}</p>
      </span>
      <span class="tool-tag-row">
        ${tool.tags.slice(0, 3).map((tag) => `<span class="tag">${tag}</span>`).join('')}
      </span>
    </a>
  `;
}
