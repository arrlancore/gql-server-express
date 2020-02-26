import userResolver from '../user/resolver';
import messageResolver from '../message/resolver';
import bookmarkResolver from '../bookmark/resolver';

const resolvers = [userResolver, messageResolver, bookmarkResolver];

export default resolvers;
