export interface User {
  gender: string
  name: Name
  email: string
  registered: Registered
}

export interface Name {
  title: string
  first: string
  last: string
}

export interface Registered {
  date: string
  age: number
}
