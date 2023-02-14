import AWS from 'aws-sdk';


const PRODUCT_TABLE_NAME = 'productsTable';

const dynamoClient = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
  secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
});

export const getProducts = async () => {
  const products = await dynamoClient.scan({
    TableName : PRODUCT_TABLE_NAME,
    Limit: 12,
  }).promise();
  console.log('products', products);
  return products;
}

export const getTotalProducts = async () => {
  const totalProducts = await dynamoClient.scan({
    TableName : PRODUCT_TABLE_NAME,
    Select: 'COUNT',
  }).promise();
  console.log('totalProducts', totalProducts);
  return totalProducts;
}
