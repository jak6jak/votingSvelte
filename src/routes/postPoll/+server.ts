import type { RequestHandler } from './$types';

export const POST: RequestHandler = () => {
	// do something
    return new Response('Hello World');
};