import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];
  private idCounter = 1;

  createTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: this.idCounter++,
      title: createTaskDto.title,
      description: createTaskDto.description,
      completed: false,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: number): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  updateTask(id: number, updateTaskDto: UpdateTaskDto): Task {
    const task = this.getTaskById(id);
    task.title = updateTaskDto.title || task.title;
    task.description = updateTaskDto.description || task.description;
    task.completed = updateTaskDto.completed ?? task.completed;
    return task;
  }

  deleteTask(id: number): void {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) throw new NotFoundException('Task not found');
    this.tasks.splice(index, 1);
  }
}
