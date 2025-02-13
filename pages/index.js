import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import ThemeToggle from "../components/ThemeToggle";
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const PAGE_SIZE = 5; 

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    fetchNews();
  }, [category, searchQuery, page]);

  const fetchNews = async () => {
    setLoading(true);
    setError("");

    let url = `https://newsapi.org/v2/top-headlines?country=us&page=${page}&apiKey=${API_KEY}`;

    if (category && category !== "All") {
      url = `https://newsapi.org/v2/top-headlines?category=${category.toLowerCase()}&page=${page}&apiKey=${API_KEY}`;
    }

    if (searchQuery) {
      url = `https://newsapi.org/v2/everything?q=${searchQuery}&page=${page}&apiKey=${API_KEY}`;
    }
    try {
      const response = await axios.get(url);
      if (response?.data?.articles) {
        setNews(response.data.articles);
        setTotalResults(response.data.totalResults || 0);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (err) {
      if (err.response?.status === 429) {
        setError("Too many requests! Please wait before searching again.");
      } else {
        setError("Failed to load news.");
      }
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalResults / PAGE_SIZE);

  return (
    <div className="pt-20 max-w-6xl mx-auto p-3 flex flex-col min-h-screen transition-colors duration-300 dark:bg-gray-900 dark:text-white">
      {/*Navigation Bar*/}
      <nav className="bg-blue-900 p-4 text-white shadow-md w-full">
        <div className="container mx-auto flex justify-between items-center">
          <h1 id="TitleName" className="text-xl sm:text-2xl font-italic">
            People News
          </h1>
          <ul className=" md:flex space-x-6">
            <ThemeToggle />
          </ul>
        </div>
      </nav>
      {/* Main Content Area - Responsive */}
      <div className="max-w-6xl mx-auto p-4 flex flex-col items-center min-h-screen">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategoryFilter selectedCategory={category} onCategoryChange={setCategory} />
        <br />

        {loading && <p id="loader" className="text-lg font-semibold mt-4"></p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Responsive Grid for News Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {news.map((article, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded"
                />
              )}
              <h2 className="text-lg font-semibold mt-2">{article.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{article.description}</p>

              {/* News Details Link */}
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 mt-2 inline-block"
              >
                Read More
              </a>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center py-4 space-x-4 bottom-0">
          <button
            className={`px-5 py-2 rounded-lg font-semibold transition ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <button
            className={`px-5 py-2 rounded-lg font-semibold transition ${news.length === 0 || page >= totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            disabled={news.length === 0 || page >= totalPages}
            onClick={() => {
              setPage((prevPage) => {
                console.log("Next Button Clicked, Updating Page:", prevPage + 1);
                return prevPage + 1;
              });
            }}
          >
            Next
          </button>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
