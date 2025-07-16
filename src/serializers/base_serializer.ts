import { plainToInstance } from 'class-transformer'
import { ClassConstructor } from '../../common/types'
import { Deserializer, Serializer } from 'ts-jsonapi'
import { validateSync } from 'class-validator'
import { parseContractErrors } from '../errors'

export class BaseSerializer {
  static readonly id: string
  static readonly type: string
  static readonly attributes: string[]
  static readonly defaultContract: ClassConstructor

  static serialize(data: unknown, attributes?: string[]) {
    return new Serializer(this.type, {
      id: this.id,
      attributes: attributes || this.attributes,
    }).serialize(data)
  }

  static deserialize(data: unknown, contract?: ClassConstructor) {
    let attrs = new Deserializer().deserialize(data)

    attrs = plainToInstance(contract || this.defaultContract, attrs, {
      excludeExtraneousValues: true,
    })

    const errors = validateSync(attrs)
    if (errors.length > 0) throw parseContractErrors(errors)

    return attrs
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  static sanitize(rawAttributes: Record<string, any>) {
    return Object.keys(rawAttributes).reduce((sanitized: Record<string, any>, field: string) => {
      if (this.attributes.includes(field)) sanitized[field] = rawAttributes[field]
      return sanitized
    }, {})
  }
}
