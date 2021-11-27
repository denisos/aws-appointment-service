import { v4 as uuidv4 } from 'uuid';

// wrapper class to handle crud operations on a DynamoDB table
//
export default class DynamoDBStorage {
  private tableName: string;
  private dynamoDB: any; 

  constructor(tableName: string, dynamoDB: any) {
    this.tableName = tableName;
    this.dynamoDB = dynamoDB;
  }

  buildListParams() {
    return {
      TableName: this.tableName, 
    }
  }

  buildCreateParams(data: any) {
    const timestamp = new Date().getTime();
    return {
      TableName: this.tableName,
      Item: {
        id: uuidv4(),
        data,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    }
  }

  buildGetParams(id: string) {
    return {
      TableName: this.tableName, 
      Key: {
        id   
      }
    }
  }

  create(data: any) {
    return this.dynamoDB.put(this.buildCreateParams(data)).promise();
  }

  get(id: string) {
    return this.dynamoDB.get(this.buildGetParams(id)).promise();
  }

  list() {
    // scan has limitations but ok for my needs
    // const result = await dynamoDb.scan(params).promise();
    return this.dynamoDB.scan(this.buildListParams()).promise();
  }
}

