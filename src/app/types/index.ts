
export interface OnDrawCallback {
  (ctx: CanvasRenderingContext2D, point: Point, prevPoint: Point): void;
}

export interface OnCanvasClear {
  (ctx: CanvasRenderingContext2D): void;
}

export interface OnClickCallback {
  (ctx: CanvasRenderingContext2D, point: Point, prevPoint: Point): void;
}

export interface OnFillCallback {
  (ctx: CanvasRenderingContext2D, point: Point, prevPoint: Point): void;
}

export type Point = {
  x: number;
  y: number;
}