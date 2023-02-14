import "source-map-support/register";
import { Context, APIGatewayEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { getProducts, getSearchedProducts, getTotalProducts, getTotalSearchedProducts } from "./ProductModel";

interface iProductsSearch {
  search: string
}

export const serve = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResultV2> => {
  try {
    const { search  } = event.queryStringParameters as unknown as iProductsSearch;
    const totalProducts = search ? await getTotalSearchedProducts(search) : await getTotalProducts();
    const products = search ? await getSearchedProducts(search) : await getProducts();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        products: products.Items || [],
        limit: products.Count || 0,
        total: totalProducts.Count || 0
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ message: error.message })
    }
  }
};
