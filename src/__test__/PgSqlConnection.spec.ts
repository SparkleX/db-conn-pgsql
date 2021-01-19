import { SQLException, Connection, Result } from "db-conn";
import { PgSqlConnectionConfig } from "../PgSqlConnectionConfig";
import { PgSqlDriver } from "../PgSqlDriver";
const driver = new PgSqlDriver();

test("Connect", async () => {
	const config: PgSqlConnectionConfig = {
		user: "postgres",
		host: "localhost",
		database: "postgres",
		password: "1234",
		port: 5432
	};
	const conn: Connection = await driver.connect(config);
	let rt: Result = await conn.execute(`SET search_path TO "test"`);
	rt = await conn.execute(`select * from "test"`);
	expect(rt.data?.length).toStrictEqual(2);
	await conn.close();
});
