type DatabaseErrorCause = "unique_violation" | "foreign_key_violation";
type CreateErrorCause = "already_exists" | DatabaseErrorCause;f