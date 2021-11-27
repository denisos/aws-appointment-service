import DynamoDBStorage from '../adapters/dynamoDBStorage';

describe('DynamoDBStorage ', () => {
  // const mockStorage
  let mockDynamoDBStorage = {
    scan() {
      return {
        promise() {
          return Promise.resolve('listed');
        }
      }
    },
    put() {
      return {
        promise() {
          return Promise.resolve('created');
        }
      }
    }
  };
  const mockTableName = 'appointments';
  const mockCreateData = {
      "time": "10:00:00PST", 
      "name": "Jane Doe", 
      "date": "12/01/2021" 
  };

  test('should buildListParams as expected', () => {
    const dbStorage = new DynamoDBStorage(mockTableName, mockDynamoDBStorage);
    expect(dbStorage.buildListParams()).toEqual({ TableName: mockTableName });
  });

  test('should buildGetParams as expected', () => {
    const expectedResult = {
      TableName: mockTableName,
      Key: {
        id: '123ffjb'   
      }    
    }
    const dbStorage = new DynamoDBStorage(mockTableName, mockDynamoDBStorage);
    expect(dbStorage.buildGetParams(expectedResult.Key.id)).toEqual(expectedResult);
  });

  test('should buildCreateParams as expected', () => {
    const dbStorage = new DynamoDBStorage(mockTableName, mockDynamoDBStorage);

    const createParam = dbStorage.buildCreateParams(mockCreateData);
    expect(createParam.TableName).toEqual(mockTableName);
    expect(createParam.Item.data).toEqual(mockCreateData);
  });

  test('should list as expected', () => {
    const dbStorage = new DynamoDBStorage(mockTableName, mockDynamoDBStorage);

    // uses jest resolves https://jestjs.io/docs/asynchronous#resolves--rejects
    return expect(dbStorage.list()).resolves.toEqual('listed');
  });

  test('should create as expected', () => {
    const dbStorage = new DynamoDBStorage(mockTableName, mockDynamoDBStorage);

    return expect(dbStorage.create(mockCreateData)).resolves.toEqual('created');
  });

});
