import { UserOutput } from '@/users/application/dtos/user-output'
import { ListUsersUseCase } from '@/users/application/usecases/listusers.usecase'
import { Transform } from 'class-transformer'
import { CollectionPresenter } from './collection.presenter'
import { ApiProperty } from '@nestjs/swagger'

export class UserPresenter {
    @ApiProperty({ description: 'Identificação do usuário' })
    id: string

    @ApiProperty({ description: 'Nome do usuário' })
    name: string

    @ApiProperty({ description: 'E-mail do usuário' })
    email: string

  @ApiProperty({ description: 'Data de criação do usuário' })
  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date

  constructor(output: UserOutput) {
    this.id = output.id
    this.name = output.name
    this.email = output.email
    this.createdAt = output.createdAt
  }

}

export class UserCollectionPresenter extends CollectionPresenter {
    data: UserPresenter[]

    constructor(output: ListUsersUseCase.Output) {
      const { items, ...paginationProps } = output
      super(paginationProps)
      this.data = items.map(item => new UserPresenter(item))
    }
  }
