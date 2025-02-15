const error = new UserNotFoundError({ userId: "1234" });
console.log(error.code); // "user.not_found"
console.log(error.details); // { userId: "1234" }