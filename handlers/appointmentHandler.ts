import AWS from 'aws-sdk';
import { Context } from 'aws-lambda';

import DynamoDBStorage from '../adapters/dynamoDBStorage';
import { createAppointment, getAppointment, listAppointment } from '../services/appointmentService';
import { IncomingBody, ListResult } from '../types/types';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// handlers primarily deal with the protocols to receive and return data
// handlers delegate actual business logic to services as quickly as possible
//
const get = async (event: any, context?: Context) => {
  const dynamoDbStore = new DynamoDBStorage(process.env.DYNAMODB_TABLE as string, dynamoDb);

  const result = await getAppointment(event.pathParameters.id, dynamoDbStore);

  if (result.Item) {
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: `No appointment found for id ${event.pathParameters.id}` })
    };
  }
}


const list = async (event: any) => {
  const dynamoDbStore = new DynamoDBStorage(process.env.DYNAMODB_TABLE as string, dynamoDb);

  const result: ListResult = await listAppointment(dynamoDbStore);

  if (result.Items) {
    return {
      statusCode: 200,
      body: JSON.stringify([...result.Items])
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'List appointments failed' })
    };
  }
}

const create = async (event: any) => {
  const dynamoDbStore = new DynamoDBStorage(process.env.DYNAMODB_TABLE as string, dynamoDb);

  // incoming payload to save
  const body: IncomingBody = JSON.parse(event.body);
  console.log("create appointment, data passed", body, process.env.DYNAMODB_TABLE);

  await createAppointment(body.data, dynamoDbStore);

  return {
    statusCode: 200,
    body: JSON.stringify(body.data)
  }
}

export { get, list, create }
