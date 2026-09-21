import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from '../router';

interface HeaderProps {
  onStartProject?: () => void;
  isCircuitShaderActive: boolean;
  onToggleCircuitShader?: () => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onStartProject,
  isCircuitShaderActive,
  activeSection,
}) => {
  const { path, navigate } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Lock body scroll when navigation menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const navItems = [
    { num: '01', label: 'HOME', href: '/' },
    { num: '02', label: 'WORKS', href: '/works' },
    { num: '03', label: 'SERVICES', href: '/services' },
    { num: '04', label: 'ABOUT', href: '/about' },
  ];

  const handleItemClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    e.preventDefault();
    handleClose();
    navigate(item.href);
  };

  return (
    <>
      {/* Closed / Default Header */}
      <header
        id="desktop-header"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isCircuitShaderActive
            ? 'bg-[#0a0a0a]/90 text-white border-b border-[#b9e86a]/20 backdrop-blur-md'
            : 'bg-[#f9faf7]/90 text-[#191c1b] border-b border-[#c4c7c7]/30 backdrop-blur-md'
          }`}
      >
        <div className="flex justify-between items-center w-full px-6 md:px-16 py-4 max-w-[1440px] mx-auto">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className={`font-display-tech text-2xl font-bold tracking-tight transition-opacity duration-300 hover:opacity-80 flex items-center gap-2 ${isCircuitShaderActive ? 'text-white' : 'text-[#000000]'
              }`}
            id="header-logo"
          >
            <span className="w-2.5 h-2.5 bg-[#c8f179] rounded-sm inline-block shadow-[0_0_10px_#c8f179]"></span>
            <span>Cosmic Circuit</span>
          </a>

          {/* Top-Right Area: Hamburger menu button ONLY */}
          <div className="flex items-center">
            <button
              onClick={handleOpen}
              className={`p-2.5 rounded-lg border transition-all duration-200 shadow-xs hover:-translate-y-0.5 hover:shadow-sm ${isCircuitShaderActive
                  ? 'border-neutral-700 bg-neutral-900/80 text-white hover:border-[#c8f179] hover:bg-[#c8f179]/10'
                  : 'border-[#c4c7c7]/70 bg-white/90 text-[#191c1b] hover:border-[#c8f179] hover:bg-[#c8f179]/15 hover:text-[#284200]'
                }`}
              aria-label="Open navigation menu"
              id="menu-trigger-btn"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Opened Navigation Overlay (Desktop & Mobile) */}
      {isOpen && (
        <div
          id="cosmic-navigation-overlay"
          className={`fixed inset-0 z-[100] bg-[#f9faf7] text-[#191c1b] flex flex-col justify-between overflow-y-auto ${isClosing ? 'animate-menu-out' : 'animate-menu-in'
            }`}
        >
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 py-6 md:py-8 flex flex-col justify-between min-h-screen">
            {/* Top: Brand and Close Button */}
            <div className="flex justify-between items-center border-b border-[#c4c7c7]/30 pb-5">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                  navigate('/');
                }}
                className="font-display-tech text-2xl font-bold tracking-tight text-[#000000] flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <span className="w-2.5 h-2.5 bg-[#c8f179] rounded-sm inline-block shadow-[0_0_10px_#c8f179]"></span>
                <span>Cosmic Circuit</span>
              </a>

              <button
                onClick={handleClose}
                className="p-2.5 rounded-lg border border-[#c4c7c7]/70 bg-white/90 text-[#191c1b] hover:border-[#c8f179] hover:bg-[#c8f179]/15 hover:text-[#284200] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                aria-label="Close navigation menu"
                id="menu-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Center: Numbered Navigation Items */}
            <nav className="my-auto py-10 md:py-16 flex flex-col gap-2 sm:gap-3 max-w-2xl" id="nav-items-container">
              {navItems.map((item, index) => {
                const isActive = item.href === '/' ? path === '/' || path === '' : path.startsWith(item.href);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleItemClick(e, item)}
                    className={`group relative flex items-baseline gap-4 sm:gap-6 py-3 sm:py-4 px-3 sm:px-5 rounded-xl transition-all duration-200 cursor-pointer w-full text-left hover:bg-[#f3f4f1]/70 active:bg-[#edeeeb] active:translate-x-1 animate-nav-item-${index}`}
                  >
                    {/* Number: Small and Light Green */}
                    <span
                      className={`font-mono-tech text-sm sm:text-base font-semibold tracking-wider transition-colors duration-200 w-7 sm:w-8 animate-number-${index} ${
                        isActive
                          ? 'text-[#476800] font-bold'
                          : 'text-[#74a81e] group-hover:text-[#476800]'
                      }`}
                    >
                      {item.num}
                    </span>

                    {/* Label: Large, Bold, Black Typography with Hover Movement & Thin Underline */}
                    <span className="relative inline-block">
                      <span className="font-display-tech text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#000000] inline-block transition-transform duration-200 group-hover:translate-x-2.5">
                        {item.label}
                      </span>
                      {/* Thin Light-Green Underline on Hover or Active */}
                      <span className={`absolute bottom-0.5 left-0 w-full h-[2px] bg-[#c8f179] transition-transform duration-200 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`} />
                    </span>
                  </a>
                );
              })}
            </nav>

            {/* Bottom: Brand Statement Quote */}
            <div className="pt-8 border-t border-[#c4c7c7]/30 animate-quote-in">
              <blockquote className="font-display-tech text-base sm:text-lg md:text-xl text-[#444748] font-normal leading-relaxed max-w-2xl">
                <span className="text-[#74a81e] font-serif text-2xl md:text-3xl leading-none select-none mr-1">“</span>
                We turn ideas into intelligent, engineered products that make an impact.
                <span className="text-[#74a81e] font-serif text-2xl md:text-3xl leading-none select-none ml-1">”</span>
              </blockquote>
              <p className="font-mono-tech text-xs sm:text-sm font-semibold text-[#191c1b] mt-3 flex items-center gap-2">
                <span className="w-3.5 h-[2px] bg-[#c8f179]"></span>
                <span>— Cosmic Circuit</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

