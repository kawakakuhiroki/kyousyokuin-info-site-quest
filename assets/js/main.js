document.addEventListener("DOMContentLoaded", () => {
  const radios = document.querySelectorAll(
    ".dialog-choices input[type=\"radio\"]"
  );
  const routePanels = document.querySelectorAll(".route-panel");
  const routeCards = document.querySelectorAll(".route-card");
  const routeSteps = document.querySelectorAll(".route-step");
  const routeLanes = document.querySelectorAll("[data-route-lane]");

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
});
