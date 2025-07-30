const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient({ region: 'us-east-2' });

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const { userId, name, email } = body;

    const command = new PutItemCommand({
      TableName: 'Users',
      Item: {
        userId: { S: userId },
        name: { S: name },
        email: { S: email },
        createdAt: { S: new Date().toISOString() },
        updatedAt: { S: new Date().toISOString() },
      },
    });

    await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Usuário salvo com sucesso!' }),
    };
  } catch (err) {
    console.error('Erro:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao salvar dados.' }),
    };
  }
};
