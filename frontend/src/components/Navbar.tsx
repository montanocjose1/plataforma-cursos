import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Atom, User, BookOpen } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 glass-panel border-b-0 border-x-0 rounded-none px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary-400 font-bold text-xl tracking-tight">
          <Atom className="w-6 h-6 animate-pulse" />
          <span>ANTIGRAVITY</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/courses" className="text-dark-300 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
            <BookOpen className="w-4 h-4" />
            Courses
          </Link>
          <div className="w-px h-6 bg-dark-700"></div>
          <Link to="/login" className="text-dark-300 hover:text-white transition-colors text-sm font-medium">
            Login
          </Link>
          <Link to="/register" className="btn-primary text-sm">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
