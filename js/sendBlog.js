import {
  fetchArticles,
  updateSearchQuery,
  currentPage,
  searchQuery,
} from "./blogArticle.js";

document.getElementById("search-btn").addEventListener("click", () => {
  const query = document.getElementById("search-input").value.trim();
  if (query) {
    updateSearchQuery(query);
    fetchArticles(query, 1);
  } else {
    alert("Please enter a search term.");
  }
});

document.getElementById("next-btn").addEventListener("click", () => {
  fetchArticles(searchQuery, currentPage + 1);
});

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentPage > 1) {
    fetchArticles(searchQuery, currentPage - 1);
  }
});

// Fetch default news on load
fetchArticles(searchQuery, currentPage);
