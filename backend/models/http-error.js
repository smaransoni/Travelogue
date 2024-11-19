class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); //Adds the corresponding 'message' to the message property (present by default)
    //of the current object instance of the Error class
    this.code = errorCode; // Adds a "code" property
  }
}

module.exports = HttpError;
