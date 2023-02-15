import "source-map-support/register";
import { Context, APIGatewayEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { getProducts, getTotalProducts, searchProducts, totalSearchProducts } from "./ProductModel";

interface iProductsSearch {
  search: string
  startKey: string
}

export const serve = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResultV2> => {
  try {
    const { startKey } = event?.queryStringParameters as unknown as iProductsSearch;

    const id = Number(startKey);
    const products = await getProducts(id);
    const totalProducts = await getTotalProducts(id);

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

export const search = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResultV2> => {
  try {
    const { search } = event?.queryStringParameters as unknown as iProductsSearch;

    const products = await searchProducts(search);
    const totalProducts = await totalSearchProducts(search);

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
