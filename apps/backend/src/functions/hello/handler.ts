import { Ok } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const handler = async _event => {
	return Ok({ message: 'Hello, World!' });
};

export const main = middyfy(handler, { parseBody: false });
