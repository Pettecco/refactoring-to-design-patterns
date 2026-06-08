export class FaceNoteLoginService {
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
      'paulaS2livros': 200,
      'blockedUser': 408,
      'revokedUser': 403
    };
    return response[userId] || 404;
  }
}
