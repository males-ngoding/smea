"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-scroll";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

// ============ TYPES ============
interface NavItem {
  id: string;
  label: string;
}

// ============ CONSTANTS ============
const NAV_ITEMS: NavItem[] = [
  { id: "jurusan", label: "Jurusan" },
  { id: "ekstrakulikuler", label: "Ekstrakulikuler" },
  { id: "berita", label: "Berita" },
  { id: "kontak", label: "Kontak" },
];

const PROFIL_ITEMS: NavItem[] = [
  { id: "sejarah", label: "Sejarah Singkat" },
  { id: "visi-misi", label: "Visi & Misi" },
  { id: "identitas", label: "Identitas Sekolah" },
];

// Semua section IDs untuk scroll detection
const ALL_SECTIONS = [
  "home",
  ...PROFIL_ITEMS.map((item) => item.id),
  ...NAV_ITEMS.map((item) => item.id),
];

const SCROLL_CONFIG = {
  smooth: true,
  duration: 500,
  offset: -80,
};

const SCROLL_OFFSET = 100;

// ============ HOOKS ============
function useActiveSection(sections: string[]) {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + SCROLL_OFFSET;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return { activeSection, setActiveSection };
}

function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
}

// ============ HELPER FUNCTIONS ============
const getNavClass = (isActive: boolean) =>
  `px-4 py-2 rounded-lg transition-colors cursor-pointer ${
    isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-100"
  }`;

// ============ COMPONENTS ============
interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

function NavLink({ item, isActive, onClick, className }: NavLinkProps) {
  return (
    <Link
      to={item.id}
      {...SCROLL_CONFIG}
      onClick={onClick}
      className={className || getNavClass(isActive)}
    >
      {item.label}
    </Link>
  );
}

interface DropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  items: NavItem[];
  activeSection: string;
  onItemClick: (id: string) => void;
  isParentActive: boolean;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

function ProfilDropdown({
  isOpen,
  onToggle,
  items,
  activeSection,
  onItemClick,
  isParentActive,
  dropdownRef,
}: DropdownProps) {
  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={onToggle}
        className={`${getNavClass(isParentActive)} flex items-center space-x-1`}
      >
        <span>Profil</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
          {items.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              {...SCROLL_CONFIG}
              onClick={() => onItemClick(item.id)}
              className={`block w-full text-left px-4 py-2 transition-colors cursor-pointer ${
                activeSection === item.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ============ MAIN COMPONENT ============
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfilOpen, setIsProfilOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { activeSection, setActiveSection } = useActiveSection(ALL_SECTIONS);

  const isProfilActive = PROFIL_ITEMS.some((item) => item.id === activeSection);

  // Close dropdown when clicking outside
  useClickOutside(dropdownRef, () => setIsProfilOpen(false));

  const handleNavClick = useCallback(
    (sectionId: string) => {
      setActiveSection(sectionId);
      setIsMenuOpen(false);
      setIsProfilOpen(false);
    },
    [setActiveSection],
  );

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleProfil = () => setIsProfilOpen((prev) => !prev);

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={50}
                height={50}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                SMKS YP 17 CILEGON
              </h1>
              <p className="text-xs text-gray-600">Unggul dalam Prestasi</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="home"
              {...SCROLL_CONFIG}
              onClick={() => handleNavClick("home")}
              className={getNavClass(activeSection === "home")}
            >
              Home
            </Link>

            <ProfilDropdown
              isOpen={isProfilOpen}
              onToggle={toggleProfil}
              onClose={() => setIsProfilOpen(false)}
              items={PROFIL_ITEMS}
              activeSection={activeSection}
              onItemClick={handleNavClick}
              isParentActive={isProfilActive}
              dropdownRef={dropdownRef}
            />

            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                item={item}
                isActive={activeSection === item.id}
                onClick={() => handleNavClick(item.id)}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-1">
            <Link
              to="home"
              {...SCROLL_CONFIG}
              onClick={() => handleNavClick("home")}
              className="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 cursor-pointer"
            >
              Home
            </Link>

            {/* Mobile Profil Dropdown */}
            <div>
              <button
                onClick={toggleProfil}
                className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 flex justify-between items-center"
              >
                <span>Profil</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isProfilOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProfilOpen && (
                <div className="ml-4 mt-1 space-y-1">
                  {PROFIL_ITEMS.map((item) => (
                    <Link
                      key={item.id}
                      to={item.id}
                      {...SCROLL_CONFIG}
                      onClick={() => handleNavClick(item.id)}
                      className={`block w-full text-left px-4 py-2 rounded-lg cursor-pointer ${
                        activeSection === item.id
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-blue-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Nav Items */}
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                {...SCROLL_CONFIG}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg cursor-pointer ${
                  activeSection === item.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
