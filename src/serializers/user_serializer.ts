import { BaseSerializer } from './base_serializer'

export class UserSerializer extends BaseSerializer {
  static readonly id = 'uuid'
  static readonly type = 'users'
  static readonly attributes = ['name']
}
