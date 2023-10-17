import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from './task';

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ default: false })
  isDefault: boolean;

  @OneToMany(() => Task, (task) => task.state)
  tasks: Task[];
}
