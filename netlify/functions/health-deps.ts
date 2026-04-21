export const handler = async () => {
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ status: 'ok', deps: { frontend: 'ready' } }),
  }
}
