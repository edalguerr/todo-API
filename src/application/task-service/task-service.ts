import { Task } from 'src/domain/entity/task';
import { TaskServiceI } from 'src/domain/service/task-service.interface';
import { StateService } from '../state-service/state-service';
import { CategoryService } from '../category-service/category-service';
import { Category } from 'src/domain/entity/category';
import { NotFoundException } from 'src/shared/exceptions/not-found-exception';
import { State } from 'src/domain/entity/state';
import { FilterParamsI } from 'src/shared/interfaces/filter-params.interface';

export class TaskService {
  constructor(
    private taskService: TaskServiceI,
    private stateService: StateService,
    private categoryService: CategoryService,
  ) {}
  async save(
    task: Task,
    stateId: number = 0,
    categories: number[] = [],
  ): Promise<Task> {
    const nullState = 0;
    if (stateId !== nullState) {
      task.state = await this.stateService.getStateById(stateId);
    } else {
      task.state = await this.stateService.getDefaultState();
    }

    const taskCategories: Category[] = [];
    categories.forEach(async (categoryId) => {
      taskCategories.push(
        await this.categoryService.getCategoryById(categoryId),
      );
    });

    task.categories = taskCategories;

    return this.taskService.save(task);
  }

  async update(
    task: Task,
    stateId: number,
    categories: number[],
  ): Promise<Task> {
    await this.getTaskById(task.id);

    let state: State;
    const categoriesInstances: Category[] = [];

    if (stateId) {
      state = await this.stateService.getStateById(stateId);
    }

    //TODO: change foreach method to "for of" or normal "for", to controll exceptions throwed in the bucle brackets
    categories?.forEach(async (categoryId) => {
      try {
        categoriesInstances.push(
          await this.categoryService.getCategoryById(categoryId),
        );
      } catch (error) {}
    });

    task.state = state;
    task.categories = categoriesInstances;
    return await this.taskService.update(task);
  }

  async delete(id: number): Promise<Task> {
    const task = await this.getTaskById(id);
    return this.taskService.delete(task);
  }

  list(): Promise<Task[]> {
    return this.taskService.list();
  }

  async getTaskById(taskId: number): Promise<Task> {
    const task = await this.taskService.getTaskById(taskId);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async filter(criteria: FilterParamsI): Promise<Task[]> {
    return this.taskService.filter(criteria);
  }
}
