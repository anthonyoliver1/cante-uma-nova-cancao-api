class DomainError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

class NotFoundError extends DomainError {
  constructor({ resourceName, resourceIndentifier }) {
    super(`Resource ${resourceName} with identifier ${resourceIndentifier} not found.`)
    this.resourceName = resourceName
    this.resourceIndentifier = resourceIndentifier
  }
}

class ValidationError extends DomainError {
  constructor({ message = 'Invalid parameters', validations  }) {
    super(message)
    this.validations = validations
  }
}

module.exports = {
  NotFoundError,
  ValidationError,
}
