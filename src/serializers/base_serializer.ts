import { Serializer } from 'ts-jsonapi'

export class BaseSerializer {
  static readonly id: string
  static readonly type: string
  static readonly attributes: Array<string>

  static serialize(data: unknown) {
    const serializer = new Serializer(this.type, {
      id: this.id,
      attributes: this.attributes,
    })

    return serializer.serialize(data)
  }
}
