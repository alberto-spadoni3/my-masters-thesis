/**
 * Serializes a Zod validation error into a format that can be sent in the response.
 * @param validationError The Zod validation error to be serialized.
 * @returns The serialized validation error.
 */
const serializeZodError = (validationError: ZodError): InputError[] => {
  const serializedErrors: InputError[] = [];

  // Flatten the Zod error object to get the field errors.
  const errors = validationError.flatten((issue: ZodIssue) => ({
    errorType: issue.code,
    details: issue,
  })).fieldErrors;

  for (const key in errors) {
    const fieldErrors = errors[key];

    if (Array.isArray(fieldErrors)) {
      serializedErrors.push(<InputError>{
        field: key,
        issues: fieldErrors.map((error) => {
          const issue: ZodIssue = error.details;
          const extraDetails: IssueDetails = { errorType: issue.code };

          switch (issue.code) {
            case ZodIssueCode.invalid_type:
              extraDetails.expected = issue.expected;
              extraDetails.received = issue.received;
              break;
            case ZodIssueCode.too_small:
              extraDetails.min = issue.inclusive
                ? (issue.minimum as number)
                : (issue.minimum as number) + 1;
              break;
            case ZodIssueCode.too_big:
              extraDetails.max = issue.inclusive
                ? (issue.maximum as number)
                : (issue.maximum as number) - 1;
              break;
            case ZodIssueCode.invalid_string:
              extraDetails.expected = issue.validation;
              break;
            case ZodIssueCode.unrecognized_keys:
              extraDetails.keys = issue.keys;
              break;
            default:
              break;
          }

          return extraDetails;
        }),
      });
    }
  }

  return serializedErrors;
};
