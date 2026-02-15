// FILTER FUNCTION
const filterButtons = document.querySelectorAll(".filter-buttons button");
const workItems = document.querySelectorAll(".work-item");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        // Remove active class
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        workItems.forEach(item => {
            if (filter === "all" || item.classList.contains(filter)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});


// SEARCH FUNCTION
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {
    const searchValue = this.value.toLowerCase();

    workItems.forEach(item => {
        const title = item.querySelector("h3").textContent.toLowerCase();

        if (title.includes(searchValue)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
});

