# Antigravity Courses Platform

A professional, modern, and futuristic platform for offering online courses, featuring an integrated Genetic Algorithm simulator and an online Python code editor.

## Features
- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express + MongoDB
- **Simulator API**: Python + FastAPI
- **Online IDE**: Monaco Editor integration
- **Visualizations**: Recharts for real-time genetic algorithm evolution tracking

## Project Structure
- `/frontend` - React application
- `/backend` - Node.js Express server
- `/simulator-api` - Python FastAPI for the genetic algorithm logic
- `/docs` - Additional documentation

## Deployment
This project is fully containerized. Use Docker Compose to spin up the entire stack locally:
```bash
docker-compose up --build
```
