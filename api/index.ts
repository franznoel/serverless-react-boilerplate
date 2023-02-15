import "source-map-support/register";
import { Context, APIGatewayEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { getSearchedProducts, getTotalSearchedProducts } from "./ProductModel";

interface iProductsSearch {
  search: string
  startKey: string
}

export const serve = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResultV2> => {
  try {
    console.log('process.env', process.env);
    console.log('event', event);
    const { search, startKey } = event?.queryStringParameters as unknown as iProductsSearch;

    const id = Number(startKey);
    const products = await getSearchedProducts(search, id);
    const totalProducts = await getTotalSearchedProducts(search, id);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: products.Items || [],
        limit: products.Count || 0,
        total: totalProducts.Count || 0,
        lastEvaluatedKey: products.LastEvaluatedKey
      }),
    };
  } catch (error) {
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
