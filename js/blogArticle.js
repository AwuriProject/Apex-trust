const apiKey = `yiIViD646dtcT2MQ2dg24Qw0l5tA6ySP3BkFj8kW`;

export const state = {
  currentPage: 1,
  pageSize: 10,
  totalArticle: 100,
  searchQuery: "",
};
export const fetchArticles = async (query = state.searchQuery, page = 1) => {
  try {
    const offset = (page - 1) * state.pageSize;
    const response = await fetch(
      `https://api.marketaux.com/v1/news/all?countries=gb&filter_entities=true&limit=${
        state.pageSize
      }&offset=${offset}&q=${query}&published_after=${getFormattedDate()}&api_token=${apiKey} `
    );
    const data = await response.json();
    console.log(data);
    if (!data.data) return;
    if (data.data) {
      state.totalArticle = data.meta.found;
      displayArticles(data.data);
      updatePagination(page, Math.ceil(state.totalArticle / state.pageSize));
    } else {
      document.getElementById("article-container").innerHTML =
        "<p>No articles found.</p>";
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
};

const cleanContent = (content) => {
  if (!content) return;
  return content
    .replace(/<\/?ul>|<\/?li>/g, "")
    .replace(/<\/?[^>]+(>|$)/g, "Read More")
    .trim();
};

const displayArticles = (articles) => {
  console.log(articles);
  const container = document.getElementById("article-container");
  container.innerHTML = "";
  articles.forEach((article) => {
    const articleContent = article.snippet
      ? cleanContent(article.snippet).substring(0, 200)
      : "No content available";
    container.innerHTML += `
            <div class="article">
              <img src="${article.image_url}" alt="${
      article.title || "No image available"
    }"/>
                <h2 class="article-title">${
                  article.description || "No description available"
                }</h2>
                
                <p class="article-content">${
                  articleContent || "No content available"
                }</p>
                <a href="${article.url}" target="_blank">Read More</a>
                <hr>
            </div>
        `;
  });
};

const updatePagination = (page, totalPages) => {
  document.getElementById(
    "page-info"
  ).innerText = `Page ${page} of ${totalPages}`;
  document.getElementById("prev-btn").disabled = page === 1;
  document.getElementById("next-btn").disabled = page === totalPages;
};

export const updateSearchQuery = (query) => {
  state.searchQuery = query;
  state.currentPage = 1;
  fetchArticles(query, state.currentPage);
};

function getFormattedDate() {
  const now = new Date("2025-03-25T12:52");
  return now.toISOString().split("T")[0];
}
getFormattedDate();
