import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, User as UserIcon, ClipboardList } from 'lucide-react';
import { useRouter } from '../router';
import { useAuth } from '../lib/AuthContext';

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
  const { user, isAdmin, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleSignOut = async () => {
    handleClose();
    await signOut();
    navigate('/login');
  };

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
    ...(user ? [{ num: '05', label: 'MY REQUESTS', href: '/my-requests' }] : []),
    ...(isAdmin ? [{ num: user ? '06' : '05', label: 'ADMIN', href: '/admin' }] : []),
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

          {/* Top-Right Area: User actions and menu button */}
          <div className="flex items-center gap-2.5">
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/my-requests')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono-tech text-xs font-bold transition-all duration-200 shadow-xs hover:-translate-y-0.5 cursor-pointer ${
                    path === '/my-requests'
                      ? 'bg-black text-[#c8f179] border-black shadow-[0_0_10px_rgba(200,241,121,0.25)]'
                      : isCircuitShaderActive
                      ? 'border-neutral-700 bg-neutral-900/80 text-neutral-200 hover:border-[#c8f179] hover:text-[#c8f179]'
                      : 'border-[#c4c7c7]/80 bg-white/95 text-[#191c1b] hover:border-black hover:text-black'
                  }`}
                  title="View your submitted project requests and progress"
                >
                  <ClipboardList className="w-3.5 h-3.5 text-[#476800]" />
                  <span className="hidden sm:inline">MY REQUESTS</span>
                </button>

                <button
                  onClick={() => navigate('/my-requests')}
                  className="cursor-pointer focus:outline-none"
                  title={`Signed in as ${user.email || 'User'} - click to view My Requests`}
                >
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt={user.user_metadata.full_name || user.email || 'User'}
                      className="w-8 h-8 rounded-lg object-cover border border-[#c8f179]/60 shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div
                      className={`w-8 h-8 rounded-lg border flex items-center justify-center font-mono-tech text-xs font-bold ${
                        isCircuitShaderActive
                          ? 'border-neutral-800 bg-neutral-900 text-[#c8f179]'
                          : 'border-[#c4c7c7] bg-white text-[#476800]'
                      }`}
                    >
                      {(user.email?.[0] || 'U').toUpperCase()}
                    </div>
                  )}
                </button>

                <button
                  onClick={handleSignOut}
                  title={`Sign out (${user.email || 'User'})`}
                  className={`p-2 rounded-lg border transition-all duration-200 shadow-xs hover:-translate-y-0.5 cursor-pointer ${
                    isCircuitShaderActive
                      ? 'border-neutral-800 bg-neutral-900/80 text-neutral-400 hover:text-white hover:border-neutral-600'
                      : 'border-[#c4c7c7]/60 bg-white/80 text-[#444748] hover:text-black hover:border-black'
                  }`}
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono-tech text-xs font-bold transition-all duration-200 shadow-xs hover:-translate-y-0.5 cursor-pointer ${
                  isCircuitShaderActive
                    ? 'border-neutral-700 bg-neutral-900/80 text-neutral-200 hover:border-[#c8f179] hover:text-[#c8f179]'
                    : 'border-[#c4c7c7]/70 bg-white/90 text-[#191c1b] hover:border-black hover:text-black'
                }`}
                title="Sign in with Google"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#476800]" />
                <span className="hidden sm:inline">LOGIN</span>
              </button>
            )}

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

            {/* Bottom: Brand Statement Quote & Sign Out */}
            <div className="pt-8 border-t border-[#c4c7c7]/30 flex flex-col sm:flex-row sm:items-end justify-between gap-4 animate-quote-in">
              <div>
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

              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {user.user_metadata?.avatar_url && (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="User"
                        className="w-7 h-7 rounded-md object-cover border border-[#c8f179]/60"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <span className="font-mono-tech text-xs text-neutral-600 hidden sm:inline">
                      {user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="inline-flex items-center gap-2 font-mono-tech text-xs font-bold text-neutral-600 hover:text-black py-2 px-3.5 rounded-lg border border-[#c4c7c7]/70 bg-white hover:border-black transition-colors cursor-pointer shrink-0"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>SIGN OUT</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleClose();
                    navigate('/login');
                  }}
                  className="inline-flex items-center gap-2 font-mono-tech text-xs font-bold text-black py-2 px-3.5 rounded-lg border border-black bg-[#c8f179] hover:bg-[#b9e86a] transition-colors cursor-pointer shrink-0"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>SIGN IN</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

