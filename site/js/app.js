const state = {
  rows: [],
  selectedSegment: "All"
};

const money = value => `$${Number(value).toLocaleString("en-US")}M`;
const pct = value => `${Number(value).toFixed(1)}%`;

async function loadCsv() {
  const response = await fetch("./data/global_tech_financials_2024.csv");
  const text = await response.text();
  const [headerLine, ...lines] = text.trim().split("\n");
  const headers = headerLine.split(",");
  return lines.map(line => {
    const values = line.split(",");
    return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  }).map(row => ({
    ...row,
    fiscal_year: Number(row.fiscal_year),
    revenue_usd_m: Number(row.revenue_usd_m),
    net_income_usd_m: Number(row.net_income_usd_m),
    rd_or_tech_usd_m: Number(row.rd_or_tech_usd_m),
    employees: Number(row.employees),
    margin: row.net_income_usd_m / row.revenue_usd_m,
    tech_intensity: row.rd_or_tech_usd_m / row.revenue_usd_m,
    revenue_per_employee: row.revenue_usd_m / row.employees
  }));
}

function filteredRows() {
  if (state.selectedSegment === "All") return state.rows;
  return state.rows.filter(row => row.segment === state.selectedSegment);
}

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function renderMetrics() {
  const rows = filteredRows();
  const revenue = rows.reduce((sum, row) => sum + row.revenue_usd_m, 0);
  const netIncome = rows.reduce((sum, row) => sum + row.net_income_usd_m, 0);
  const techSpend = rows.reduce((sum, row) => sum + row.rd_or_tech_usd_m, 0);
  const avgMargin = netIncome / revenue;

  setText("metric-revenue", money(revenue));
  setText("metric-income", money(netIncome));
  setText("metric-tech", money(techSpend));
  setText("metric-margin", pct(avgMargin * 100));
}

function renderBars(id, rows, metric, formatter) {
  const host = document.getElementById(id);
  const sorted = [...rows].sort((a, b) => b[metric] - a[metric]);
  const max = Math.max(...sorted.map(row => row[metric]));
  host.innerHTML = sorted.map(row => `
    <div class="bar-row">
      <strong>${row.ticker}</strong>
      <div class="bar-track"><div class="bar-fill" style="width:${(row[metric] / max) * 100}%"></div></div>
      <span>${formatter(row[metric])}</span>
    </div>
  `).join("");
}

function renderTable() {
  const rows = filteredRows();
  const host = document.getElementById("company-table");
  host.innerHTML = rows
    .sort((a, b) => b.revenue_usd_m - a.revenue_usd_m)
    .map(row => `
      <tr>
        <td><strong>${row.company}</strong></td>
        <td>${row.ticker}</td>
        <td>${row.segment}</td>
        <td>${money(row.revenue_usd_m)}</td>
        <td>${money(row.net_income_usd_m)}</td>
        <td>${pct(row.margin * 100)}</td>
        <td>${pct(row.tech_intensity * 100)}</td>
      </tr>
    `).join("");
}

function renderInsights() {
  const rows = filteredRows();
  const revenueLeader = [...rows].sort((a, b) => b.revenue_usd_m - a.revenue_usd_m)[0];
  const marginLeader = [...rows].sort((a, b) => b.margin - a.margin)[0];
  const techLeader = [...rows].sort((a, b) => b.tech_intensity - a.tech_intensity)[0];

  document.getElementById("insights").innerHTML = `
    <li>${revenueLeader.company} has the highest revenue in this view.</li>
    <li>${marginLeader.company} has the strongest net margin.</li>
    <li>${techLeader.company} invests the most in technology compared with revenue.</li>
    <li>The dashboard shows size, profit, and investment separately, so leaders can make better decisions.</li>
  `;
}

function normalize(value, max) {
  if (!max) return 0;
  return value / max;
}

function decisionScores(rows) {
  const maxRevenue = Math.max(...rows.map(row => row.revenue_usd_m));
  const maxMargin = Math.max(...rows.map(row => row.margin));
  const maxTech = Math.max(...rows.map(row => row.tech_intensity));
  const maxProductivity = Math.max(...rows.map(row => row.revenue_per_employee));

  return rows.map(row => {
    const scale = normalize(row.revenue_usd_m, maxRevenue);
    const margin = normalize(row.margin, maxMargin);
    const tech = normalize(row.tech_intensity, maxTech);
    const productivity = normalize(row.revenue_per_employee, maxProductivity);
    const score = (scale * 0.3) + (margin * 0.3) + (tech * 0.2) + (productivity * 0.2);

    return {
      ...row,
      decision_score: score * 100,
      score_parts: { scale, margin, tech, productivity }
    };
  }).sort((a, b) => b.decision_score - a.decision_score);
}

function renderDecisionEngine() {
  const rows = decisionScores(filteredRows());
  const host = document.getElementById("decision-ranking");

  host.innerHTML = rows.map((row, index) => `
    <article class="score-card">
      <div class="score-topline">
        <div>
          <strong>${index + 1}. ${row.company}</strong>
          <span>${row.segment}</span>
        </div>
        <b>${pct(row.decision_score)}</b>
      </div>
      <div class="score-bars">
        <div><span>Scale</span><i style="width:${row.score_parts.scale * 100}%"></i></div>
        <div><span>Margin</span><i style="width:${row.score_parts.margin * 100}%"></i></div>
        <div><span>Tech</span><i style="width:${row.score_parts.tech * 100}%"></i></div>
        <div><span>Productivity</span><i style="width:${row.score_parts.productivity * 100}%"></i></div>
      </div>
    </article>
  `).join("");
}

function renderFilters() {
  const segments = ["All", ...new Set(state.rows.map(row => row.segment))];
  const host = document.getElementById("filters");
  host.innerHTML = segments.map(segment => `
    <button class="chip ${segment === state.selectedSegment ? "active" : ""}" data-segment="${segment}">
      ${segment}
    </button>
  `).join("");
  host.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      state.selectedSegment = button.dataset.segment;
      render();
    });
  });
}

function render() {
  const rows = filteredRows();
  renderFilters();
  renderMetrics();
  renderBars("revenue-bars", rows, "revenue_usd_m", money);
  renderBars("margin-bars", rows, "margin", value => pct(value * 100));
  renderBars("tech-bars", rows, "tech_intensity", value => pct(value * 100));
  renderTable();
  renderInsights();
  renderDecisionEngine();
}

loadCsv().then(rows => {
  state.rows = rows;
  render();
});
