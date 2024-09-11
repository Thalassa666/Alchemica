import { GameColors } from '@game/constants/misc'
import { hasCollision } from '@game/helpers/hasCollision'
import { CanvasContext, Collision, FullLocation } from '@game/types/types'
import { useCallback, useRef } from 'react'

type ObservableEvents = {
  onClick?: () => void
  onMouseIn?: () => void
  onMouseOut?: () => void
}

type Subscriber = {
  collision: Collision
  events: ObservableEvents
}

class Observer {
  static _instance: Observer | null
  subscribers: Record<Collision['name'], Subscriber> = {}
  lastHovered: Subscriber | null = null

  constructor() {
    if (Observer._instance) {
      return Observer._instance
    }

    Observer._instance = this
  }

  public subscribe(collision: Collision, events: ObservableEvents): void {
    this.subscribers[collision.name] = { collision, events }
  }

  public unSubscribe(collisionName: Collision['name']): void {
    delete this.subscribers[collisionName]
  }

  public checkIsSubscribed(collisionName: Collision['name']): boolean {
    return Boolean(this.subscribers[collisionName])
  }

  public findCollisions(location: FullLocation): Subscriber[] | undefined {
    return Object.values(this.subscribers).filter(subscriber => {
      return hasCollision(subscriber.collision, location)
    })
  }

  public setHovered(subscriber: Subscriber | null) {
    this.lastHovered = subscriber
  }

  public getHovered() {
    return this.lastHovered
  }

  public getSubscribers() {
    return this.subscribers
  }
}

const observer = new Observer()

const getMouseLocation = (evt: MouseEvent): FullLocation => {
  return {
    x: evt.offsetX,
    y: evt.offsetY,
    width: 1,
    height: 1,
  }
}

/** Использовать область коллизии для взаимодействия с мышью */
export const useMouseInteraction = () => {
  const contextRef = useRef<CanvasContext | null>(null)

  const handleClick = useCallback((evt: MouseEvent) => {
    if (!contextRef.current) {
      return
    }

    const collisions = observer.findCollisions(getMouseLocation(evt))

    collisions?.forEach(collision => {
      collision.events.onClick?.()
    })
  }, [])

  const handleMouseMove = useCallback((evt: MouseEvent) => {
    if (!contextRef.current) {
      return
    }

    const collisions = observer.findCollisions(getMouseLocation(evt))

    collisions?.forEach(collision => {
      observer.setHovered(collision)
      collision.events.onMouseIn?.()
    })

    const lastsHovered = observer.getHovered()

    if (!collisions?.length && lastsHovered) {
      lastsHovered.events.onMouseOut?.()
    }
  }, [])

  const init = (context: CanvasContext) => {
    contextRef.current = context
    context.canvas.addEventListener('click', handleClick)
    context.canvas.addEventListener('mousemove', handleMouseMove)
  }

  const destroy = (context: CanvasContext) => {
    contextRef.current = null
    context.canvas.removeEventListener('click', handleClick)
    context.canvas.removeEventListener('mousemove', handleMouseMove)
  }

  const subscribe = (collision: Collision, events: ObservableEvents) => {
    observer.subscribe(collision, events)
  }

  const unSubscribe = (name: Collision['name']) => {
    observer.unSubscribe(name)
  }

  const draw = (
    context: CanvasContext,
    collision: Collision,
    events: ObservableEvents
  ) => {
    if (!observer.checkIsSubscribed(collision.name)) {
      subscribe(collision, events)
    }

    const position = { x: collision.x, y: collision.y }
    const size = { width: collision.width, height: collision.height }

    context.ctx.fillStyle = GameColors.MouseInteractionObject
    context.ctx.fillRect(position.x, position.y, size.width, size.height)
  }

  return {
    init,
    destroy,
    draw,
    subscribe,
    unSubscribe,
  }
}
