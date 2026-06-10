import { AuthenticationMethod, LoginData, LoginResponse } from './types.js';
import { FaceNoteLoginService } from './FaceNoteLoginService.js';
import { ZuiterLoginService } from './ZuiterLoginService.js';

export class Login {
  private static FACE_NOTE_SUCCESS = 200;
  private static FACE_NOTE_REVOKED = 403;
  private static FACE_NOTE_BLOCKED = 408;
  private static ZUITER_SUCCESS = 202;
  private static ZUITER_PENDING = 400;
  private static INVALID_METHOD = -1;

  private faceNoteService: FaceNoteLoginService;
  private zuiterService: ZuiterLoginService;

  constructor() {
    this.faceNoteService = new FaceNoteLoginService();
    this.zuiterService = new ZuiterLoginService();
  }

  public authenticate(loginData: LoginData): LoginResponse {
    let response = Login.INVALID_METHOD;
    const { method, username } = loginData;

    if (method === AuthenticationMethod.VIA_FACENOTE) {
      response = this.faceNoteService.authenticate(username);
    } else if (method === AuthenticationMethod.VIA_ZUITER) {
      response = this.zuiterService.authenticate(username);
    }

    let message = 'authentication failed';
    let status = false;

    if (
      response === Login.FACE_NOTE_SUCCESS ||
      response === Login.ZUITER_SUCCESS
    ) {
      status = true;
      message = 'login successful';
    } else if (response === Login.FACE_NOTE_REVOKED) {
      message = 'access revoked';
    } else if (response === Login.FACE_NOTE_BLOCKED) {
      message = 'access blocked';
    } else if (response === Login.ZUITER_PENDING) {
      message = 'access pending';
    }

    return { status, message };
  }
}
