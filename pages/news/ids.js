import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const NewsDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?from=${id}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
        );
        setArticle(response.data.articles[0]);
      } catch (err) {
        setError("Failed to load news article.");
      }
    };

    fetchArticle();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!article) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <img src={article.urlToImage} alt={article.title} className="w-full h-64 object-cover my-4 rounded" />
      <p className="text-gray-700">{article.content}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
        Read Full Article
      </a>
    </div>
  );
};

export default NewsDetailPage;
