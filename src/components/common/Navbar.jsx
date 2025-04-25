import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Sparkles, ShoppingBag, LogIn, LogOut, User } from "lucide-react";
import { Tooltip } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", icon: <Home size={24} />, label: "Home" },
    {
      path: "/ai-recommendations",
      icon: <Sparkles size={24} />,
      label: "AI Recommendations",
      protected: true,
    },
    {
      path: "/shop",
      icon: <ShoppingBag size={24} />,
      label: "Shop",
      protected: false,
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-soft sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.svg"
              alt="Jild Logo"
              className="h-8 w-auto" // Adjust height as needed
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Tooltip
                  key={link.path}
                  title={link.label}
                  arrow
                  placement="bottom"
                >
                  <Link
                    to={link.protected && !user ? "/sign-in" : link.path}
                    className={`transition-all duration-300 ${
                      isActive(link.path)
                        ? "text-primary"
                        : "text-neutral-500 hover:text-primary"
                    }`}
                  >
                    {link.icon}
                  </Link>
                </Tooltip>
              ))}
            </div>

            <div className="h-8 w-px bg-neutral-200"></div>

            {user ? (
              <div className="flex items-center space-x-4">
                <Tooltip title="Profile" arrow placement="bottom">
                  <Link
                    to="/profile"
                    className="text-neutral-500 hover:text-primary transition-all duration-300"
                  >
                    <User size={24} />
                  </Link>
                </Tooltip>
                <Tooltip title="Sign Out" arrow placement="bottom">
                  <button
                    onClick={handleSignOut}
                    className="text-neutral-500 hover:text-primary transition-all duration-300"
                  >
                    <LogOut size={24} />
                  </button>
                </Tooltip>
              </div>
            ) : (
              <Tooltip title="Sign In" arrow placement="bottom">
                <Link
                  to="/sign-in"
                  className="text-neutral-500 hover:text-primary transition-all duration-300"
                >
                  <LogIn size={24} />
                </Link>
              </Tooltip>
            )}
          </nav>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden text-neutral-500 hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="mt-4 pb-2 md:hidden">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.protected && !user ? "/sign-in" : link.path}
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ${
                    isActive(link.path)
                      ? "bg-primary-bg text-primary"
                      : "text-neutral-500 hover:bg-primary-bg hover:text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}

              <div className="h-px w-full bg-neutral-200 my-1"></div>

              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 p-2 rounded-lg text-neutral-500 hover:bg-primary-bg hover:text-primary transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={24} />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 p-2 rounded-lg text-neutral-500 hover:bg-primary-bg hover:text-primary transition-all duration-300"
                  >
                    <LogOut size={24} />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/sign-in"
                  className="flex items-center space-x-3 p-2 rounded-lg text-neutral-500 hover:bg-primary-bg hover:text-primary transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn size={24} />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
