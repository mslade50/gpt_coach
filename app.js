(() => {
  "use strict";

  const exercises = Array.isArray(window.EXERCISES) ? window.EXERCISES : [];
  const weeklyPlans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const primaryExercises = exercises.filter((exercise) => exercise.order <= 30);
  const programStart = new Date(2026, 6, 27);
  const msPerDay = 24 * 60 * 60 * 1000;

  const storageGet = (key, fallback = "[]") => {
    try { return window.localStorage.getItem(key) || fallback; }
    catch { return fallback; }
  };
  const storageSet = (key, value) => {
    try { window.localStorage.setItem(key, value); }
    catch { /* The dashboard still works when storage is disabled. */ }
  };

  function startOfLocalDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function getAutoProgramWeek(now = new Date()) {
    const today = startOfLocalDay(now);
    const elapsedDays = Math.floor((today - programStart) / msPerDay);
    let week = Math.floor(Math.max(elapsedDays, 0) / 7) + 1;

    // Saturday night preview: show the next planned week after 6:00 PM local time.
    if (now.getDay() === 6 && now.getHours() >= 18) week += 1;

    if (!weeklyPlans.length) return 1;
    return Math.min(Math.max(week, 1), weeklyPlans.length);
  }

  const state = {
    category: "All",
    query: "",
    favoritesOnly: false,
    favorites: new Set(JSON.parse(storageGet("hybrid400-favorites"))),
    completed: new Set(JSON.parse(storageGet("hybrid400-completed-w1d1"))),
    displayedWeek: getAutoProgramWeek()
  };

  const categoryFilters = document.getElementById("categoryFilters");
  const exerciseGrid = document.getElementById("exerciseGrid");
  const resultCount = document.getElementById("resultCount");
  const emptyState = document.getElementById("emptyState");
  const searchInput = document.getElementById("searchInput");
  const showFavorites = document.getElementById("showFavorites");
  const sessionTimeline = document.getElementById("sessionTimeline");
  const progressText = document.getElementById("progressText");
  const progressBar = document.getElementById("progressBar");
  const resetProgress = document.getElementById("resetProgress");
  const weekPlanMeta = document.getElementById("weekPlanMeta");
  const weekSummary = document.getElementById("weekSummary");
  const weekGrid = document.getElementById("weekGrid");
  const previousWeek = document.getElementById("previousWeek");
  const autoWeek = document.getElementById("autoWeek");
  const nextWeek = document.getElementById("nextWeek");
  const dialog = document.getElementById("exerciseDialog");
  const dialogContent = document.getElementById("dialogContent");
  const dialogClose = document.getElementById("dialogClose");

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const videoUrl = (query) => `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

  function saveSet(key, set) {
    storageSet(key, JSON.stringify([...set]));
  }

  function weekStartDate(weekNumber) {
    const date = new Date(programStart);
    date.setDate(programStart.getDate() + ((weekNumber - 1) * 7));
    return date;
  }

  function formatShortDate(date) {
    return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(date);
  }

  function formatDateRange(weekNumber) {
    const start = weekStartDate(weekNumber);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${formatShortDate(start)}–${formatShortDate(end)}`;
  }

  function dayDateLabel(weekNumber, dayIndex) {
    const date = weekStartDate(weekNumber);
    date.setDate(date.getDate() + dayIndex);
    return formatShortDate(date);
  }

  function dayClass(type) {
    const normalized = String(type).toLowerCase();
    if (normalized.includes("high")) return "is-high";
    if (normalized.includes("recovery")) return "is-recovery";
    return "";
  }

  function renderFilters() {
    const categories = ["All", ...new Set(exercises.map((exercise) => exercise.category))];
    categoryFilters.innerHTML = categories.map((category) => `
      <button class="filter-button" type="button" data-category="${escapeHtml(category)}" aria-pressed="${state.category === category}">
        ${escapeHtml(category)}
      </button>
    `).join("");
  }

  function filteredExercises() {
    const query = state.query.trim().toLowerCase();
    return exercises.filter((exercise) => {
      const categoryMatch = state.category === "All" || exercise.category === state.category;
      const favoriteMatch = !state.favoritesOnly || state.favorites.has(exercise.id);
      const haystack = [
        exercise.name,
        exercise.category,
        exercise.block,
        exercise.purpose,
        exercise.cue,
        exercise.avoid,
        exercise.equipment,
        ...(exercise.aliases || [])
      ].join(" ").toLowerCase();
      const queryMatch = !query || haystack.includes(query);
      return categoryMatch && favoriteMatch && queryMatch;
    });
  }

  function cardMarkup(exercise) {
    const favorite = state.favorites.has(exercise.id);
    return `
      <article class="exercise-card" tabindex="0" role="button" data-id="${escapeHtml(exercise.id)}" aria-label="Open ${escapeHtml(exercise.name)} details">
        <div class="card-top">
          <div class="card-tags">
            <span class="card-tag">${escapeHtml(exercise.category)}</span>
            <span class="intensity-tag">${escapeHtml(exercise.intensity)}</span>
          </div>
          <button class="favorite-button" type="button" data-favorite="${escapeHtml(exercise.id)}" aria-label="${favorite ? "Remove from" : "Add to"} shortlist" aria-pressed="${favorite}">${favorite ? "★" : "☆"}</button>
        </div>
        <h3>${escapeHtml(exercise.name)}</h3>
        <p class="card-purpose">${escapeHtml(exercise.purpose)}</p>
        <div class="card-dose"><strong>Monday:</strong> ${escapeHtml(exercise.dosage)}</div>
        <div class="card-open">Open coaching detail →</div>
      </article>
    `;
  }

  function renderLibrary() {
    const visible = filteredExercises();
    exerciseGrid.innerHTML = visible.map(cardMarkup).join("");
    resultCount.textContent = `${visible.length} movement${visible.length === 1 ? "" : "s"} shown`;
    emptyState.hidden = visible.length > 0;
    showFavorites.setAttribute("aria-pressed", String(state.favoritesOnly));
    showFavorites.textContent = state.favoritesOnly ? "★ Showing shortlist only" : "☆ Show shortlist only";
  }

  function groupedPrimaryExercises() {
    const groups = new Map();
    primaryExercises.sort((a, b) => a.order - b.order).forEach((exercise) => {
      if (!groups.has(exercise.block)) groups.set(exercise.block, []);
      groups.get(exercise.block).push(exercise);
    });
    return groups;
  }

  function renderTimeline() {
    const groups = groupedPrimaryExercises();
    sessionTimeline.innerHTML = [...groups.entries()].map(([block, items]) => `
      <section class="timeline-group">
        <h3>${escapeHtml(block)} <span>${items.length} item${items.length === 1 ? "" : "s"}</span></h3>
        ${items.map((exercise) => `
          <label class="check-item">
            <input type="checkbox" data-complete="${escapeHtml(exercise.id)}" ${state.completed.has(exercise.id) ? "checked" : ""} />
            <span>
              <strong>${escapeHtml(exercise.name)}</strong>
              <small>${escapeHtml(exercise.dosage)}</small>
            </span>
          </label>
        `).join("")}
      </section>
    `).join("");
    updateProgress();
  }

  function updateProgress() {
    const validCompleted = primaryExercises.filter((exercise) => state.completed.has(exercise.id)).length;
    const total = primaryExercises.length;
    const percent = total ? (validCompleted / total) * 100 : 0;
    progressText.textContent = `${validCompleted} of ${total} primary items checked`;
    progressBar.style.width = `${percent}%`;
  }

  function renderWeekPlan() {
    if (!weekGrid || !weekSummary || !weekPlanMeta || !weeklyPlans.length) return;

    const plan = weeklyPlans.find((item) => item.week === state.displayedWeek) || weeklyPlans[0];
    const autoSelectedWeek = getAutoProgramWeek();
    const range = formatDateRange(plan.week);
    const viewMode = plan.week === autoSelectedWeek ? "auto view" : "manual view";

    weekPlanMeta.textContent = `Week ${plan.week} · ${range} · ${viewMode}. Auto-rolls Saturday after 6 PM local time.`;

    weekSummary.innerHTML = `
      <article class="week-summary-card">
        <div>
          <p class="eyebrow">WEEK ${escapeHtml(plan.week)}</p>
          <h3>${escapeHtml(plan.title)}</h3>
          <p>${escapeHtml(plan.focus)}</p>
        </div>
        <div class="week-note">${escapeHtml(plan.statusNote)}</div>
      </article>
    `;

    weekGrid.innerHTML = plan.days.map((day, index) => `
      <article class="week-day-card ${dayClass(day.type)}">
        <div class="week-day-top">
          <div>
            <span class="week-day-name">${escapeHtml(day.day)}</span>
            <span class="week-day-date">${escapeHtml(dayDateLabel(plan.week, index))}</span>
          </div>
          <div class="week-badges">
            <span class="week-badge">${escapeHtml(day.type)}</span>
            <span class="status-badge">${escapeHtml(day.status)}</span>
          </div>
        </div>
        <h3>${escapeHtml(day.title)}</h3>
        <p>${escapeHtml(day.detail)}</p>
        <div class="week-volume"><strong>Volume:</strong> ${escapeHtml(day.volume)}</div>
      </article>
    `).join("");

    if (previousWeek) previousWeek.disabled = plan.week <= 1;
    if (nextWeek) nextWeek.disabled = plan.week >= weeklyPlans.length;
  }

  function openExercise(exercise) {
    dialogContent.innerHTML = `
      <div class="dialog-inner">
        <p class="eyebrow">${escapeHtml(exercise.block)} · ${escapeHtml(exercise.category)}</p>
        <h2 id="dialogTitle">${escapeHtml(exercise.name)}</h2>
        <p class="dialog-purpose">${escapeHtml(exercise.purpose)}</p>

        <div class="dialog-meta">
          <div><span>Monday dosage</span><strong>${escapeHtml(exercise.dosage)}</strong></div>
          <div><span>Equipment</span><strong>${escapeHtml(exercise.equipment)}</strong></div>
        </div>

        <section class="dialog-section">
          <h3>How to perform it</h3>
          <ol>${exercise.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
        </section>

        <section class="dialog-section cue-boxes">
          <div class="cue-box"><span>Primary cue</span><strong>${escapeHtml(exercise.cue)}</strong></div>
          <div class="cue-box error"><span>Common error</span><strong>${escapeHtml(exercise.avoid)}</strong></div>
        </section>

        <a class="video-button" href="${videoUrl(exercise.videoQuery)}" target="_blank" rel="noopener noreferrer">Watch targeted video demonstrations ↗</a>
        <p class="video-note">The search is preloaded with the drill and a preferred coaching source where available.</p>
      </div>
    `;
    if (typeof dialog.showModal === "function") dialog.showModal();
  }

  categoryFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    state.category = button.dataset.category;
    renderFilters();
    renderLibrary();
  });

  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderLibrary();
  });

  showFavorites.addEventListener("click", () => {
    state.favoritesOnly = !state.favoritesOnly;
    renderLibrary();
  });

  exerciseGrid.addEventListener("click", (event) => {
    const favoriteButton = event.target.closest("[data-favorite]");
    if (favoriteButton) {
      event.stopPropagation();
      const id = favoriteButton.dataset.favorite;
      if (state.favorites.has(id)) state.favorites.delete(id);
      else state.favorites.add(id);
      saveSet("hybrid400-favorites", state.favorites);
      renderLibrary();
      return;
    }
    const card = event.target.closest("[data-id]");
    if (!card) return;
    const exercise = exercises.find((item) => item.id === card.dataset.id);
    if (exercise) openExercise(exercise);
  });

  exerciseGrid.addEventListener("keydown", (event) => {
    if (event.target.closest("button")) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest("[data-id]");
    if (!card) return;
    event.preventDefault();
    const exercise = exercises.find((item) => item.id === card.dataset.id);
    if (exercise) openExercise(exercise);
  });

  sessionTimeline.addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-complete]");
    if (!checkbox) return;
    if (checkbox.checked) state.completed.add(checkbox.dataset.complete);
    else state.completed.delete(checkbox.dataset.complete);
    saveSet("hybrid400-completed-w1d1", state.completed);
    updateProgress();
  });

  resetProgress.addEventListener("click", () => {
    state.completed.clear();
    saveSet("hybrid400-completed-w1d1", state.completed);
    renderTimeline();
  });

  if (previousWeek) {
    previousWeek.addEventListener("click", () => {
      state.displayedWeek = Math.max(1, state.displayedWeek - 1);
      renderWeekPlan();
    });
  }

  if (nextWeek) {
    nextWeek.addEventListener("click", () => {
      state.displayedWeek = Math.min(weeklyPlans.length, state.displayedWeek + 1);
      renderWeekPlan();
    });
  }

  if (autoWeek) {
    autoWeek.addEventListener("click", () => {
      state.displayedWeek = getAutoProgramWeek();
      renderWeekPlan();
    });
  }

  dialogClose.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) dialog.close();
  });

  renderFilters();
  renderLibrary();
  renderTimeline();
  renderWeekPlan();
})();
