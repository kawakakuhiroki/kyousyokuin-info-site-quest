document.addEventListener("DOMContentLoaded", () => {
  const radios = document.querySelectorAll(
    ".dialog-choices input[type=\"radio\"]"
  );
  const routePanels = document.querySelectorAll(".route-panel");
  const routeCards = document.querySelectorAll(".route-card");
  const routeSteps = document.querySelectorAll(".route-step");
  const routeLanes = document.querySelectorAll("[data-route-lane]");
  const soundChip = document.querySelector("[data-sound-chip]");
  const soundToggle = document.querySelector("[data-sound-toggle]");
  const saveButtons = document.querySelectorAll("[data-save-button]");
  const soundMap = {
    "route-1": "守護のテーマ",
    "route-2": "冒険のテーマ",
    "route-3": "仲間のテーマ",
  };

  const applyRoute = (route) => {
    if (!route) return;
    document.body.setAttribute("data-route", route);
    routePanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.id === route);
    });
    routeCards.forEach((card) => {
      card.classList.toggle("is-active", card.dataset.route === route);
    });
    routeSteps.forEach((step) => {
      step.classList.toggle("is-active", step.dataset.route === route);
    });
    routeLanes.forEach((lane) => {
      lane.classList.toggle("is-active", lane.dataset.routeLane === route);
    });
    if (soundChip) {
      const chipText = soundChip.querySelector("span");
      if (chipText) {
        chipText.textContent = `♪ BGM: ${soundMap[route] || "旅立ちのテーマ"}`;
      }
    }
  };

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.checked) {
        applyRoute(radio.dataset.route);
      }
    });
  });

  const checked = Array.from(radios).find((radio) => radio.checked);
  if (checked) {
    applyRoute(checked.dataset.route);
  }

  if (soundToggle && soundChip) {
    soundToggle.addEventListener("click", () => {
      const off = soundToggle.classList.toggle("is-off");
      soundToggle.textContent = off ? "OFF" : "ON";
      soundChip.style.opacity = off ? "0.6" : "1";
    });
  }

  const saveSlotLabels = {
    1: "ワールドマップ",
    2: "事業・サービス",
    3: "仕事と人",
  };

  saveButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const slot = btn.dataset.saveButton;
      const target = document.querySelector(`[data-save-slot=\"${slot}\"] .save-meta`);
      const now = new Date();
      const time = now.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
      if (target) {
        target.textContent = `最終訪問: ${time}`;
      }
      btn.textContent = "セーブ完了";
      setTimeout(() => {
        btn.textContent = "セーブ";
      }, 1200);
    });
  });
});
