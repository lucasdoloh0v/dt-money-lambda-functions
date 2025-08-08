const { DynamoDBClient, QueryCommand } = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb')

const client = new DynamoDBClient({ region: 'us-east-2' })

exports.handler = async (event) => {
  try {
    const userId = event.requestContext.authorizer.jwt.claims.sub

    const command = new QueryCommand({
      TableName: 'Dt-Money-Transactions',
      IndexName: 'user-id-index',
      KeyConditionExpression: '#uid= :userId',
      ExpressionAttributeNames: {
        '#uid': 'user-id',
      },
      ExpressionAttributeValues: {
        ':userId': { S: userId },
      },
    })

    const result = await client.send(command)

    const items = result.Items.map((item) => unmarshall(item))

    return {
      statusCode: 200,
      body: JSON.stringify(items),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    }
  }
};
