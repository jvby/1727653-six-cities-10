

export type CommentType = {
  comment: string
  date: string
  id: number
  rating: number
  user: User
}

type User = {
  avatarUrl: string
  id: number
  isPro: boolean
  name: string
}

export type CommentData = {
  comment: string
  rating: number
  roomID: number | undefined
  onSuccess: () => void
}

export type Ratings = {
  rating: number;
  title: string;
}
