import { makeRouteHandler } from '@keystatic/next/route-handler';
import keystaticConfig from '../../../../../keystatic.config';

export const { GET, POST } = makeRouteHandler({
  config: keystaticConfig,
}); 