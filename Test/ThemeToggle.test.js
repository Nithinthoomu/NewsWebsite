import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "../components/ThemeToggle"; 

// Mock localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn();
  Storage.prototype.setItem = jest.fn();
});

describe("ThemeToggle Component", () => {
  test("renders ThemeToggle button", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("initially loads with light mode when no theme is set", () => {
    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(screen.getByText("🌙 Dark Mode")).toBeInTheDocument();
  });

  test("loads dark mode when stored in localStorage", () => {
    Storage.prototype.getItem.mockReturnValue("dark"); // Mock dark mode in localStorage
    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(screen.getByText("☀️ Light Mode")).toBeInTheDocument();
  });

  test("toggles to dark mode when clicked", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(screen.getByText("☀️ Light Mode")).toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
  });

  test("toggles to light mode when clicked again", () => {
    Storage.prototype.getItem.mockReturnValue("dark"); // Start in dark mode
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(screen.getByText("🌙 Dark Mode")).toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "light");
  });
});
