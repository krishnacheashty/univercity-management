import { IGenericErrorMassage } from './error'

export type IGenericErrorResponse = {
  statusCode: number
  massage: string
  errorMessages: IGenericErrorMassage[]
}
