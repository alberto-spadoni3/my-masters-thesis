class UserNotFoundError extends AppError<"user.not_found"> {
  constructor(userId: string) {
    super("user.not_found", { userId });
  }
}

const userError = new UserNotFoundError({ userId: "1403-2410" });
console.log(userError.code);    // "user.not_found"
console.log(userError.details); // { userId: "1403-2410" }