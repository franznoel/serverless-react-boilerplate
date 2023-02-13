import "source-map-support/register";
import { Context, APIGatewayEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import AWS from 'aws-sdk';

export const serve = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResultV2> => {
  const dynamoClient = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
    secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
  });

  const productsParam = {
    TableName : 'productsTable',
    Limit: 12,
  };
  const products = await dynamoClient.scan(productsParam).promise();
  console.log('Scanned products:', products.Items && products.Items.length);

  return {
    statusCode: 200,
    body: JSON.stringify({
      products: products.Items,
      lastEvaluatedKey: products.LastEvaluatedKey
    }),
  };
};
