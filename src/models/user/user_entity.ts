import { IsEmail, IsNotEmpty, IsString, validate } from 'class-validator'

export class UserEntity {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  async validate() {
    return validate(this)
  }
}
