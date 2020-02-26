import * as api from '../../api';

/**
 * user mutation resolver
 * @list of action:
 * - user(:id)
 * - users
 */

describe('getUser(id: String!): User', () => {
  it('returns a user when user exist', async () => {
    const token = await api.loginAndGetToken({
      login: 'awesomeuser',
      password: 'password123'
    });
    const expectedResult = {
      data: {
        getUser: {
          id: '5e4e555cbf31ef2588e22124',
          username: 'awesomeuser',
          role: 'USER'
        }
      }
    };
    const result = await api.getUser({ id: '5e4e555cbf31ef2588e22124' }, token);
    expect(result.data).toEqual(expectedResult);
    expect(result.data).toMatchSnapshot();
  });

  it('returns error when user cannot be found', async () => {
    const token = await api.loginAndGetToken({
      login: 'awesomeuser',
      password: 'password123'
    });

    // user cannot return null
    const expectedResult =
      'Cannot return null for non-nullable field Query.getUser.';
    const result = await api.getUser({ id: '3e4e555cbf31ef2588e22124' }, token);
    expect(result.data.errors[0].message).toEqual(expectedResult);
  });
});

describe('getUsers: [User]', () => {
  it('returns a list of user', async () => {
    const token = await api.loginAndGetToken({
      login: 'awesomeuser',
      password: 'password123'
    });

    const expectedResult = {
      data: {
        getUsers: [
          {
            id: '5e4e555cbf31ef2588e22124',
            username: 'awesomeuser',
            role: 'USER'
          },
          {
            id: '5e4e555cbf31ef2588e22125',
            username: 'awesomeadmin',
            role: 'ADMIN'
          }
        ]
      }
    };
    const result = await api.getUsers(token);
    expect(result.data).toEqual(expectedResult);
  });

  it('returns a list of user with messages undefined', async () => {
    const token = await api.loginAndGetToken({
      login: 'awesomeuser',
      password: 'password123'
    });

    const expectedResult = {
      data: {
        getUsers: [
          {
            id: '5e4e555cbf31ef2588e22124',
            username: 'awesomeuser',
            role: 'USER',
            activities: undefined
          },
          {
            id: '5e4e555cbf31ef2588e22125',
            username: 'awesomeadmin',
            role: 'ADMIN',
            activities: undefined
          }
        ]
      }
    };
    const result = await api.getUsers(token);
    expect(result.data).toEqual(expectedResult);
  });
});
