import { Express } from 'express';
import { FronteggContext, withAuthentication } from '@frontegg/client';
import { frontegg } from '../../middleware';
import { FronteggPermissions } from '../../permissions';

export default (app: Express) => {
  app.use(
    '/frontegg',
    frontegg({
      clientId: FronteggContext.getContext().FRONTEGG_CLIENT_ID,
      apiKey: FronteggContext.getContext().FRONTEGG_API_KEY,
      authMiddleware: withAuthentication(),
      // @ts-ignore
      contextResolver: (req) => {
        // @ts-ignore
        // console.log(req);
        // @ts-ignore
        const email = req.user; // The user context (after JWT verification)
        // @ts-ignore
        const tenantId = req.user.tenantId; // The tenantId context (after JWT verification)
        // @ts-ignore
        const authenticatedEntityType = req.user.type; // The authenticated entity type (user/user api token/tenant api token) context (after JWT verification)
        // @ts-ignore
        const authenticatedEntityId = req.user.id; // The authenticated entity id context (after JWT verification)
        const permissions = [FronteggPermissions.All];

        return {
          email,
          tenantId,
          permissions,
          authenticatedEntityType,
          authenticatedEntityId,
        };
      },
    }),
  );
};
