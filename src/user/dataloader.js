'use strict';

export const batchUserMessage = async (keys, models) => {
  const messages = await models.Message.find({
    user: {
      $in: keys
    }
  });
  const dataMap = messages.reduce((acc, message) => {
    acc[message.user] = [...(acc[message.user] || []), message];
    return acc;
  }, {});
  const batchedMessage = keys.map(key => dataMap[key]);
  return batchedMessage;
};

export const batchUserBookmarks = async (keys, models) => {
  const dataList = await models.Bookmark.find({
    createdBy: {
      $in: keys
    }
  });
  const dataMap = dataList.reduce((acc, bookmark) => {
    acc[bookmark.createdBy] = [...(acc[bookmark.createdBy] || []), bookmark];
    return acc;
  }, {});
  return keys.map(key => dataMap[key]);
};
