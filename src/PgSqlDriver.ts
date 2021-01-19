import { Driver, Connection, SQLException } from "db-conn";
import { PgSqlConnection, PgSqlConnectionConfig } from ".";

import { Pool, Client } from "pg";

export class PgSqlDriver implements Driver {
	public async connect(config: PgSqlConnectionConfig): Promise<Connection> {
		//const pool = new Pool(config);
		//const rt = new PgSqlConnection(pool);

		const client = new Client(config);
		await client.connect();
		const rt = new PgSqlConnection(client);

		return rt;
	}
}
