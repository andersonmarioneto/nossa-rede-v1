"use client";
import Navigation from "./Navigation";

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md z-50">
      <Navigation />
    </nav>
  );
}