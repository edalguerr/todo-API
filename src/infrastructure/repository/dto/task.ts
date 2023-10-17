import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { State } from './state';
import { Category } from './category';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => State, (state) => state.tasks)
  state: State;

  @ManyToMany(() => Category, (category) => category.tasks)
  @JoinTable({ name: 'task_category' })
  categories: Category[];
}
