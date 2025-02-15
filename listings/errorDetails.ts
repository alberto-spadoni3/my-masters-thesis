type ErrorDetailsMapping = {
  // --- Validation errors ---
  "validation.input_error": {
    entity: ErrorEntity;
    operation: ErrorOperation;
    inputErrors: InputError[];
  };

  // --- User entity errors ---
  "user.not_found": { userId: string };
  "user.create_failed": {
    cause: CreateErrorCause;
  };

  // --- Authentication errors ---
  "authentication.unauthorized": { message?: string };
  "authentication.forbidden": { action?: string };

  // --- Generic internal server errors ---
  "internal.server_error": { message?: string };
  "internal.legacy_error": { message?: string };
  "internal.database_error": { message?: string };
};
