/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express'
import { IGenericErrorMassage } from '../../interfaces/error'
import config from '../../config'
import handelValidationError from '../../error/handelValidationError'
import { ApiError } from '../../error/ApiError'
import { errorLogger } from '../../shared/logger'

const globalErrorHandeler: ErrorRequestHandler = (error, req, res, next) => {
  config.env == 'development'
    ? console.log('🐠 globalError', error)
    : errorLogger.error('🐢 globalErrorhandeler', error)

  let statusCode = 500
  let massage = 'Something went wrong'
  let errrorMassage: IGenericErrorMassage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handelValidationError(error)
    statusCode = simplifiedError.statusCode
    massage = simplifiedError.massage
    errrorMassage = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode
    massage = error.message
    errrorMassage = error?.message
      ? [
          {
            path: '',
            massage: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    massage = error?.message
    errrorMassage = error?.message
      ? [
          {
            path: '',
            massage: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    massage,
    errrorMassage,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
  next()
}

export default globalErrorHandeler
