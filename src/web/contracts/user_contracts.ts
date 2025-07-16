import { Expose } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import 'reflect-metadata'

export class UserSignUpContract {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string
}
