import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Settings, Play, Pause, RotateCcw } from 'lucide-react';
import axios from 'axios';

const SimulatorVis = () => {
  const [data, setData] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [simId, setSimId] = useState('');
  
  // Config
  const [popSize, setPopSize] = useState(100);
  const [mutRate, setMutRate] = useState(0.01);
  const [crossRate, setCrossRate] = useState(0.8);
  const [target, setTarget] = useState('ANTIGRAVITY');
  
  const initSimulation = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/simulate/start', {
        population_size: popSize,
        mutation_rate: mutRate,
        crossover_rate: crossRate,
        target: target
      });
      setSimId(res.data.sim_id);
      setData([]);
    } catch (e) {
      console.error(e);
    }
  };

  const stepSimulation = async () => {
    if (!simId) return;
    try {
      const res = await axios.post(`http://localhost:8000/api/simulate/step/${simId}?steps=1`);
      const results = res.data.results;
      if (results && results.length > 0) {
        setData(prev => [...prev, ...results]);
        if (res.data.finished) setIsRunning(false);
      }
    } catch (e) {
      console.error(e);
      setIsRunning(false);
    }
  };

  useEffect(() => {
    let interval: any;
    if (isRunning && simId) {
      interval = setInterval(stepSimulation, 500); // Poll every 500ms
    }
    return () => clearInterval(interval);
  }, [isRunning, simId]);

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1 glass-panel p-6 flex flex-col gap-4">
        <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-primary-400" />
          Settings
        </h3>
        
        <label className="flex flex-col gap-1 text-sm text-dark-300">
          Target Word
          <input type="text" value={target} onChange={(e) => setTarget(e.target.value.toUpperCase())} className="input-field" />
        </label>
        
        <label className="flex flex-col gap-1 text-sm text-dark-300">
          Population Size: {popSize}
          <input type="range" min="10" max="1000" step="10" value={popSize} onChange={(e) => setPopSize(Number(e.target.value))} className="accent-primary-500" />
        </label>
        
        <label className="flex flex-col gap-1 text-sm text-dark-300">
          Mutation Rate: {mutRate}
          <input type="range" min="0" max="0.5" step="0.01" value={mutRate} onChange={(e) => setMutRate(Number(e.target.value))} className="accent-primary-500" />
        </label>

        <label className="flex flex-col gap-1 text-sm text-dark-300">
          Crossover Rate: {crossRate}
          <input type="range" min="0" max="1" step="0.05" value={crossRate} onChange={(e) => setCrossRate(Number(e.target.value))} className="accent-primary-500" />
        </label>
        
        <div className="flex gap-2 mt-4">
          <button 
            onClick={() => {
              if(!simId) initSimulation().then(() => setIsRunning(true));
              else setIsRunning(!isRunning);
            }} 
            className="btn-primary flex-1 flex justify-center items-center gap-2"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button onClick={() => { setIsRunning(false); initSimulation(); }} className="btn-secondary px-3">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="lg:col-span-3 flex flex-col gap-6">
        <div className="glass-panel p-6 flex flex-wrap justify-between items-center">
          <div>
            <div className="text-sm text-dark-400">Generation</div>
            <div className="text-3xl font-mono text-white">{data.length > 0 ? data[data.length-1].generation : 0}</div>
          </div>
          <div>
            <div className="text-sm text-dark-400">Best Fitness</div>
            <div className="text-3xl font-mono text-primary-400">
              {data.length > 0 ? (data[data.length-1].best_fitness * 100).toFixed(1) : 0}%
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-dark-400">Best Individual</div>
            <div className="text-2xl font-mono tracking-widest text-white border border-dark-700 px-4 py-2 rounded bg-dark-900 mt-1">
              {data.length > 0 ? data[data.length-1].best_individual : '-'.repeat(target.length)}
            </div>
          </div>
        </div>
        
        <div className="glass-panel p-6 h-[400px]">
          <h4 className="text-dark-300 font-medium mb-4">Fitness Evolution</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="generation" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={[0, 1]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                itemStyle={{ color: '#2dd4bf' }}
              />
              <Line type="monotone" dataKey="best_fitness" stroke="#2dd4bf" strokeWidth={2} dot={false} name="Best Fitness" />
              <Line type="monotone" dataKey="average_fitness" stroke="#64748b" strokeWidth={2} dot={false} name="Avg Fitness" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SimulatorVis;
