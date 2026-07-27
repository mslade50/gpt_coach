(() => {
  "use strict";

  const exercises = Array.isArray(window.EXERCISES) ? window.EXERCISES : [];
  const weeklyPlans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const sessionPlans = window.SESSION_PLANS && typeof window.SESSION_PLANS === "object" ? window.SESSION_PLANS : {};
  const primaryExercises = exercises
    .filter((exercise) => exercise.order <= 30)
    .sort((a, b) => a.order - b.order);
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

  function getAutoSession(now = new Date()) {
    const today = startOfLocalDay(now);
    const elapsedDays = Math.floor((today - programStart) / msPerDay);
    const totalDays = Math.max((weeklyPlans.length || 1) * 7, 1);
    const clampedDay = Math.min(Math.max(elapsedDays, 0), totalDays - 1);
    return {
      week: Math.floor(clampedDay / 7) + 1,
      dayIndex: clampedDay % 7
    };
  }

  function sessionKey(week, dayIndex) {
    return `w${week}d${dayIndex + 1}`;
  }

  function completionStorageKey(week, dayIndex) {
    return `hybrid400-completed-${sessionKey(week, dayIndex)}`;
  }

  function loadCompletionSet(week, dayIndex) {
    try {
      const parsed = JSON.parse(storageGet(completionStorageKey(week, dayIndex)));
      return new Set(Array.isArray(parsed) ? parsed : []);
    } catch {
      return new Set();
    }
  }

  const autoSession = getAutoSession();
  const state = {
    category: "All",
    query: "",
    favoritesOnly: false,
    favorites: new Set(JSON.parse(storageGet("hybrid400-favorites"))),
    displayedWeek: getAutoProgramWeek(),
    selectedSession: autoSession,
    completed: loadCompletionSet(autoSession.week, autoSession.dayIndex),
    currentItemIds: []
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
  const sessionTitle = document.getElementById("session-title");
  const sessionName = document.getElementById("session-name");
  const sessionDate = document.getElementById("session-date");
  const sessionDuration = document.getElementById("session-duration");
  const sessionVolume = document.getElementById("session-volume");
  const sessionFootwear = document.getElementById("session-footwear");
  const sessionEyebrow = document.getElementById("sessionEyebrow");
  const sessionHeading = document.getElementById("session-heading");
  const sessionSelectionMeta = document.getElementById("sessionSelectionMeta");
  const sessionNotice = document.getElementById("sessionNotice");
  const previousSession = document.getElementById("previousSession");
  const todaySession = document.getElementById("todaySession");
  const nextSession = document.getElementById("nextSession");
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

  function sessionDateFor(weekNumber, dayIndex) {
    const date = weekStartDate(weekNumber);
    date.setDate(date.getDate() + dayIndex);
    return date;
  }

  function formatShortDate(date) {
    return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(date);
  }

  function formatSessionDate(date) {
    return new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" }).format(date);
  }

  function formatDateRange(weekNumber) {
    const start = weekStartDate(weekNumber);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${formatShortDate(start)}–${formatShortDate(end)}`;
  }

  function dayDateLabel(weekNumber, dayIndex) {
    return formatShortDate(sessionDateFor(weekNumber, dayIndex));
  }

  function dayClass(type) {
    const normalized = String(type).toLowerCase();
    if (normalized.includes("high")) return "is-high";
    if (normalized.includes("recovery")) return "is-recovery";
    return "";
  }

  function getWeekPlan(weekNumber) {
    return weeklyPlans.find((item) => item.week === weekNumber) || weeklyPlans[0] || null;
  }

  function getDayPlan(weekNumber, dayIndex) {
    const plan = getWeekPlan(weekNumber);
    return plan && Array.isArray(plan.days) ? plan.days[dayIndex] || plan.days[0] : null;
  }

  function getSessionDefinition(weekNumber, dayIndex) {
    const day = getDayPlan(weekNumber, dayIndex);
    const saved = sessionPlans[sessionKey(weekNumber, dayIndex)];
    if (saved) return saved;

    return {
      purpose: day ? day.title : "Planned session",
      duration: "See daily prescription",
      volume: day ? day.volume : "Not loaded",
      footwear: "See daily prescription",
      note: day
        ? `${day.detail} This is the macro-plan view; the final daily prescription remains readiness-dependent.`
        : "No detailed session has been loaded yet.",
      blocks: day ? [
        {
          name: "Session plan",
          items: [
            { id: "primary-work", name: day.title, dosage: day.volume },
            { id: "execution", name: "Execution intent", dosage: day.detail }
          ]
        }
      ] : []
    };
  }

  function groupedWeek1Day1Exercises() {
    const groups = new Map();
    primaryExercises.forEach((exercise) => {
      if (!groups.has(exercise.block)) groups.set(exercise.block, []);
      groups.get(exercise.block).push(exercise);
    });
    return [...groups.entries()].map(([name, items]) => ({ name, items }));
  }

  function selectedSessionBlocks() {
    const { week, dayIndex } = state.selectedSession;
    const definition = getSessionDefinition(week, dayIndex);
    if (definition.source === "week1Day1Exercises") return groupedWeek1Day1Exercises();
    return Array.isArray(definition.blocks) ? definition.blocks : [];
  }

  function renderFilters() {
    if (!categoryFilters) return;
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
        <div class="card-dose"><strong>Reference dose:</strong> ${escapeHtml(exercise.dosage)}</div>
        <div class="card-open">Open coaching detail →</div>
      </article>
    `;
  }

  function renderLibrary() {
    if (!exerciseGrid || !resultCount || !emptyState || !showFavorites) return;
    const visible = filteredExercises();
    exerciseGrid.innerHTML = visible.map(cardMarkup).join("");
    resultCount.textContent = `${visible.length} movement${visible.length === 1 ? "" : "s"} shown`;
    emptyState.hidden = visible.length > 0;
    showFavorites.setAttribute("aria-pressed", String(state.favoritesOnly));
    showFavorites.textContent = state.favoritesOnly ? "★ Showing shortlist only" : "☆ Show shortlist only";
  }

  function renderSessionHeader() {
    const { week, dayIndex } = state.selectedSession;
    const day = getDayPlan(week, dayIndex);
    const definition = getSessionDefinition(week, dayIndex);
    const date = sessionDateFor(week, dayIndex);
    const totalPosition = ((week - 1) * 7) + dayIndex;
    const finalPosition = Math.max((weeklyPlans.length * 7) - 1, 0);

    if (sessionTitle) sessionTitle.textContent = `Week ${week} · Day ${dayIndex + 1}`;
    if (sessionName) sessionName.textContent = definition.purpose || (day ? day.title : "Planned session");
    if (sessionDate) sessionDate.textContent = formatSessionDate(date);
    if (sessionDuration) sessionDuration.textContent = definition.duration || "See plan";
    if (sessionVolume) sessionVolume.textContent = definition.volume || (day ? day.volume : "Not loaded");
    if (sessionFootwear) sessionFootwear.textContent = definition.footwear || "See plan";
    if (sessionEyebrow) sessionEyebrow.textContent = `${day ? day.day.toUpperCase() : "SESSION"} AT A GLANCE`;
    if (sessionHeading) sessionHeading.textContent = definition.purpose || (day ? day.title : "Run the session in order");
    if (sessionSelectionMeta) {
      sessionSelectionMeta.textContent = day
        ? `${day.type} · ${day.status} · Use the arrows or click a day in the weekly schedule.`
        : "Use the arrows or click a day in the weekly schedule.";
    }
    if (sessionNotice) {
      sessionNotice.textContent = definition.note || "";
      sessionNotice.hidden = !definition.note;
    }
    if (previousSession) previousSession.disabled = totalPosition <= 0;
    if (nextSession) nextSession.disabled = totalPosition >= finalPosition;
  }

  function renderTimeline() {
    if (!sessionTimeline) return;
    const blocks = selectedSessionBlocks();
    state.currentItemIds = blocks.flatMap((block) => block.items.map((item) => item.id));

    sessionTimeline.innerHTML = blocks.map((block) => `
      <section class="timeline-group">
        <h3>${escapeHtml(block.name)} <span>${block.items.length} item${block.items.length === 1 ? "" : "s"}</span></h3>
        ${block.items.map((item) => `
          <label class="check-item">
            <input type="checkbox" data-complete="${escapeHtml(item.id)}" ${state.completed.has(item.id) ? "checked" : ""} />
            <span>
              <strong>${escapeHtml(item.name)}</strong>
              <small>${escapeHtml(item.dosage)}</small>
            </span>
          </label>
        `).join("")}
      </section>
    `).join("");
    updateProgress();
  }

  function updateProgress() {
    if (!progressText || !progressBar) return;
    const validCompleted = state.currentItemIds.filter((id) => state.completed.has(id)).length;
    const total = state.currentItemIds.length;
    const percent = total ? (validCompleted / total) * 100 : 0;
    progressText.textContent = `${validCompleted} of ${total} session items checked`;
    progressBar.style.width = `${percent}%`;
  }

  function renderWeekPlan() {
    if (!weekGrid || !weekSummary || !weekPlanMeta || !weeklyPlans.length) return;

    const plan = getWeekPlan(state.displayedWeek);
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

    weekGrid.innerHTML = plan.days.map((day, index) => {
      const selected = plan.week === state.selectedSession.week && index === state.selectedSession.dayIndex;
      return `
        <article
          class="week-day-card ${dayClass(day.type)} ${selected ? "is-selected" : ""}"
          role="button"
          tabindex="0"
          data-session-week="${plan.week}"
          data-session-day="${index}"
          aria-label="Open Week ${plan.week} ${escapeHtml(day.day)} session"
          ${selected ? 'aria-current="date"' : ""}
        >
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
          <div class="week-open">${selected ? "Current session" : "Open session →"}</div>
        </article>
      `;
    }).join("");

    if (previousWeek) previousWeek.disabled = plan.week <= 1;
    if (nextWeek) nextWeek.disabled = plan.week >= weeklyPlans.length;
  }

  function selectSession(week, dayIndex, options = {}) {
    const safeWeek = Math.min(Math.max(Number(week) || 1, 1), weeklyPlans.length || 1);
    const safeDay = Math.min(Math.max(Number(dayIndex) || 0, 0), 6);
    state.selectedSession = { week: safeWeek, dayIndex: safeDay };
    state.displayedWeek = safeWeek;
    state.completed = loadCompletionSet(safeWeek, safeDay);
    renderSessionHeader();
    renderTimeline();
    renderWeekPlan();

    if (options.scroll && document.getElementById("session")) {
      document.getElementById("session").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function shiftSession(delta) {
    const maxPosition = Math.max((weeklyPlans.length * 7) - 1, 0);
    const current = ((state.selectedSession.week - 1) * 7) + state.selectedSession.dayIndex;
    const next = Math.min(Math.max(current + delta, 0), maxPosition);
    selectSession(Math.floor(next / 7) + 1, next % 7, { scroll: true });
  }

  function openExercise(exercise) {
    if (!dialogContent || !dialog) return;
    dialogContent.innerHTML = `
      <div class="dialog-inner">
        <p class="eyebrow">${escapeHtml(exercise.block)} · ${escapeHtml(exercise.category)}</p>
        <h2 id="dialogTitle">${escapeHtml(exercise.name)}</h2>
        <p class="dialog-purpose">${escapeHtml(exercise.purpose)}</p>

        <div class="dialog-meta">
          <div><span>Reference dose</span><strong>${escapeHtml(exercise.dosage)}</strong></div>
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

  if (categoryFilters) {
    categoryFilters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      state.category = button.dataset.category;
      renderFilters();
      renderLibrary();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      state.query = event.target.value;
      renderLibrary();
    });
  }

  if (showFavorites) {
    showFavorites.addEventListener("click", () => {
      state.favoritesOnly = !state.favoritesOnly;
      renderLibrary();
    });
  }

  if (exerciseGrid) {
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
  }

  if (sessionTimeline) {
    sessionTimeline.addEventListener("change", (event) => {
      const checkbox = event.target.closest("[data-complete]");
      if (!checkbox) return;
      if (checkbox.checked) state.completed.add(checkbox.dataset.complete);
      else state.completed.delete(checkbox.dataset.complete);
      saveSet(completionStorageKey(state.selectedSession.week, state.selectedSession.dayIndex), state.completed);
      updateProgress();
    });
  }

  if (resetProgress) {
    resetProgress.addEventListener("click", () => {
      state.completed.clear();
      saveSet(completionStorageKey(state.selectedSession.week, state.selectedSession.dayIndex), state.completed);
      renderTimeline();
    });
  }

  if (previousSession) previousSession.addEventListener("click", () => shiftSession(-1));
  if (nextSession) nextSession.addEventListener("click", () => shiftSession(1));
  if (todaySession) {
    todaySession.addEventListener("click", () => {
      const today = getAutoSession();
      selectSession(today.week, today.dayIndex, { scroll: true });
    });
  }

  if (weekGrid) {
    const openDayCard = (card) => {
      if (!card) return;
      selectSession(Number(card.dataset.sessionWeek), Number(card.dataset.sessionDay), { scroll: true });
    };

    weekGrid.addEventListener("click", (event) => openDayCard(event.target.closest("[data-session-week]")));
    weekGrid.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const card = event.target.closest("[data-session-week]");
      if (!card) return;
      event.preventDefault();
      openDayCard(card);
    });
  }

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

  if (dialogClose && dialog) dialogClose.addEventListener("click", () => dialog.close());
  if (dialog) {
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
      if (outside) dialog.close();
    });
  }

  renderFilters();
  renderLibrary();
  renderSessionHeader();
  renderTimeline();
  renderWeekPlan();
})();