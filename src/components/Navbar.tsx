"use client";
import { useTheme } from 'next-themes';
import React from 'react'
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {

  const { theme, setTheme } = useTheme();

  return (
    <div className="sticky top-0 flex gap-0 items-center bg-white dark:bg-black p-2 z-10">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="p-2 rounded-full"
      >
        <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
        <Moon className="hidden h-5 w-5 dark:block" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <Link
        href={"/"}
        className="hover:no-underline font-extrabold text-2xl transition-all duration-200 m-0 p-0 ml-3"
      >
        Good
        <span className="bg-gradient-to-r dark:from-red-400 dark:to-pink-500 bg-clip-text text-transparent from-cyan-600 to-blue-600 m-0 p-0">
          Search
        </span>
        .
      </Link>
    </div>
  );
}

export default Navbar