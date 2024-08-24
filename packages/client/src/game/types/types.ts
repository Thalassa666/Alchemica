import { Direction } from '../constants/player'

export type CanvasContext = {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
}

export type Position = {
  x: number
  y: number
}

export type Size = {
  width: number
  height: number
}

export type DirectionType = typeof Direction[keyof typeof Direction]

export type PlayerState = {
  position: Position
  velocity: Position
  size: Size
  lastDirectionX: typeof Direction.Left | typeof Direction.Right
}

export type Collision = Position &
  Size & {
    name: string
  }

export type CollisionMap<T extends Collision> = {
  [collisionName: string]: T
}

export type CraftTool = Collision

export type CraftToolsState = {
  nearPlayer: CraftTool | null
  active: CraftTool | null
}

export type InventoryItem = {
  name: string
  imgSrc: string
}

export type InventoryState = {
  all: InventoryItem[]
  selected: (InventoryItem | null)[]
  selectingIndex: number
  isPicking: boolean
}
