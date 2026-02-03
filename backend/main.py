from fastapi import FastAPI, BackgroundTasks, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import uuid
from typing import Dict

# Create FastAPI app
app = FastAPI()

# CORS middleware
app.add_middleware(CORSMiddleware,
    allow_origins=['*'],  # Adjust this for production
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Task in-memory storage
tasks: Dict[str, Dict] = {}

class VideoRequest(BaseModel):
    video_url: str

class TaskResponse(BaseModel):
    task_id: str
    status: str
    progress: float

async def process_video(task_id: str, video_url: str):
    # Simulate video processing steps with asyncio sleep
    tasks[task_id]['status'] = 'In Progress'
    tasks[task_id]['progress'] = 0.1
    await asyncio.sleep(2)  # Simulating video info parsing

    tasks[task_id]['progress'] = 0.5
    await asyncio.sleep(2)  # Simulating audio extraction

    tasks[task_id]['progress'] = 0.8
    await asyncio.sleep(2)  # Simulating speech recognition

    tasks[task_id]['progress'] = 1.0
    tasks[task_id]['status'] = 'Completed'

@app.post('/api/transcribe', response_model=TaskResponse)
async def transcribe_video(video_request: VideoRequest, background_tasks: BackgroundTasks):
    task_id = str(uuid.uuid4())  # Create a unique task ID
    tasks[task_id] = {'status': 'Pending', 'progress': 0.0}
    background_tasks.add_task(process_video, task_id, video_request.video_url)
    return TaskResponse(task_id=task_id, status=tasks[task_id]['status'], progress=tasks[task_id]['progress'])

@app.get('/api/task/{task_id}', response_model=TaskResponse)
async def get_task_status(task_id: str):
    if task_id not in tasks:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Task not found')
    return TaskResponse(task_id=task_id, status=tasks[task_id]['status'], progress=tasks[task_id]['progress'])

@app.delete('/api/task/{task_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(task_id: str):
    if task_id in tasks:
        del tasks[task_id]
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Task not found')
