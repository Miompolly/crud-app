import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  [x: string]: any;
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }
  async findById(todoId: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id: todoId } });
  
    if (!todo) {
      throw new NotFoundException(`Todo with id ${todoId} not found`);
    }
  
    return todo;
  }
  
  

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(newTodo);
  }
  async remove(todoId: number): Promise<void> {
    const todo = await this.findById(todoId);
    await this.todoRepository.remove(todo);
  }
  async update(todoId: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findById(todoId);

    // Update the properties from the DTO
    Object.assign(todo, updateTodoDto);

    // Save the updated todo
    return this.todoRepository.save(todo);
  }
}
