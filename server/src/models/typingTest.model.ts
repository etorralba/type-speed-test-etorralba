import { v4 as uuidv4 } from "uuid";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class TypingTest {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  typedText!: string;

  @Column()
  originalPassage!: string;

  @Column()
  startTime!: string;

  @Column()
  endTime!: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export default TypingTest;
