const API_BASE_URL = window.DOCKER_API_BASE_URL.replace(/\/+$/, "");
const PAGE_DETAILS = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Monitor your Docker resources at a glance.",
    icon: "grid",
  },
  containers: {
    title: "Containers",
    subtitle: "Inspect and manage your Docker containers.",
    icon: "box",
  },
  images: {
    title: "Images",
    subtitle: "Browse images available in your Docker Engine.",
    icon: "layers",
  },
  volumes: {
    title: "Volumes",
    subtitle: "Review your persistent Docker storage.",
    icon: "database",
  },
  networks: {
    title: "Networks",
    subtitle: "Inspect networks configured in your Docker Engine.",
    icon: "network",
  },
};
const NAVIGATION = [
  { page: "dashboard", label: "Dashboard", href: "index.html", icon: "grid" },
  { page: "containers", label: "Containers", href: "containers.html", icon: "box" },
  { page: "images", label: "Images", href: "images.html", icon: "layers" },
  { page: "volumes", label: "Volumes", href: "volumes.html", icon: "database" },
  { page: "networks", label: "Networks", href: "networks.html", icon: "network" },
];

function icon(name, classes = "h-5 w-5") {
  const paths = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    box: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4.5 7.8 7.5 4.3 7.5-4.3M12 21v-8.8"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    network: '<circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="m10.5 7.6-4 8M13.5 7.6l4 8M8 19h8"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.6 9a7 7 0 0 1 11.6-2L20 12M4 12l2.8 5a7 7 0 0 0 11.6-2"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    close: '<path d="m18 6-12 12M6 6l12 12"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    alert: '<path d="M12 9v4m0 4h.01"/><path d="M10.3 3.9 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3l-7.5-13.1a2 2 0 0 0-3.4 0Z"/>',
    play: '<path d="m8 5 11 7-11 7V5Z"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  };
  return `<svg class="${classes}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
}

function renderLayout(page) {
  const details = PAGE_DETAILS[page] || PAGE_DETAILS.dashboard;
  const nav = NAVIGATION.map(({ page: itemPage, label, href, icon: iconName }) => `
    <a href="${href}" class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
      itemPage === page
        ? "bg-blue-50 text-blue-700"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    }">
      ${icon(iconName, `h-5 w-5 ${itemPage === page ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`)}
      <span>${label}</span>
      ${itemPage === page ? '<span class="ml-auto h-1.5 w-1.5 rounded-full bg-blue-600"></span>' : ""}
    </a>
  `).join("");

  document.title = `${details.title} · Docker Dashboard`;
  document.getElementById("app").innerHTML = `
    <div class="min-h-screen lg:flex">
      <div id="sidebar-backdrop" class="fixed inset-0 z-30 hidden bg-slate-950/40 lg:hidden"></div>
      <aside id="sidebar" class="fixed inset-y-0 left-0 z-40 flex w-64 -translate-x-full flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0">
        <div class="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">${icon("box", "h-6 w-6")}</div>
          <div><p class="font-semibold tracking-tight text-slate-900">Dockview</p><p class="text-xs text-slate-400">Docker management</p></div>
          <button id="close-menu" class="ml-auto rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden" aria-label="Close navigation">${icon("close")}</button>
        </div>
        <div class="px-4 pt-7">
          <p class="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Workspace</p>
          <nav class="space-y-1" aria-label="Main navigation">${nav}</nav>
        </div>
        <div class="mt-auto border-t border-slate-100 p-5">
          <div class="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <span class="relative flex h-2.5 w-2.5"><span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50"></span><span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span></span>
            <div><p class="text-xs font-semibold text-slate-700">Docker Engine</p><p class="text-[11px] text-slate-400">Local connection</p></div>
          </div>
        </div>
      </aside>
      <div class="min-w-0 flex-1">
        <header class="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur sm:px-8">
          <div class="flex items-center gap-3">
            <button id="open-menu" class="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden" aria-label="Open navigation">${icon("menu")}</button>
            <div><p class="text-xs font-medium text-slate-400">Docker / <span class="text-slate-600">${details.title}</span></p><h1 class="mt-0.5 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">${details.title}</h1></div>
          </div>
          <div class="flex items-center gap-3">
            <span class="hidden items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 sm:flex"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Local Engine</span>
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">D</div>
          </div>
        </header>
        <main class="mx-auto max-w-[1440px] px-4 py-7 sm:px-8 sm:py-9">
          <div class="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div><p class="text-sm text-slate-500">${details.subtitle}</p></div>
            <button id="refresh-page" class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">${icon("refresh", "h-4 w-4")} Refresh</button>
          </div>
          <div id="feedback" class="mb-5 hidden" role="status" aria-live="polite"></div>
          <section id="page-content" aria-live="polite"></section>
        </main>
        <footer class="px-4 pb-7 text-center text-xs text-slate-400 sm:px-8">Dockview · Connected to your local Docker Engine</footer>
      </div>
    </div>
  `;

  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");
  const toggleMenu = (open) => {
    sidebar.classList.toggle("-translate-x-full", !open);
    backdrop.classList.toggle("hidden", !open);
  };
  document.getElementById("open-menu").addEventListener("click", () => toggleMenu(true));
  document.getElementById("close-menu").addEventListener("click", () => toggleMenu(false));
  backdrop.addEventListener("click", () => toggleMenu(false));
}

async function apiRequest(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: { Accept: "application/json", ...options.headers },
    });
  } catch (error) {
    throw new Error(`Cannot reach the Docker API at ${API_BASE_URL}. Check that the backend is running.`);
  }

  let payload;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }
  if (!response.ok) {
    const detail = payload?.detail || payload?.message || `Request failed (${response.status})`;
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }
  return payload;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? escapeHtml(value)
    : date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

function formatBytes(value) {
  const bytes = Number(value);
  if (!Number.isFinite(bytes) || bytes < 0) return "—";
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index > 0 ? 1 : 0)} ${units[index]}`;
}

function statusBadge(status) {
  const normalized = String(status || "unknown").toLowerCase();
  const classes = normalized === "running"
    ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
    : ["exited", "created", "dead"].includes(normalized)
      ? "bg-slate-100 text-slate-600 ring-slate-500/15"
      : "bg-amber-50 text-amber-700 ring-amber-600/20";
  const dot = normalized === "running" ? "bg-emerald-500" : "bg-current";
  return `<span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${classes}"><span class="h-1.5 w-1.5 rounded-full ${dot}"></span>${escapeHtml(normalized)}</span>`;
}

function loadingState(message = "Loading Docker resources…") {
  return `<div class="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm text-slate-500"><span class="mb-3 h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600"></span>${message}</div>`;
}

function errorState(message) {
  return `<div class="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center"><div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">${icon("alert")}</div><p class="font-medium text-rose-800">Couldn’t load Docker data</p><p class="mt-1 text-sm text-rose-700">${escapeHtml(message)}</p><button data-retry class="mt-4 rounded-lg bg-white px-3.5 py-2 text-sm font-medium text-rose-700 shadow-sm ring-1 ring-rose-200 hover:bg-rose-50">Try again</button></div>`;
}

function emptyState(title, description) {
  return `<div class="px-6 py-14 text-center"><div class="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-400">${icon("box")}</div><p class="font-medium text-slate-700">${title}</p><p class="mt-1 text-sm text-slate-500">${description}</p></div>`;
}

function showFeedback(message, type = "success") {
  const feedback = document.getElementById("feedback");
  const palette = type === "error"
    ? "border-rose-200 bg-rose-50 text-rose-800"
    : "border-emerald-200 bg-emerald-50 text-emerald-800";
  const symbol = type === "error" ? "alert" : "check";
  feedback.className = `mb-5 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${palette}`;
  feedback.innerHTML = `${icon(symbol, "h-4 w-4 shrink-0")}<span>${escapeHtml(message)}</span>`;
}

function metricCard({ label, value, icon: iconName, tint, href, note }) {
  return `<a href="${href}" class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:p-6">
    <div class="flex items-start justify-between"><div><p class="text-sm font-medium text-slate-500">${label}</p><p class="mt-3 text-3xl font-semibold tracking-tight text-slate-900">${value}</p><p class="mt-1 text-xs text-slate-400">${note}</p></div><span class="flex h-11 w-11 items-center justify-center rounded-xl ${tint}">${icon(iconName)}</span></div>
  </a>`;
}

function renderDashboard(data) {
  const count = (value) => Number(value || 0).toLocaleString();
  return `
    <div class="mb-6 flex flex-wrap items-center justify-between gap-3"><div><h2 class="text-base font-semibold text-slate-900">Resource overview</h2><p class="mt-1 text-sm text-slate-500">A live snapshot of your local Docker environment.</p></div><span class="inline-flex items-center gap-2 text-xs text-slate-400">${icon("clock", "h-4 w-4")} Updated just now</span></div>
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      ${metricCard({ label: "Total containers", value: count(data.containers.total_containers), icon: "box", tint: "bg-blue-50 text-blue-600", href: "containers.html", note: "Across all states" })}
      ${metricCard({ label: "Running", value: count(data.containers.running_containers), icon: "play", tint: "bg-emerald-50 text-emerald-600", href: "containers.html?status=running", note: "Currently active" })}
      ${metricCard({ label: "Stopped", value: count(data.containers.stopped_containers), icon: "stop", tint: "bg-slate-100 text-slate-600", href: "containers.html?status=stopped", note: "Not currently running" })}
      ${metricCard({ label: "Images", value: count(data.images.total_images), icon: "layers", tint: "bg-violet-50 text-violet-600", href: "images.html", note: "Available locally" })}
      ${metricCard({ label: "Volumes", value: count(data.volumes.total_volumes), icon: "database", tint: "bg-amber-50 text-amber-600", href: "volumes.html", note: "Persistent storage" })}
      ${metricCard({ label: "Networks", value: count(data.networks.total_networks), icon: "network", tint: "bg-cyan-50 text-cyan-600", href: "networks.html", note: "Configured locally" })}
    </div>
    <div class="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div class="flex items-center justify-between gap-4"><div><h2 class="font-semibold text-slate-900">Containers at a glance</h2><p class="mt-1 text-sm text-slate-500">Quick view of your most recently listed containers.</p></div><a href="containers.html" class="shrink-0 text-sm font-medium text-blue-600 hover:text-blue-700">View all <span aria-hidden="true">→</span></a></div>
      ${data.containers.containers.length ? `<div class="mt-5 divide-y divide-slate-100">${data.containers.containers.slice(0, 5).map((container) => `<div class="flex flex-wrap items-center justify-between gap-3 py-3"><div class="min-w-0"><p class="truncate text-sm font-medium text-slate-800">${escapeHtml(container.name)}</p><p class="mt-1 truncate font-mono text-xs text-slate-400">${escapeHtml(container.id)}</p></div>${statusBadge(container.status)}</div>`).join("")}</div>` : emptyState("No containers found", "Containers will appear here when available.")}</div>`;
}

function searchToolbar(placeholder, filter = "") {
  return `<div class="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"><label class="relative block w-full sm:max-w-sm"><span class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">${icon("search", "h-4 w-4")}</span><input id="resource-search" type="search" placeholder="${placeholder}" class="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50" /></label>${filter}</div>`;
}

function renderContainers(containers, query = "", selectedStatus = "all") {
  const filtered = containers.filter((container) => {
    const matchesQuery = [container.name, container.id, container.image?.join(" "), container.status, container.ports?.join(" ")]
      .join(" ").toLowerCase().includes(query.toLowerCase());
    const matchesStatus = selectedStatus === "all"
      || (selectedStatus === "running" ? container.status === "running" : container.status !== "running");
    return matchesQuery && matchesStatus;
  });
  const rows = filtered.map((container) => {
    const status = String(container.status || "").toLowerCase();
    const action = status === "running"
      ? `<button data-action="stop" data-id="${escapeHtml(container.id)}" data-name="${escapeHtml(container.name)}" class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700">${icon("stop", "h-3.5 w-3.5")} Stop</button>`
      : ["exited", "created"].includes(status)
        ? `<button data-action="start" data-id="${escapeHtml(container.id)}" data-name="${escapeHtml(container.name)}" class="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700">${icon("play", "h-3.5 w-3.5")} Start</button>`
        : '<span class="text-xs text-slate-400">Unavailable</span>';
    const ports = container.ports?.length ? container.ports.join(", ") : "—";
    const image = container.image?.length ? container.image.join(", ") : "—";
    return `<tr class="hover:bg-slate-50/70"><td class="px-5 py-4"><p class="font-medium text-slate-800">${escapeHtml(container.name)}</p><p class="mt-1 font-mono text-xs text-slate-400">${escapeHtml(container.id)}</p></td><td class="max-w-52 px-5 py-4"><span class="block truncate text-sm text-slate-600" title="${escapeHtml(image)}">${escapeHtml(image)}</span></td><td class="px-5 py-4">${statusBadge(status)}</td><td class="max-w-52 px-5 py-4"><span class="block truncate text-xs text-slate-500" title="${escapeHtml(ports)}">${escapeHtml(ports)}</span></td><td class="whitespace-nowrap px-5 py-4 text-sm text-slate-500">${formatDate(container.created)}</td><td class="px-5 py-4 text-right">${action}</td></tr>`;
  }).join("");
  const filter = `<select id="status-filter" class="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"><option value="all"${selectedStatus === "all" ? " selected" : ""}>All statuses</option><option value="running"${selectedStatus === "running" ? " selected" : ""}>Running</option><option value="stopped"${selectedStatus === "stopped" ? " selected" : ""}>Stopped</option></select>`;
  return `<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">${searchToolbar("Search containers…", filter)}<div class="overflow-x-auto"><table class="w-full min-w-[900px] text-left"><thead class="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400"><tr><th class="px-5 py-3">Container</th><th class="px-5 py-3">Image</th><th class="px-5 py-3">Status</th><th class="px-5 py-3">Ports</th><th class="px-5 py-3">Created</th><th class="px-5 py-3 text-right">Action</th></tr></thead><tbody id="resource-rows" class="divide-y divide-slate-100">${rows}</tbody></table>${filtered.length ? "" : emptyState(containers.length ? "No matching containers" : "No containers found", containers.length ? "Try adjusting your search or status filter." : "Docker containers will appear here when available.")}</div><div class="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">Showing ${filtered.length} of ${containers.length} containers</div></div>`;
}

function renderImages(images, query = "") {
  const filtered = images.filter((image) => [image.name, image.id, image.repository, image.tag].join(" ").toLowerCase().includes(query.toLowerCase()));
  const rows = filtered.map((image) => `<tr class="hover:bg-slate-50/70"><td class="px-5 py-4 font-mono text-xs text-slate-500">${escapeHtml(image.id)}</td><td class="px-5 py-4"><p class="font-medium text-slate-800">${escapeHtml(image.repository || image.name)}</p></td><td class="px-5 py-4"><span class="rounded-md bg-violet-50 px-2 py-1 font-mono text-xs text-violet-700">${escapeHtml(image.tag || "latest")}</span></td><td class="whitespace-nowrap px-5 py-4 text-sm text-slate-600">${formatBytes(image.size)}</td><td class="whitespace-nowrap px-5 py-4 text-sm text-slate-500">${formatDate(image.created)}</td></tr>`).join("");
  return `<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">${searchToolbar("Search images…")}<div class="overflow-x-auto"><table class="w-full min-w-[700px] text-left"><thead class="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400"><tr><th class="px-5 py-3">Image ID</th><th class="px-5 py-3">Repository</th><th class="px-5 py-3">Tag</th><th class="px-5 py-3">Size</th><th class="px-5 py-3">Created</th></tr></thead><tbody class="divide-y divide-slate-100">${rows}</tbody></table>${filtered.length ? "" : emptyState(images.length ? "No matching images" : "No images found", images.length ? "Try another search term." : "Docker images will appear here when available.")}</div><div class="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">Showing ${filtered.length} of ${images.length} images</div></div>`;
}

function renderVolumes(volumes, query = "") {
  const filtered = volumes.filter((volume) => [volume.name, volume.driver, volume.mountpoint].join(" ").toLowerCase().includes(query.toLowerCase()));
  const rows = filtered.map((volume) => `<tr class="hover:bg-slate-50/70"><td class="px-5 py-4"><p class="font-medium text-slate-800">${escapeHtml(volume.name)}</p><p class="mt-1 font-mono text-xs text-slate-400">${escapeHtml(volume.id)}</p></td><td class="px-5 py-4"><span class="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">${escapeHtml(volume.driver || "—")}</span></td><td class="max-w-lg px-5 py-4"><span class="block truncate font-mono text-xs text-slate-500" title="${escapeHtml(volume.mountpoint)}">${escapeHtml(volume.mountpoint || "—")}</span></td><td class="whitespace-nowrap px-5 py-4 text-sm text-slate-500">${formatDate(volume.created)}</td></tr>`).join("");
  return `<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">${searchToolbar("Search volumes…")}<div class="overflow-x-auto"><table class="w-full min-w-[700px] text-left"><thead class="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400"><tr><th class="px-5 py-3">Volume</th><th class="px-5 py-3">Driver</th><th class="px-5 py-3">Mount point</th><th class="px-5 py-3">Created</th></tr></thead><tbody class="divide-y divide-slate-100">${rows}</tbody></table>${filtered.length ? "" : emptyState(volumes.length ? "No matching volumes" : "No volumes found", volumes.length ? "Try another search term." : "Docker volumes will appear here when available.")}</div><div class="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">Showing ${filtered.length} of ${volumes.length} volumes</div></div>`;
}

function renderNetworks(networks, query = "") {
  const filtered = networks.filter((network) => [network.name, network.id, network.driver, network.scope].join(" ").toLowerCase().includes(query.toLowerCase()));
  const rows = filtered.map((network) => `<tr class="hover:bg-slate-50/70"><td class="px-5 py-4"><p class="font-medium text-slate-800">${escapeHtml(network.name)}</p><p class="mt-1 font-mono text-xs text-slate-400">${escapeHtml(network.id)}</p></td><td class="px-5 py-4"><span class="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">${escapeHtml(network.driver || "—")}</span></td><td class="px-5 py-4 text-sm text-slate-600">${escapeHtml(network.scope || "—")}</td><td class="whitespace-nowrap px-5 py-4 text-sm text-slate-500">${formatDate(network.created)}</td></tr>`).join("");
  return `<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">${searchToolbar("Search networks…")}<div class="overflow-x-auto"><table class="w-full min-w-[700px] text-left"><thead class="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400"><tr><th class="px-5 py-3">Network</th><th class="px-5 py-3">Driver</th><th class="px-5 py-3">Scope</th><th class="px-5 py-3">Created</th></tr></thead><tbody class="divide-y divide-slate-100">${rows}</tbody></table>${filtered.length ? "" : emptyState(networks.length ? "No matching networks" : "No networks found", networks.length ? "Try another search term." : "Docker networks will appear here when available.")}</div><div class="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">Showing ${filtered.length} of ${networks.length} networks</div></div>`;
}

async function loadPage(page) {
  const content = document.getElementById("page-content");
  const refresh = document.getElementById("refresh-page");
  refresh.disabled = true;
  refresh.classList.add("cursor-wait", "opacity-60");
  content.innerHTML = loadingState();
  try {
    if (page === "dashboard") {
      const [containers, images, volumes, networks] = await Promise.all([
        apiRequest("/docker/containes"),
        apiRequest("/docker/images"),
        apiRequest("/docker/volumes"),
        apiRequest("/docker/networks"),
      ]);
      content.innerHTML = renderDashboard({ containers, images, volumes, networks });
    } else {
      const path = page === "containers" ? "/docker/containes" : `/docker/${page}`;
      const payload = await apiRequest(path);
      const resources = payload[page];
      if (!Array.isArray(resources)) throw new Error(`Unexpected response from ${path}: expected a "${page}" list.`);
      if (page === "containers") {
        const query = new URLSearchParams(location.search);
        content.innerHTML = renderContainers(resources, "", query.get("status") || "all");
        document.getElementById("status-filter").addEventListener("change", (event) => {
          content.innerHTML = renderContainers(resources, document.getElementById("resource-search").value, event.target.value);
          bindContainerActions(resources, page);
          bindFilters(resources, page);
        });
      } else if (page === "images") {
        content.innerHTML = renderImages(resources);
      } else if (page === "networks") {
        content.innerHTML = renderNetworks(resources);
      } else {
        content.innerHTML = renderVolumes(resources);
      }
      bindFilters(resources, page);
      bindContainerActions(resources, page);
    }
    bindRetry(page);
  } catch (error) {
    content.innerHTML = errorState(error.message);
    bindRetry(page);
  } finally {
    refresh.disabled = false;
    refresh.classList.remove("cursor-wait", "opacity-60");
  }
}

function bindRetry(page) {
  document.querySelectorAll("[data-retry]").forEach((button) => button.addEventListener("click", () => loadPage(page)));
}

function bindFilters(resources, page) {
  const search = document.getElementById("resource-search");
  if (!search) return;
  search.addEventListener("input", (event) => {
    const query = event.currentTarget.value;
    const filter = document.getElementById("status-filter")?.value || "all";
    const render = page === "containers"
      ? () => renderContainers(resources, query, filter)
      : page === "images"
        ? () => renderImages(resources, query)
        : page === "networks"
          ? () => renderNetworks(resources, query)
          : () => renderVolumes(resources, query);
    document.getElementById("page-content").innerHTML = render();
    bindFilters(resources, page);
    bindContainerActions(resources, page);
  });
}

function bindContainerActions(resources, page) {
  if (page !== "containers") return;
  document.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", async () => {
    const { action, id, name } = button.dataset;
    if (action === "stop" && !window.confirm(`Stop container "${name}"?`)) return;
    const original = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<span class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"></span> Working…';
    button.classList.add("cursor-wait", "opacity-70");
    try {
      const result = await apiRequest(`/docker/container/${action}/${encodeURIComponent(id)}`, { method: "POST" });
      showFeedback(result.message || `Container ${action === "start" ? "started" : "stopped"} successfully.`);
      await loadPage(page);
    } catch (error) {
      showFeedback(`Could not ${action} ${name}: ${error.message}`, "error");
      button.disabled = false;
      button.innerHTML = original;
      button.classList.remove("cursor-wait", "opacity-70");
    }
  }));
}

const currentPage = document.getElementById("app").dataset.page;
renderLayout(currentPage);
document.getElementById("refresh-page").addEventListener("click", () => loadPage(currentPage));
loadPage(currentPage);
