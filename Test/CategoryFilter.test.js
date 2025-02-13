import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CategoryFilter from "../components/CategoryFilter"; 

describe("CategoryFilter Component", () => {
  const mockOnCategoryChange = jest.fn();
  const categories = [
    "General",
    "Business",
    "Technology",
    "Sports",
    "Entertainment",
    "Health",
    "Science",
  ];

  test("renders all categories correctly", () => {
    render(<CategoryFilter selectedCategory="General" onCategoryChange={mockOnCategoryChange} />);
    
    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  test("highlights the selected category", () => {
    render(<CategoryFilter selectedCategory="Technology" onCategoryChange={mockOnCategoryChange} />);

    const selectedButton = screen.getByText("Technology");
    expect(selectedButton).toHaveClass("bg-blue-600 text-white");
  });

  test("calls onCategoryChange when a category is clicked", () => {
    render(<CategoryFilter selectedCategory="General" onCategoryChange={mockOnCategoryChange} />);

    const categoryButton = screen.getByText("Sports");
    fireEvent.click(categoryButton);

    expect(mockOnCategoryChange).toHaveBeenCalledTimes(1);
    expect(mockOnCategoryChange).toHaveBeenCalledWith("Sports");
  });
});
