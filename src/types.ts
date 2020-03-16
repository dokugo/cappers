export interface User {
  id: number
  name: string
}

export interface InitPost {
  userId: number
  id: number
  title: string
  body: string
}

export interface Post extends InitPost {
  userName: User['name'] | undefined
}

export enum Sort {
  ASC,
  DESC,
}
