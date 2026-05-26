from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from genetic_algorithm import GeneticAlgorithm
import sys
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SimConfig(BaseModel):
    population_size: int
    mutation_rate: float
    crossover_rate: float
    target: str = "ANTIGRAVITY"
    steps: int = 1

class CodeExecutionRequest(BaseModel):
    code: str

# In-memory store for simulator instances (for demo purposes)
simulators = {}

@app.post("/api/simulate/start")
def start_simulation(config: SimConfig):
    sim_id = "sim_1" # In a real app, generate a UUID per user session
    simulators[sim_id] = GeneticAlgorithm(
        population_size=config.population_size,
        mutation_rate=config.mutation_rate,
        crossover_rate=config.crossover_rate,
        target=config.target
    )
    return {"message": "Simulation started", "sim_id": sim_id}

@app.post("/api/simulate/step/{sim_id}")
def step_simulation(sim_id: str, steps: int = 1):
    if sim_id not in simulators:
        raise HTTPException(status_code=404, detail="Simulator not found")
    
    sim = simulators[sim_id]
    results = []
    for _ in range(steps):
        results.append(sim.step())
        if sim.best_fitness == 1.0:
            break
            
    return {"results": results, "finished": sim.best_fitness == 1.0}

@app.post("/api/execute")
def execute_code(req: CodeExecutionRequest):
    # WARNING: Using exec in production is highly unsafe.
    # This is only for demonstration of the online IDE requirement.
    # A real implementation would use a sandboxed Docker container or WebAssembly.
    old_stdout = sys.stdout
    redirected_output = sys.stdout = io.StringIO()
    
    try:
        exec(req.code, {})
        output = redirected_output.getvalue()
    except Exception as e:
        output = str(e)
    finally:
        sys.stdout = old_stdout
        
    return {"output": output}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
