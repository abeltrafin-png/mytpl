"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  { id: "profil", label: "Profil", href: "/profil" },
  { id: "akademik", label: "Akademik", href: "/akademik" },
  { id: "mahasiswa", label: "Mahasiswa", href: "/mahasiswa" },
  { id: "riset-pkm", label: "Riset & PKM", href: "/riset-pkm" },
  {
    id: "informasi",
    label: "Informasi",
    href: "#",
    submenu: [
      { label: "Berita", href: "/berita" },
      { label: "Pengumuman", href: "/pengumuman" },
      { label: "Agenda", href: "/agenda" },
    ],
  },
  { id: "peraturan", label: "Peraturan", href: "/peraturan" },
  { id: "alumni", label: "Alumni", href: "/alumni" },
  { id: "pmb", label: "PMB", href: "/pmb" },
];

function CurrentTime() {
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return <></>;

  return <>{time}</>;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<null | string>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Timestamp bar above navbar */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900 text-white text-center py-1 text-sm font-mono z-50 select-none">
        {mounted ? <CurrentTime /> : null}
      </div>

      {/* Padding for fixed timestamp */}
      <div className="h-6" />

      <nav className="fixed top-6 left-0 right-0 backdrop-blur bg-white/95 shadow-md z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo on top left */}
        <div
          className="text-2xl font-bold text-gray-800 cursor-pointer relative select-none"
          onClick={() =>
            setDropdownOpen(dropdownOpen === "home" ? null : "home")
          }
        >
          MyTPL
          {dropdownOpen === "home" && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-md shadow-lg z-50 w-32">
              <Link
                href="/"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setDropdownOpen(null)}
              >
                Beranda
              </Link>
            </div>
          )}
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) =>
            item.submenu ? (
              <div key={item.id} className="relative">
                <button
                  onClick={() =>
                    setDropdownOpen(dropdownOpen === item.id ? null : item.id)
                  }
                  className="text-lg font-semibold text-gray-800 hover:text-gray-900 transition-colors relative group flex items-center"
                >
                  {item.label}
                  <ChevronDown size={16} className="ml-1" />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
                </button>
                {dropdownOpen === item.id && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(null)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.id}
                href={item.href}
                className="text-lg font-semibold text-gray-800 hover:text-gray-900 transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          )}
        </div>

        {/* Hamburger button for mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden backdrop-blur bg-white/95 shadow-md animate-slide-down mt-16">
          <div className="flex flex-col space-y-4 p-6">
            {navItems.map((item) =>
              item.submenu ? (
                <div key={item.id}>
                  <button
                    onClick={() =>
                      setDropdownOpen(dropdownOpen === item.id ? null : item.id)
                    }
                    className="text-lg font-medium text-gray-800 hover:text-gray-900 transition-colors flex items-center"
                  >
                    {item.label}
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                  {dropdownOpen === item.id && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => {
                            setIsOpen(false);
                            setDropdownOpen(null);
                          }}
                          className="block text-gray-800 hover:text-gray-900"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-gray-800 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}