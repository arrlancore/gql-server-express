'use strict';

import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAdmin = (parent, args, { me: { role } }) => {
  return role === 'ADMIN'
    ? skip
    : new ForbiddenError('Not authorized as admin.');
};

export const isAuthenticated = (parent, args, { me }) => {
  return me ? skip : new ForbiddenError('Not authenticated as user.');
};

export const isMessageOwner = async (parent, { id }, { models, me }) => {
  const message = await models.Message.findByPk(id, { raw: true });
  if (message.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }
  return skip;
};
