"use client";
import Link from "next/link";
import { AudioWaveform, LogOut, Menu, MessageCircle, X } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import { SignInButton } from "./auth/sign-in-button";
import { useState } from "react";
import { Button } from "./ui/button";
import { useSession } from "@/lib/contexts/session-context";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, isAuthenticated } = useSession();

  const pathname = usePathname();

  const router = useRouter();

  const navItems = [
    { href: "/features", label: "Features" },
    { href: "/about", label: "About" },
  ];

  const handleStartChat = () => {
    if (pathname.includes("therapy")) {
      router.push("/dashboard");
    } else {
      router.push("/therapy/new");
    }
  };

  const onButtonClick = () => {
    setIsMenuOpen(false);
    logout();
  };
  return (
    <div className="w-full fixed top-0 z-50 bg-background/95 backdrop-blur">
      <div className="absolute inset-0 border-b border-primary/10"></div>
      <header className="relative max-w-6xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 transition-opacity hover:opacity-80"
          >
            <AudioWaveform className="h-7 w-7 text-primary animate-pulse-gentle" />
            <div className="flex flex-col">
              <span className="text-lg semi-bold bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
                Aura3.0
              </span>
            </div>
          </Link>

          {/* navitems */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  </Link>
                );
              })}
            </nav>
            {/* toggle and signin button */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {isAuthenticated ? (
                <>
                  <Button
                    className="hidden flex gap-2 bg-primary/90 hover:bg-primary"
                    onClick={handleStartChat}
                  >
                    {pathname.includes("therapy") ? (
                      "Dashboard"
                    ) : (
                      <>
                        <MessageCircle className="w-4 h-4 mr-1" /> Start Chat
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="text-muted-foreground hover:text-foreground transition-colors hidden md:flex"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </Button>
                </>
              ) : (
                <SignInButton />
              )}

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-primary/10">
            <nav className="flex flex-col space-y-1 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {isAuthenticated && (
                <Button
                  className="flex gap-2 bg-primary/90 hover:bg-primary"
                  onClick={onButtonClick}
                >
                  logout
                </Button>
              )}
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
