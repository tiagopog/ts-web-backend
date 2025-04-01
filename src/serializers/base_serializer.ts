import { ClassConstructor } from '../../common/types'
import { Deserializer, Serializer } from 'ts-jsonapi'

export class BaseSerializer {
  static readonly id: string
  static readonly type: string
  static readonly attributes: Array<string>

  static readonly deserializeTarget: ClassConstructor<BaseSerializer>

  static serialize(data: unknown) {
    return new Serializer(this.type, {
      id: this.id,
      attributes: this.attributes,
    }).serialize(data)
  }

  static deserialize(data: unknown) {
    const rawAttributes = new Deserializer().deserialize(data)
    return this.sanitize(rawAttributes)
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  static sanitize(rawAttributes: Record<string, any>) {
    return Object.keys(rawAttributes).reduce((sanitized: Record<string, any>, field: string) => {
      if (this.attributes.includes(field)) sanitized[field] = rawAttributes[field]
      return sanitized
    }, {})
  }
}
