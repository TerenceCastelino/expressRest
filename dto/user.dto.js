class UserDTO {

  id
  firstname
  lastname
  email
  password
  role
  dateOfBirth
  constructor(data){
    this.id =data.id
    this.firstname = data.firstname
    this.lastname = data.lastname
    this.email = data.email
    this.password =data.password
    this.role = data.role
    this.dateOfBirth = data.dateOfBirth
  }
}
module.exports = UserDTO
  