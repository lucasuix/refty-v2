export class Versao {
  constructor(versao_header, versao_body, versao_footer, data) {
    this.header = document.getElementById(versao_header);
    this.body = document.getElementById(versao_body);
    this.footer = document.getElementById(versao_footer);
    this.data = data;

    this.render();
  }

  render() {
    this.renderHeader();
    //this.renderBody();
    this.renderFooter();
  }

  renderHeader() {
    this.header.innerHTML = `
      <h1 class="h3">${this.data.name}</h1>
      <p class="mb-0"><strong>Versão:</strong> ${this.data.version}</p>
      <p><strong>Data:</strong> ${new Date(this.data.date).toLocaleString("pt-BR")}</p>
      <p><strong>Novidades:</strong> ${this.data.news}</p>
    `;
  }

  renderBody() {
    this.body.innerHTML = `<h5 class="mt-4">Changelog</h5>`;
    this.data.changelog.forEach(entry => {
      const changelogDiv = document.createElement("div");
      changelogDiv.classList.add("mb-4");

      changelogDiv.innerHTML = `
        <h6>${entry.version} - ${new Date(entry.date).toLocaleDateString("pt-BR")}</h6>
        <p>${entry.description}</p>
        <ul class="list-group list-group-flush">
          ${entry.changes.map(change => `<li class="list-group-item">${change}</li>`).join("")}
        </ul>
      `;

      this.body.appendChild(changelogDiv);
    });
  }

  renderFooter() {
    this.footer.innerHTML = `
      <div class="text-muted small">
        Última atualização em: ${new Date(this.data.date).toLocaleString("pt-BR")}
      </div>
    `;
  }
}