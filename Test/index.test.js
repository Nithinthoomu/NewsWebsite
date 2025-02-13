import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import HomePage from "../pages/index";
import axios from "axios";

jest.mock("axios");

// Suppress console.error logs for API error tests
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {}); // Silence console.error
});

afterAll(() => {
  console.error.mockRestore(); // Restore console.error after tests
});

test("fetches and displays news", async () => {
  axios.get.mockResolvedValue({
    data: { articles: [{ title: "Test News" }], totalResults: 1 },
  });

  await act(async () => {
    render(<HomePage />);
  });

  await waitFor(() => {
    expect(screen.getByText("Test News")).toBeInTheDocument();
  });
});

test("handles API error", async () => {
  axios.get.mockRejectedValue(new Error("API Error")); // Mock API failure

  await act(async () => {
    render(<HomePage />);
  });

  await waitFor(() => {
    expect(screen.getByText("Failed to load news.")).toBeInTheDocument();
  });
});
