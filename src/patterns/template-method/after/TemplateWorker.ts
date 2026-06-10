import { TimeoutException } from './types.js';

export abstract class TemplateWorker {
  private retryLimit: number = 3;
  private retryCount: number = 0;

  public setRetryLimit(limit: number): void {
    this.retryLimit = limit;
  }

  public execute<T>(params: any): T {
    this.beforeExecution(params);

    let result: T = this.defaultValue();
    this.retryCount = 0;

    do {
      try {
        result = this.work(params);
        this.retryCount = this.retryLimit;
      } catch (e) {
        if (e instanceof TimeoutException) {
          this.handleException(e);
          this.retryCount++;
        } else {
          throw e;
        }
      }
    } while (this.shouldKeepTrying());

    return result;
  }

  protected abstract defaultValue<T>(): T;
  protected abstract handleException(e: TimeoutException): void;
  protected abstract work<T>(params: any): T;

  protected beforeExecution(params: any): void {}

  protected shouldKeepTrying(): boolean {
    return this.retryCount < this.retryLimit;
  }
}
