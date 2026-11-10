/** Thin Chart.js wrapper (Chart.js is loaded from the CDN on pages that draw charts). */
const Charts = {
  _inst: {},
  _draw(id, config) {
    if (this._inst[id]) this._inst[id].destroy();
    this._inst[id] = new Chart(document.getElementById(id).getContext('2d'), config);
  },
  bar(id, labels, data, colors, horizontal = false) {
    this._draw(id, {
      type: 'bar',
      data: { labels, datasets: [{ data, backgroundColor: colors, borderRadius: 6 }] },
      options: {
        indexAxis: horizontal ? 'y' : 'x', responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { [horizontal ? 'x' : 'y']: { beginAtZero: true, ticks: { precision: 0 } } },
      },
    });
  },
  doughnut(id, labels, data, colors) {
    this._draw(id, {
      type: 'doughnut',
      data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 2 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } },
    });
  },
  PALETTE: ['#1E3A8A', '#2563EB', '#0284C7', '#38BDF8', '#60A5FA'],
  PALETTE_ALT: ['#0284C7', '#2563EB', '#1E3A8A', '#38BDF8', '#60A5FA'],
};
