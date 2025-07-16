import { ValidationError } from 'class-validator'

export enum ErrorCodes {
  APPLICATION_ERROR = 'application_error',
  CONTRACT_VALIDATION_ERROR = 'crontact_validation_error',
}

export interface JsonApiError {
  code: ErrorCodes
  status: string
  title: string
  detail?: string
  meta?: object
}

export interface ContractError extends JsonApiError {
  code: ErrorCodes.CONTRACT_VALIDATION_ERROR
}

export function parseContractErrors(errors: ValidationError[]): ContractError[] {
  return errors
    .flatMap((error) => {
      return Object.values(error.constraints || {})
    })
    .map((message) => {
      return {
        status: '422',
        code: ErrorCodes.CONTRACT_VALIDATION_ERROR,
        title: 'Invalid Attribute',
        detail: message,
      }
    })
}
