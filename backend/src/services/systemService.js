export async function syncClientState() {
  return {
    syncedAt: new Date().toISOString(),
    status: 'ok',
  }
}
