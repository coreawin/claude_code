const fs = require('fs');
const path = require('path');

const resultsPath = process.argv[2] || './web-verify-report/results.json';
const results = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));
const outputDir = path.dirname(resultsPath);
const reportPath = path.join(outputDir, 'report.html');

const { url, timestamp, summary, steps } = results;

const rows = steps.map(s => {
  const icon = s.status === 'pass' ? '✅' : '❌';
  const ssLink = s.screenshot
    ? `<a href="screenshots/${s.screenshot}" target="_blank"><img src="screenshots/${s.screenshot}" width="200"></a>`
    : '-';
  return `<tr class="${s.status}">
    <td>${icon} ${s.status.toUpperCase()}</td>
    <td>${s.name}</td>
    <td>${s.detail}</td>
    <td>${ssLink}</td>
    <td>${new Date(s.time).toLocaleTimeString()}</td>
  </tr>`;
}).join('\n');

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>Web Verify Report - ${url}</title>
<style>
  body { font-family: sans-serif; padding: 24px; background: #f5f5f5; }
  h1 { color: #333; }
  .summary { display: flex; gap: 16px; margin-bottom: 24px; }
  .card { background: white; border-radius: 8px; padding: 16px 24px; box-shadow: 0 1px 4px rgba(0,0,0,.1); }
  .card h2 { margin: 0 0 4px; font-size: 2rem; }
  .card p { margin: 0; color: #666; }
  .pass h2 { color: #22c55e; }
  .fail h2 { color: #ef4444; }
  table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,.1); }
  th { background: #1e293b; color: white; padding: 12px 16px; text-align: left; }
  td { padding: 10px 16px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
  tr.pass td:first-child { color: #22c55e; font-weight: bold; }
  tr.fail td:first-child { color: #ef4444; font-weight: bold; }
  tr:hover td { background: #f8fafc; }
  img { border-radius: 4px; border: 1px solid #e2e8f0; }
  .meta { color: #888; font-size: .85rem; margin-bottom: 16px; }
</style>
</head>
<body>
<h1>🌐 Web Verify Report</h1>
<p class="meta">Target: <b>${url}</b> &nbsp;|&nbsp; Generated: ${new Date(timestamp).toLocaleString()}</p>

<div class="summary">
  <div class="card"><p>Total</p><h2>${summary.total}</h2></div>
  <div class="card pass"><p>Pass</p><h2>${summary.pass}</h2></div>
  <div class="card fail"><p>Fail</p><h2>${summary.fail}</h2></div>
</div>

<table>
  <thead>
    <tr><th>Status</th><th>Step</th><th>Detail</th><th>Screenshot</th><th>Time</th></tr>
  </thead>
  <tbody>
    ${rows}
  </tbody>
</table>
</body>
</html>`;

fs.writeFileSync(reportPath, html);
console.log(`Report generated: ${reportPath}`);
