import AWS from 'aws-sdk';
import { Key, ScanInput } from 'aws-sdk/clients/dynamodb';

const PRODUCT_TABLE_NAME = 'productsTable';

const dynamoClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.SERVERLESS_DYNAMODB,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
});

export const getSearchedProducts = async(searchTerm: string, startKey: number) => {
  let params = {
    TableName : PRODUCT_TABLE_NAME,
    Select: "ALL_ATTRIBUTES",
    FilterExpression: "contains(#title,:searchTerm) OR #brandName = :searchTerm",
    ExpressionAttributeNames: {
      "#title": "title",
      "#brandName": "brandName"
    },
    ExpressionAttributeValues: {
      ":searchTerm": searchTerm,
    },
    Limit: 12,
  } as ScanInput;

  if (startKey) {
    params.ExclusiveStartKey = { id: startKey } as Key;
    params.Limit = 12
  }

  const products = await dynamoClient.scan(params).promise();
  return products;
}

export const getTotalSearchedProducts = async(searchTerm: string, startKey: number) => {
  let params = {
    TableName : PRODUCT_TABLE_NAME,
    Select: 'COUNT',
    FilterExpression: 'contains(#title,:searchTerm) OR #brandName = :searchTerm',
    ExpressionAttributeNames: {
      "#title": "title",
      "#brandName": "brandName"
    },
    ExpressionAttributeValues: {
      ":searchTerm": searchTerm
    }
  } as ScanInput;

  const totalSearchedProducts = await dynamoClient.scan(params).promise();
  return totalSearchedProducts;
}
