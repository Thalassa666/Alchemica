/// <reference types="vite/client" />
interface CanvasRenderingContext2D {
  roundRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radii: number | DOMPointInit | DOMPointInit[]
  ): void
}
