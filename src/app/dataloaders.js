'use strict';

import DataLoader from 'dataloader';
import { batchUserMessage, batchUserBookmarks } from '../user/dataloader';

export default function allDataLoader(models) {
  return {
    userMessage: new DataLoader(keys => batchUserMessage(keys, models)),
    userBookmarks: new DataLoader(keys => batchUserBookmarks(keys, models))
  };
}
