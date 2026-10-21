
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, Menu, X, ChevronDown } from "lucide-react";

// Вебийн үндсэн цэс
const menus = [
  { name: "Нүүр хуудас", href: "/" },
  { name: "Бидний тухай", href: "/about" },
  { name: "Сургалт", href: "/academics" },
  { name: "Тэнхимүүд", href: "/schools" },
  { name: "Судалгаа", href: "/research" },
  { name: "Мэдээ мэдээлэл", href: "/news" },
  { name: "Холбоо барих", href: "/contact" },
];

export default function Navbar() {
  // Одоо нээлттэй байгаа хуудасны зам
  const pathname = usePathname();

  // Гар утасны цэс нээлттэй эсэх
  const [menuOpen, setMenuOpen] = useState(false);

  // Аль цэс идэвхтэй байгааг шалгана
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav className="relative z-50 bg-gradient-to-r from-[#063789] via-[#0B459C] to-[#07347C] text-white shadow-lg">

      {/* Компьютер болон гар утасны үндсэн хэсэг */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">

        {/* Компьютерийн цэс */}
        <div className="hidden w-full items-center justify-between lg:flex">

          {menus.map((menu) => {
            const active = isActive(menu.href);

            return (
              <Link
                key={menu.href}
                href={menu.href}
                aria-current={active ? "page" : undefined}
                className={`
                  group relative flex min-h-[64px] items-center
                  justify-center gap-2 px-4 text-sm font-semibold
                  transition-all duration-300
                  ${
                    active
                      ? "bg-[#F7BC32] text-[#07347C] shadow-md"
                      : "text-white hover:bg-[#F7BC32] hover:text-[#07347C]"
                  }
                `}
              >
                {/* Нүүр хуудасны дүрс */}
                {menu.href === "/" && <Home size={18} />}

                <span>{menu.name}</span>

                {/* Идэвхтэй цэсний доод зураас */}
                {active && (
                  <span className="absolute inset-x-0 bottom-0 h-1 bg-white/80" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Гар утасны дээд мөр */}
        <div className="flex w-full items-center justify-between py-3 lg:hidden">

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 font-bold text-white"
          >
            <Home size={19} className="text-[#F7BC32]" />
            Үндсэн цэс
          </Link>

          {/* Цэс нээх, хаах товч */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Цэс хаах" : "Цэс нээх"}
            aria-expanded={menuOpen}
            className="rounded-lg border border-white/30 p-2 text-white transition hover:bg-white/10"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Гар утасны дэлгэгддэг цэс */}
      {menuOpen && (
        <div className="border-t border-white/20 bg-[#07347C] px-4 pb-4 lg:hidden">
          <div className="flex flex-col gap-1 pt-3">

            {menus.map((menu) => {
              const active = isActive(menu.href);

              return (
                <Link
                  key={menu.href}
                  href={menu.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`
                    flex items-center gap-3 rounded-lg
                    px-4 py-3 text-sm font-semibold
                    transition-colors
                    ${
                      active
                        ? "bg-[#F7BC32] text-[#07347C]"
                        : "text-white hover:bg-white/10"
                    }
                  `}
                >
                  {menu.href === "/" && <Home size={17} />}
                  {menu.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Цэсний доод алтлаг шугам */}
      <div className="h-[3px] w-full bg-[#F7BC32]" />
    </nav>
  );
}
