import utils from '../../shared/utils';

export const messagesResolver = async (parent, args, { models }) => {
  const { limit = 25, offset = 0, orderBy = '-createdAt', cursor } = args;
  const cursorOptions = cursor
    ? {
      createdAt: {
        $lt: utils.fromCursorHash(cursor)
      }
    }
    : {};

  const findOptions = { limit: limit + 1, sort: orderBy };
  if (offset) {
    findOptions.skip = offset;
  }

  const messages = await models.Message.find(
    { ...cursorOptions },
    null,
    findOptions
  ).populate('user');

  const messagesLength = messages.length;
  const hasNextPage = messagesLength > limit;
  const edges = hasNextPage ? messages.slice(0, -1) : messages;
  const endCursor = edges[edges.length - 1]?.createdAt || 0;

  const pageInfo = {
    hasNextPage,
    endCursor: utils.toCursorHash(String(endCursor))
  };

  return { edges, pageInfo };
};

export const messageResolver = async (parent, { id }, { models }) => {
  const message = await models.Message.findById(id).populate('user');
  return message;
};
