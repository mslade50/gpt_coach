(() => {
  "use strict";

  const exercises = Array.isArray(window.EXERCISES) ? window.EXERCISES : [];
  const primaryExercises = exercises.filter((exercise) => exercise.order <= 30);

  const storageGet = (key, fallback = "[]") => {
    try { return window.localStorage.getItem(key) || fallback; }
    catch { return fallback; }
  };
  const storageSet = (key, value) => {
    try { window.localStorage.setItem(key, value); }
    catch { /* The dashboard still works when storage is disabled. */ }
  };

  const state = {
    category: "All",
    query: "",
    favoritesOnly: false,
    favorites: new Set(JSON.parse(storageGet("hybrid400-favorites"))),
    completed: new Set(JSON.parse(storageGet("hybrid400-completed-w1d1")))
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

  dialogClose.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) dialog.close();
  });

  renderFilters();
  renderLibrary();
  renderTimeline();
})();
