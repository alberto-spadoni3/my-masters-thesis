abstract class AppError<
  K extends keyof ErrorDetailsMapping,
> extends Error {
  public readonly code: K;
  public readonly statusCode: number;
  public readonly details: ErrorDetailsMapping[K];
  
  protected constructor(code: K, details: ErrorDetailsMapping[K]) {
    super();
    this.code = code;
    this.statusCode = getStatusCodeFromErrorCode(this.code, details);
    this.details = details;
  }

  toJSON(): AppErrorPayload {
    return {
      code: this.code,
      details: this.details,
    } as AppErrorPayload;
  }
}
