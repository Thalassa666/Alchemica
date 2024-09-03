import { FullLocation } from '../types/types'

/** Проверить на наличие коллизии между двумя объектами */
export const hasCollision = (
  rect1: FullLocation,
  rect2: FullLocation
): boolean => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  )
}
