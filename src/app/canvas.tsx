"use client"
import { Point } from "@/app/types";
import { CSSProperties, MouseEventHandler, useState } from "react";
import { useOnDraw } from "@/app/hooks";
import { ColorResult } from "react-color";
import { ToolBar } from "@/app/toolBar";

export type CanvasProps = {
  width: number;
  height: number;
  canvasStyle: CSSProperties;
}

export default function Canvas(props: CanvasProps) {
  const {
    setCanvasRef,
    onCanvasClick,
    onCanvasMouseDown,
    onClearCanvas
  } = useOnDraw(onDraw, onClick, clearCanvas);

  const [color, setColor] = useState("#000000");

  function onDraw(ctx: CanvasRenderingContext2D, point: Point, prevPoint: Point) {
    drawLine(prevPoint, point, ctx, color, 5);
  }

  function onClick(ctx: CanvasRenderingContext2D, point: Point, prevPoint: Point) {
    drawClick(prevPoint, point, ctx, color, 5);
  }

  function clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, props.width, props.height);
  }

  function drawClick(
    start: Point,
    end: Point,
    ctx: CanvasRenderingContext2D ,
    color: string | CanvasGradient | CanvasPattern,
    width: number,
  ) {
    ctx.lineWidth = width;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(end.x, end.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  function drawLine(
    start: Point,
    end: Point,
    ctx: CanvasRenderingContext2D ,
    color: string | CanvasGradient | CanvasPattern,
    width: number,
  ) {
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();

  }

  const onColorChange = (newColor: ColorResult) => {
    console.log("color changes", newColor.hex)
    setColor(newColor.hex);
  }

  return(
    <>
      <canvas
        width={props.width}
        height={props.height}
        onMouseDown={onCanvasMouseDown}
        onClick={onCanvasClick}
        style={props.canvasStyle}
        ref={setCanvasRef}
      />
      <ToolBar
        onClear={onClearCanvas}
        onColorChange={onColorChange}
      />
    </>

  );

}