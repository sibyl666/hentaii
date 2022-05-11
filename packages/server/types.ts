export type Permission = "UPLOAD" | "DELETE";

export interface User {
  id: string,
  username: string,
  permissions: Permission[],
  password: string,
  favorites: string[]  
}

export interface Manga {
  id: string,
  title: string,
  artist?: string,
  tags?: string[],
  count: number
}
