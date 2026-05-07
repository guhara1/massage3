function setupReviewSlider() {
  const slider = document.querySelector(".review-slider");
  if (!slider) return;

  const track = slider.querySelector(".review-track");
  const cards = Array.from(slider.querySelectorAll(".review-card"));
  const prevButton = slider.querySelector(".review-prev");
  const nextButton = slider.querySelector(".review-next");
  let index = 0;
  let startX = 0;

  function visibleCount() {
    return window.matchMedia("(max-width: 680px)").matches ? 1 : 2;
  }

  function maxIndex() {
    return Math.max(0, cards.length - visibleCount());
  }

  function updateSlider() {
    const card = cards[0];
    if (!card) return;
    index = Math.min(index, maxIndex());
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const step = card.getBoundingClientRect().width + gap;
    track.style.transform = `translateX(-${index * step}px)`;
    prevButton.disabled = index === 0;
    nextButton.disabled = index === maxIndex();
  }

  prevButton.addEventListener("click", () => {
    index = Math.max(0, index - visibleCount());
    updateSlider();
  });

  nextButton.addEventListener("click", () => {
    index = Math.min(maxIndex(), index + visibleCount());
    updateSlider();
  });

  track.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
  }, { passive: true });

  track.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].clientX - startX;
    if (Math.abs(distance) < 42) return;
    index = distance < 0 ? Math.min(maxIndex(), index + 1) : Math.max(0, index - 1);
    updateSlider();
  });

  window.addEventListener("resize", updateSlider);
  updateSlider();
}

function maskLocalReviewName() {
  const reviewer = document.querySelector(".local-review-card span");
  if (!reviewer || !reviewer.textContent.includes("익명")) return;
  const areaText = reviewer.textContent.split("·")[1]?.trim() || "이용 고객";
  reviewer.textContent = `김0영 · ${areaText}`;
}

setupReviewSlider();
maskLocalReviewName();

new MutationObserver(maskLocalReviewName).observe(document.body, {
  childList: true,
  subtree: true
});
