import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "../components/SearchBar"; 

describe("SearchBar Component", () => {
  test("renders input field and search button", () => {
    render(<SearchBar searchQuery="" setSearchQuery={jest.fn()} />);

    // Check if input field is present
    expect(screen.getByPlaceholderText("Search news...")).toBeInTheDocument();
    
    // Check if button is present
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("updates input value when typed", () => {
    render(<SearchBar searchQuery="" setSearchQuery={jest.fn()} />);
    
    const inputField = screen.getByPlaceholderText("Search news...");

    // Simulate user typing
    fireEvent.change(inputField, { target: { value: "Technology" } });

    expect(inputField.value).toBe("Technology");
  });

  test("calls setSearchQuery on form submit", () => {
    const setSearchQueryMock = jest.fn();
    render(<SearchBar searchQuery="" setSearchQuery={setSearchQueryMock} />);

    const inputField = screen.getByPlaceholderText("Search news...");
    const searchButton = screen.getByRole("button", { name: /search/i });

    // Simulate user input
    fireEvent.change(inputField, { target: { value: "Sports" } });

    // Simulate form submission
    fireEvent.click(searchButton);

    expect(setSearchQueryMock).toHaveBeenCalledWith("Sports");
  });
});
