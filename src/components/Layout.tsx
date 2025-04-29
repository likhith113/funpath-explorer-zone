
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home,
  BookOpen,
  Image,
  BookText, // Replacing FlashCard with BookText
  LogIn,
  UserPlus,
  Menu,
  X,
  MessageCircle // Replacing Telegram with MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Concepts', href: '/concepts', icon: <BookOpen className="h-5 w-5" /> },
    { name: 'Memes', href: '/memes', icon: <Image className="h-5 w-5" /> },
    { name: 'Telegram', href: '/telegram', icon: <MessageCircle className="h-5 w-5" /> },
    { name: 'Flashcards', href: '/flashcards', icon: <BookText className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-funpath-purple to-funpath-blue bg-clip-text text-transparent">FunPath</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Login</DialogTitle>
                  <DialogDescription>
                    This is a placeholder login modal. No actual login happens.
                  </DialogDescription>
                </DialogHeader>
                <div className="p-4">
                  <p className="mb-4">Please use the Login page for a more detailed experience.</p>
                  <div className="flex justify-end">
                    <Button asChild>
                      <Link to="/login" onClick={() => setLoginOpen(false)}>
                        Go to Login Page
                      </Link>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign Up</DialogTitle>
                  <DialogDescription>
                    This is a placeholder signup modal. No actual registration happens.
                  </DialogDescription>
                </DialogHeader>
                <div className="p-4">
                  <p className="mb-4">Please use the Sign Up page for a more detailed experience.</p>
                  <div className="flex justify-end">
                    <Button asChild>
                      <Link to="/signup" onClick={() => setSignupOpen(false)}>
                        Go to Sign Up Page
                      </Link>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-6 bg-background border-t">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-2 text-sm font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Link 
                  to="/login"
                  className="flex items-center gap-2 text-sm font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn className="h-5 w-5" />
                  Login
                </Link>
                <Link 
                  to="/signup"
                  className="flex items-center gap-2 text-sm font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserPlus className="h-5 w-5" />
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-semibold bg-gradient-to-r from-funpath-purple to-funpath-blue bg-clip-text text-transparent">FunPath</span>
            <span>© {new Date().getFullYear()} - Learn Data Science the Fun Way!</span>
          </div>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/concepts" className="hover:text-foreground transition-colors">Concepts</Link>
            <Link to="/telegram" className="hover:text-foreground transition-colors">Join Telegram</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
