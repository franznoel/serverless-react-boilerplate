import { APIGatewayEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { Context } from "aws-sdk/clients/autoscaling";
import { getTotalProducts, searchProducts } from "./ProductSqlModel";

export const products = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResultV2> => {
  try {
    const search = event?.queryStringParameters?.search || '';
    const offset = Number(event?.queryStringParameters?.offset) || 0;
    const limit = Number(event?.queryStringParameters?.limit) || 12;
    const products = await searchProducts(limit, offset, search);
    const totalProducts = await getTotalProducts(search);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: products || [],
        limit: limit || 0,
        offset: offset || 0,
        total: Number(totalProducts) || 0,
      }),
    };
  } catch(error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: error.message })
    }    
  }
};
