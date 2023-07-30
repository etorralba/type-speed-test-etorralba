import { DataSource } from "typeorm";
import { join } from "path";

const dataSrc = new DataSource({
  type: "sqlite",
  database: "src/data/data.db",
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  synchronize: true,
});

export default dataSrc;
