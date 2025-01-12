import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import middyJsonBodyParser from '@middy/http-json-body-parser';

interface MiddyOptions {
	validateHouseAccess?: boolean;
	parseBody?: boolean;
	schema?: any;
}

export const middyfy = (
	handler,
	opts: MiddyOptions = {
		parseBody: true,
	},
) => {
	const middyfied = middy(handler)
		.use(warmupReturnMiddleware());
	// Default to true
	if (!Object.hasOwn(opts, 'parseBody')) opts.parseBody = true;

	if (opts.parseBody) middyfied.use(middyJsonBodyParser());

	// if (opts.schema) middyfied.use(validator({ eventSchema: transpileSchema(opts.schema) }));

	middyfied.use(httpErrorHandler());

	return middyfied;
};

const warmupReturnMiddleware = () => {
	return {
		before: async request => {
			if (request.event.source === 'serverless-plugin-warmup') {
				console.log('Warmup event');
				return 'Warmed up';
			}
		},
	};
};
