document.addEventListener("DOMContentLoaded", () => {

  const works = document.querySelectorAll(".work-item");
  const buttons = document.querySelectorAll(".filter-buttons button");
  const search = document.getElementById("searchInput");

  /* FILTER */
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {

      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      works.forEach(item => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

    });
  });

  /* SEARCH */
  search.addEventListener("input", () => {
    const term = search.value.toLowerCase();

    works.forEach(item => {
      const text = item.innerText.toLowerCase();
      item.style.display = text.includes(term) ? "block" : "none";
    });
  });

  /* SUBSTACK AUTO SYNC */
  const substackFeed = "https://koyokk.substack.com/feed";

  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(substackFeed)}`)
    .then(res => res.json())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data.contents, "text/xml");
      const items = xml.querySelectorAll("item");

      const grid = document.querySelector(".works-grid");

      items.forEach(post => {

        const title = post.querySelector("title")?.textContent;
        const link = post.querySelector("link")?.textContent;
        const desc = post.querySelector("description")?.textContent;

        if (!title || !link) return;

        const card = document.createElement("div");
        card.className = "work-item";
        card.dataset.category = "substack";

        card.innerHTML = `
          <h3>${title}</h3>
          <p class="work-category">Category: Substack</p>
          <p class="work-description">${desc?.slice(0, 160) || ""}...</p>
          <a href="${link}" target="_blank" class="read-more">Read More →</a>
        `;

        grid.prepend(card);

      });

    })
    .catch(() => {
      console.log("Substack sync failed");
    });

});
