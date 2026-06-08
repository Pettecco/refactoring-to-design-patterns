export class ZuiterLoginService {
  public authenticate(userId: string): number {
    try {
      return this.authenticateViaPost(userId);
    } catch (e) {
      console.error(`Error: ${e}`);
    }
    return 500;
  }

  private authenticateViaPost(userId: string): number {
    const response: Record<string, number> = {
      'paulaS2livros': 202,
      'pendingUser': 400
    };
    return response[userId] || 404;
  }
}
