import { instanceToPlain } from 'class-transformer'
import { PaginationPresenter } from '../../pagination.presenter'
import { CollectionPresenter } from '../../collection.presenter'
import { UserCollectionPresenter, UserPresenter } from '../../user.presenter'

class StubCollectionPresenter extends CollectionPresenter {
  data = [1, 2, 3]
}

describe('CollectionPresenter unit tests', () => {
  let sut: StubCollectionPresenter

  beforeEach(() => {
    sut = new StubCollectionPresenter({
      currentPage: 1,
      perPage: 2,
      lastPage: 2,
      total: 4,
    })
  })

  describe('constructor', () => {
    it('should set values', () => {
      expect(sut['paginationPresenter']).toBeInstanceOf(PaginationPresenter)
      expect(sut['paginationPresenter'].currentPage).toBe(1)
      expect(sut['paginationPresenter'].perPage).toBe(2)
      expect(sut['paginationPresenter'].lastPage).toBe(2)
      expect(sut['paginationPresenter'].total).toBe(4)
    })
  })

  it('should presenter data', () => {
    const output = instanceToPlain(sut)
    expect(output).toStrictEqual({
      data: [1, 2, 3],
      meta: {
        currentPage: 1,
        perPage: 2,
        lastPage: 2,
        total: 4,
      },
    })
  })
})

describe('UserCollectionPresenter unit tests', () => {
    const createdAt = new Date()
    const props = {
      id: 'e71c52a2-9710-4a96-a08e-144af4209b5d',
      name: 'test name',
      email: 'a@a.com',
      password: 'fake',
      createdAt,
    }

    describe('constructor', () => {
      it('should set values', () => {
        const sut = new UserCollectionPresenter({
          items: [props],
          currentPage: 1,
          perPage: 2,
          lastPage: 1,
          total: 1,
        })
        expect(sut.meta).toBeInstanceOf(PaginationPresenter)
        expect(sut.meta).toStrictEqual(
          new PaginationPresenter({
            currentPage: 1,
            perPage: 2,
            lastPage: 1,
            total: 1,
          }),
        )
        expect(sut.data).toStrictEqual([new UserPresenter(props)])
      })
    })

    it('should presenter data', () => {
      let sut = new UserCollectionPresenter({
        items: [props],
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
        total: 1,
      })
      let output = instanceToPlain(sut)
      expect(output).toStrictEqual({
        data: [
          {
            id: 'e71c52a2-9710-4a96-a08e-144af4209b5d',
            name: 'test name',
            email: 'a@a.com',
            createdAt: createdAt.toISOString(),
          },
        ],
        meta: {
          currentPage: 1,
          perPage: 2,
          lastPage: 1,
          total: 1,
        },
      })

      sut = new UserCollectionPresenter({
        items: [props],
        currentPage: '1' as any,
        perPage: '2' as any,
        lastPage: '1' as any,
        total: '1' as any,
      })
      output = instanceToPlain(sut)
      expect(output).toStrictEqual({
        data: [
          {
            id: 'e71c52a2-9710-4a96-a08e-144af4209b5d',
            name: 'test name',
            email: 'a@a.com',
            createdAt: createdAt.toISOString(),
          },
        ],
        meta: {
          currentPage: 1,
          perPage: 2,
          lastPage: 1,
          total: 1,
        },
      })
    })
  })
