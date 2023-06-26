import mongoose from 'mongoose'
import { IGenericErrorMassage } from '../interfaces/error'
import { IGenericErrorResponse } from '../interfaces/common'

const handelValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMassage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        massage: el?.message,
      }
    }
  )
  const statusCode = 400
  return {
    statusCode,
    massage: 'Validation Error',
    errorMessages: errors,
  }
}

export default handelValidationError
