import { Connection, SQLException, Result } from "db-conn";

export class PgSqlConnection implements Connection {
	private client: any;
	public constructor(client: any) {
		this.client = client;
	}
	public async close(): Promise<void> {
		await this.client.end();
		delete this.client;
	}
	public async execute(sql: string, params?: object | any[] | undefined): Promise<Result> {
		return new Promise((resolve, reject) => {
			this.client.query(sql, params, (error: any, result: { rows: Result | PromiseLike<Result> }) => {
				if (error) {
					reject(error);
					return;
				}
				let rt: Result = {};
				rt.data = result.rows as object[];
				resolve(rt);
			});
		});
	}
	public async executeQuery(sql: string, params?: object | any[] | undefined): Promise<object[]> {
		const rt: Result = await this.execute(sql, params);
		if (rt.data === undefined) {
			throw new SQLException("No data returned");
		}
		return rt.data;
	}
	public async setAutoCommit(autoCommit: boolean): Promise<void> {
		if (!autoCommit) {
			const rt = await this.execute("begin");
		}
	}
	public async commit(): Promise<void> {
		const rt = await this.execute("commit");
	}
	public async rollback(): Promise<void> {
		const rt = await this.execute("rollback");
	}
}
