import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Cpu, BrainCircuit } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-dark-950 to-dark-950"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            New Course: Genetic Algorithms 1
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-500">Future</span> of Code
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-dark-300 max-w-2xl mb-10"
          >
            Professional online learning platform featuring interactive simulators, embedded code environments, and cutting-edge curriculum.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/courses" className="btn-primary text-lg flex items-center gap-2">
              Explore Courses <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/simulator/demo" className="btn-secondary text-lg flex items-center gap-2">
              <Cpu className="w-5 h-5" /> Try Simulator
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-dark-800 bg-dark-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-panel p-8">
              <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center mb-6 border border-primary-500/20">
                <BrainCircuit className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI & Algorithms</h3>
              <p className="text-dark-400">Dive deep into genetic algorithms, neural networks, and modern AI paradigms.</p>
            </div>
            <div className="glass-panel p-8">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                <Code2 className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive IDE</h3>
              <p className="text-dark-400">Write, test, and execute Python code directly in your browser with our integrated Monaco Editor.</p>
            </div>
            <div className="glass-panel p-8">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20">
                <Cpu className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visual Simulators</h3>
              <p className="text-dark-400">Watch your algorithms evolve in real-time with our dynamic, interactive visualization tools.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
