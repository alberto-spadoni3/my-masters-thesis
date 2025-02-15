type AppErrorPayload = {
  [K in keyof ErrorDetailsMapping]: {
    code: K;
    details: ErrorDetailsMapping[K];
  };
}[keyof ErrorDetailsMapping];