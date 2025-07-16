import { BaseSerializer } from './base_serializer'
import { UserSignUpContract } from '../contracts/user_contracts'

export class UserSerializer extends BaseSerializer {
  static readonly id = 'uuid'
  static readonly type = 'users'
  static readonly attributes = ['name', 'email']
  static readonly deafaultContract = UserSignUpContract
}
