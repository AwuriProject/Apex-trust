const animateCountUp = function (el, target, duration = 2000) {
  let startTime = null;

  const updateCount = function (timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const current = Math.min(
      Math.floor((progress / duration) * target),
      target
    );
    el.textContent = current;

    if (current < target) {
      requestAnimationFrame(updateCount);
    }
  };
  requestAnimationFrame(updateCount);
};

const handleScroll = function () {
  const counters = document.querySelectorAll("#counter");

  counters.forEach((counter) => {
    if (counter.classList.contains("counted")) return;

    const target = parseInt(counter.getAttribute("data-target"), 10);
    const rect = counter.getBoundingClientRect();

    if (
      rect.top < window.innerHeight &&
      !counter.classList.contains("counted")
    ) {
      counter.classList.add("counted");
      animateCountUp(counter, target);
      window.removeEventListener("scroll", handleScroll);
    }
  });
};
window.addEventListener("scroll", handleScroll);
