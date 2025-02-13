import React from "react"; // Ensure React is imported
import { render, screen, waitFor, act } from "@testing-library/react";
import axios from "axios";
import NewsDetailPage from "../pages/news/ids"; // Adjust path if needed
import { useRouter } from "next/router";

// Mock the router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Mock Axios
jest.mock("axios");

describe("NewsDetailPage", () => {
  beforeEach(() => {
    useRouter.mockReturnValue({ query: { id: "123" } });
  });

  it("displays an error message when API call fails", async () => {
    axios.get.mockRejectedValue(new Error("API Error"));

    await act(async () => {
      render(<NewsDetailPage />);
    });

    await waitFor(() => {
      expect(screen.getByText(/failed to load news article/i)).toBeInTheDocument();
    });
  });

  it("renders the news article correctly on successful API call", async () => {
    const mockArticle = {
      title: "Test News Article",
      urlToImage: "https://example.com/image.jpg",
      content: "This is a test content.",
      url: "https://example.com",
    };

    axios.get.mockResolvedValue({
      data: { articles: [mockArticle] },
    });

    await act(async () => {
      render(<NewsDetailPage />);
    });

    await waitFor(() => {
      expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
      expect(screen.getByText(mockArticle.content)).toBeInTheDocument();
      expect(screen.getByText("Read Full Article")).toBeInTheDocument();
    });
  });
});
