import {
    Table,
    Model,
    Column,
    PrimaryKey,
    BeforeCreate
} from 'sequelize-typescript'
import * as uuid from "uuid";

@Table({tableName: "tasks"})
class Task extends Model<Task> {
  @Column
  @PrimaryKey
  guid: string;

  @Column
  title: string;

  @Column
  done: boolean;

  @BeforeCreate
  static generateGuid(instance) {
    if(!instance.guid) {
        instance.guid = uuid.v4()
    }
  }
}