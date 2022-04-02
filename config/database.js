
module.exports = ({ env }) => {
	const databaseCredentials = env('HEROKU_POSTGRESQL_ROSE_URL', null).match(/^(?<postgres>[a-z]+):\/\/(?<user>\w+):(?<password>\w+)@(?<host>[\w\-.]+):(?<port>\d+)\/(?<database>\w+)$/i).groups;
	
	return {
		defaultConnection: 'default',
		connections: {
			default: {
			connector: 'bookshelf',
			settings: {
				client: 'postgres',
				host: databaseCredentials.host,
				port: databaseCredentials.port,
				database: databaseCredentials.database,
				username: databaseCredentials.user,
				password: databaseCredentials.password,
				ssl: {
					rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates
				},
				schema: env('DATABASE_SCHEMA', 'public'), // Not Required
			},
			options: {},
			},
		},
	};
};
