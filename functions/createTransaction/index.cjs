const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb')
const { unmarshall } = require('@aws-sdk/util-dynamodb')
const { randomUUID } = require('crypto')

const client = new DynamoDBClient({ region: 'us-east-2' })

exports.handler = async (event) => {
  try {
    const userId = event.requestContext.authorizer.jwt.claims.sub
    const body = JSON.parse(event.body)

    const id = randomUUID()
    const createdAt = new Date().toISOString()

    const item = {
      id: { S: id },
      'user-id': { S: userId },
      description: { S: body.description },
      type: { S: body.type },
      price: { N: body.price.toString() },
      category: { S: body.category },
      'created-at': { S: createdAt },
    }

    const command = new PutItemCommand({
      TableName: 'Dt-Money-Transactions',
      Item: item,
    })

    await client.send(command)

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Transação criada com sucesso!', transaction: unmarshall(item) }),
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Erro ao criar transação' }),
    }
  }
}