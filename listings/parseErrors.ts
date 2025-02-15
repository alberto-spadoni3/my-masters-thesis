const parseBackendError = (
  err: AxiosError,
  translator: Translator
): string => {
  let errorMessage = "";
  const data = err.response?.data as AppErrorPayload | undefined;

  if (!data) {
    // if there is no response data, just return a generic error message
    return translator("internal.server_error", { message: err.message });
  }

  if (err.response?.status === 400) {
    // Validation error
    if (data.code === "validation.input_error") {
      const details =
        data.details as ErrorDetailsMapping["validation.input_error"];
      errorMessage = getValidationErrorMessage(
        details.entity,
        details.operation,
        details.inputErrors as InputError[],
        (key, params) => translator("validation." + key, params)
      );
    }
  } else if (err.response?.status === 409) {
    // Conflict error
    const [entity, operation] = data.code.split(".");
    const entityTranslation: Translator = (key, params) =>
      translator(`${entity}.${key}`, params);

    switch (entity) {
      case "user":
        errorMessage = getUserErrorMessage(
          operation as EntityErrorType,
          data.details,
          entityTranslation
        );
        break;
      case "organization":
        errorMessage = getOrganizationErrorMessage(
          operation as EntityErrorType,
          data.details,
          entityTranslation
        );
        break;
      default:
        errorMessage = translator("internal.server_error", {
          message: err.message,
        });
    }
  } else if (err.response?.status === 500) {
    // Internal server error
    errorMessage = translator(data.code, {
      message: (data.details as { message?: string }).message || "",
    });
  } else {
    // Fallback for other status codes
    errorMessage = translator("internal.server_error", {
      message: err.message,
    });
  }

  return errorMessage;
};