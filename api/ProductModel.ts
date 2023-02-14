import AWS from 'aws-sdk';
import { Key, ScanInput } from 'aws-sdk/clients/dynamodb';


const PRODUCT_TABLE_NAME = 'productsTable';

const dynamoClient = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
  secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
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
