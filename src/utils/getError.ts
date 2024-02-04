export function getError(errors: any, key: string) {
  const error = errors[key as keyof typeof errors];
  return error ? String(error.message) : undefined;
}
