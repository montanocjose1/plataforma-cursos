import { useState } from 'react';
import { PlayCircle, FileText, Code2, Cpu, CheckCircle } from 'lucide-react';
import CodeEditor from '../components/CodeEditor';
import SimulatorVis from '../components/SimulatorVis';

const chapters = [
  { id: 1, title: 'Introducción a los Algoritmos Genéticos', type: 'video' },
  { id: 2, title: 'Fundamentos de Evolución Artificial', type: 'text' },
  { id: 3, title: 'Representación de Cromosomas', type: 'code' },
  { id: 4, title: 'Función Fitness', type: 'code' },
  { id: 5, title: 'Selección Natural', type: 'text' },
  { id: 6, title: 'Cruce y Mutación', type: 'video' },
  { id: 7, title: 'Implementación Completa en Python', type: 'code' },
  { id: 8, title: 'Optimización de Problemas Reales', type: 'text' },
  { id: 9, title: 'Visualización de Resultados', type: 'simulator' },
  { id: 10, title: 'Proyecto Final', type: 'code' },
];

const CourseDetail = () => {
  const [activeChapter, setActiveChapter] = useState(chapters[8]); // Default to simulator chapter for demo

  const renderContent = () => {
    switch (activeChapter.type) {
      case 'video':
        return (
          <div className="w-full aspect-video bg-dark-900 rounded-xl flex items-center justify-center border border-dark-700">
            <PlayCircle className="w-20 h-20 text-dark-600" />
            <span className="ml-4 text-xl text-dark-500 font-medium">Video Player Placeholder</span>
          </div>
        );
      case 'code':
        return (
          <div className="flex flex-col h-full gap-4">
            <h2 className="text-2xl font-bold">{activeChapter.title}</h2>
            <p className="text-dark-300">Completa el siguiente ejercicio en Python para avanzar.</p>
            <CodeEditor />
          </div>
        );
      case 'simulator':
        return (
          <div className="flex flex-col h-full gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{activeChapter.title}</h2>
              <p className="text-dark-300">Observa cómo evoluciona la población para alcanzar el objetivo deseado.</p>
            </div>
            <SimulatorVis />
          </div>
        );
      default:
        return (
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">{activeChapter.title}</h2>
            <p className="text-dark-300">Contenido teórico de la lección. Aquí se explicarían conceptos como la selección, mutación y cruce con diagramas e imágenes.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-[calc(100vh-73px)]">
      {/* Sidebar - Chapter List */}
      <div className="w-80 border-r border-dark-800 bg-dark-950/50 flex flex-col overflow-y-auto">
        <div className="p-6 border-b border-dark-800">
          <h1 className="font-bold text-lg mb-2">Algoritmo Genético 1 con Python</h1>
          <div className="w-full bg-dark-800 rounded-full h-2">
            <div className="bg-primary-500 h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <span className="text-xs text-dark-400 mt-2 block">45% Completado</span>
        </div>
        
        <div className="flex-1 p-4">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => setActiveChapter(chapter)}
              className={`w-full text-left p-3 rounded-lg mb-2 flex items-center gap-3 transition-colors ${
                activeChapter.id === chapter.id ? 'bg-primary-500/10 border border-primary-500/30 text-primary-400' : 'hover:bg-dark-800 text-dark-300'
              }`}
            >
              {chapter.id <= 4 ? <CheckCircle className="w-5 h-5 text-primary-500" /> : 
                chapter.type === 'video' ? <PlayCircle className="w-5 h-5" /> :
                chapter.type === 'code' ? <Code2 className="w-5 h-5" /> :
                chapter.type === 'simulator' ? <Cpu className="w-5 h-5" /> :
                <FileText className="w-5 h-5" />
              }
              <div className="flex-1">
                <div className="text-xs text-dark-500 mb-1">Capítulo {chapter.id}</div>
                <div className="font-medium text-sm leading-tight">{chapter.title}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-dark-950 p-8">
        <div className="max-w-6xl mx-auto h-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
