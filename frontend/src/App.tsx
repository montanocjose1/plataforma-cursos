import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';

const Courses = () => (
  <div className="p-8 text-center mt-20">
    <h1 className="text-3xl font-bold mb-4">Available Courses</h1>
    <p className="text-dark-300">Click below to view the demo course.</p>
    <a href="/course/1" className="inline-block mt-6 btn-primary">Go to Genetic Algorithms</a>
  </div>
);

const Login = () => <div className="p-8 text-center mt-20"><h1 className="text-3xl font-bold">Login</h1></div>;
const Register = () => <div className="p-8 text-center mt-20"><h1 className="text-3xl font-bold">Register</h1></div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-dark-950 text-dark-50 font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/simulator/demo" element={<CourseDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
