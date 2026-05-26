import random

class GeneticAlgorithm:
    def __init__(self, population_size, mutation_rate, crossover_rate, target="ANTIGRAVITY"):
        self.population_size = population_size
        self.mutation_rate = mutation_rate
        self.crossover_rate = crossover_rate
        self.target = target
        self.genes = "ABCDEFGHIJKLMNOPQRSTUVWXYZ "
        self.population = self._initialize_population()
        self.generation = 0
        self.best_fitness = 0
        self.best_individual = ""

    def _initialize_population(self):
        return ["".join(random.choice(self.genes) for _ in range(len(self.target))) for _ in range(self.population_size)]

    def _calculate_fitness(self, individual):
        score = sum(1 for a, b in zip(individual, self.target) if a == b)
        return score / len(self.target)

    def _select(self, population_fitness):
        # Tournament selection
        tournament = random.sample(population_fitness, 3)
        return max(tournament, key=lambda x: x[1])[0]

    def _crossover(self, parent1, parent2):
        if random.random() < self.crossover_rate:
            point = random.randint(1, len(self.target) - 1)
            child1 = parent1[:point] + parent2[point:]
            child2 = parent2[:point] + parent1[point:]
            return child1, child2
        return parent1, parent2

    def _mutate(self, individual):
        individual_list = list(individual)
        for i in range(len(individual_list)):
            if random.random() < self.mutation_rate:
                individual_list[i] = random.choice(self.genes)
        return "".join(individual_list)

    def step(self):
        population_fitness = [(ind, self._calculate_fitness(ind)) for ind in self.population]
        
        # Track best
        current_best = max(population_fitness, key=lambda x: x[1])
        if current_best[1] > self.best_fitness:
            self.best_fitness = current_best[1]
            self.best_individual = current_best[0]

        new_population = []
        while len(new_population) < self.population_size:
            parent1 = self._select(population_fitness)
            parent2 = self._select(population_fitness)
            
            child1, child2 = self._crossover(parent1, parent2)
            
            child1 = self._mutate(child1)
            child2 = self._mutate(child2)
            
            new_population.extend([child1, child2])

        self.population = new_population[:self.population_size]
        self.generation += 1

        return {
            "generation": self.generation,
            "best_individual": self.best_individual,
            "best_fitness": self.best_fitness,
            "average_fitness": sum(f for _, f in population_fitness) / self.population_size
        }
