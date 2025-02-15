const getValidationErrorMessage = (
  entity: ErrorEntity,
  operation: ErrorOperation,
  inputErrors: InputError[],
  translator: Translator
): string => {
  const errorDetails = inputErrors
    .map(({ field, issues }) => {
      const issuesMessages = issues
        .map((issue) =>
          translator(`issue.${issue.errorType}`, {
            field,
            expected: String(issue.expected),
            received: String(issue.received),
            min: issue.min,
            max: issue.max,
            keys: issue.keys ? issue.keys.join(", ") : undefined,
          })
        )
        .join(", ");
      return `${field}: ${issuesMessages}`;
    })
    .join(" | ");
    
  return translator("input_error", { entity, operation, errorDetails });
};