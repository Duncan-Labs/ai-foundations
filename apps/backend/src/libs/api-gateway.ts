import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export const Ok = (response?: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response || {}),
  };
};

export const NotFound = (message?: string) => {
	return {
		statusCode: 404,
		body: JSON.stringify({ message: message || 'Not found' }),
	};
};

export const BadRequest = (message: string) => {
  return {
    statusCode: 400,
    body: JSON.stringify({ message }),
  };
};

export const UnprocessableEntity = (message: string) => {
	return {
		statusCode: 422,
		body: JSON.stringify({ message }),
	};
};

export const TooManyRequests = (message: string) => {
	return {
		statusCode: 429,
		body: JSON.stringify({ message: message || 'Rate limit exceeded' }),
	};
};

export const Unauthorized = (message: string) => {
  return {
    statusCode: 401,
    body: JSON.stringify({ message }),
  };
};
