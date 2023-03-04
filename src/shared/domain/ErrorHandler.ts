export class ErrorHandler extends Error {

  message     : string;
  statusCode  : number;

  constructor(message: string, statusCode: number) {
    super();
    this.statusCode = statusCode;
    this.message    = message;
  }
  
}
