"use client"
import { Point } from "@/app/types";
import { CSSProperties, MouseEventHandler, useState } from "react";
import { useOnDraw } from "@/app/hooks";
import { ColorResult, RGBColor } from "react-color";
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
    onClearCanvas,
    onFillClick
  } = useOnDraw(onDraw, onClick, clearCanvas, fill);

  const [color, setColor] = useState({ r: 0, b: 0, g: 0} as RGBColor);
  const [brushSize, setBrushSize] = useState(5);
  const [arcSize, seArcSize] = useState(2);

  function onDraw(ctx: CanvasRenderingContext2D, point: Point, prevPoint: Point) {
    drawLine(prevPoint, point, ctx, color);
  }

  function onClick(ctx: CanvasRenderingContext2D, point: Point, prevPoint: Point) {
    drawClick(prevPoint, point, ctx, color);
  }

  function clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, props.width, props.height);
  }

  function fill(ctx: CanvasRenderingContext2D, point: Point, prevPoint: Point){
    console.log("fill called")
    floodFill(ctx, point)
  }

  function getPixelColor(img: any, point: Point) {
    var data = img.data;
    var offset = ((point.y * (img.width * 4)) + (point.x * 4));
    return (data[offset + 0] << 24) | (data[offset + 1] << 16) | (data[offset + 2] << 8);
  }

  function floodFill(ctx: CanvasRenderingContext2D, point: Point) {
    var canvasWidth = ctx.canvas.clientWidth;
    var canvasHeight = ctx.canvas.clientHeight;
    var dx = [ 0, -1, +1,  0];
    var dy = [-1,  0,  0, +1];
    var img = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    var imgData = img.data;
    var hitColor = getPixelColor(img, point);
    // console.log("hitColor", hitColor)
    // if (hitColor !== 0) { return; }
    var newColor = 1711315200;
    var hitColorR = (hitColor >> 24) & 0xFF;
    var hitColorG = (hitColor >> 16) & 0xFF;
    var hitColorB = (hitColor >> 8) & 0xFF;

    var newColorR = (newColor >> 24) & 0xFF;
    var newColorG = (newColor >> 16) & 0xFF;
    var newColorB = (newColor >>  8) & 0xFF;

    var stack = [point];

    while (stack.length > 0) {
      let curPoint = stack.pop()!;

      for (var i = 0; i < 4; i++) {
        var nextPointX = curPoint.x + dx[i];
        var nextPointY = curPoint.y + dy[i];

        if (nextPointX < 0 || nextPointY < 0 || nextPointX >= canvasWidth || nextPointY >= canvasHeight) { continue; }

        var nPO = (nextPointY * canvasWidth + nextPointX) * 4; // nextPointOffset

        if (imgData[nPO + 0] === hitColorR && imgData[nPO + 1] === hitColorG && imgData[nPO + 2] === hitColorB) {
          imgData[nPO + 0] = newColorR;
          imgData[nPO + 1] = newColorG;
          imgData[nPO + 2] = newColorB;

          stack.push({x:nextPointX, y: nextPointY});
        }
      }
    }

    ctx.putImageData(img, 0, 0);
  }

  function drawClick(
    start: Point,
    end: Point,
    ctx: CanvasRenderingContext2D ,
    color: RGBColor,
  ) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    ctx.lineWidth = brushSize;
    // ctx.arc(end.x, end.y, arcSize, 0, (arcSize * 0.5) * Math.PI);
    ctx.ellipse(end.x, end.y, arcSize, arcSize, 0, 0, Math.PI * 2)
    ctx.fill();
    console.log(`click arc ${arcSize} brush ${brushSize}`)

  }

  function drawLine(
    start: Point,
    end: Point,
    ctx: CanvasRenderingContext2D ,
    color: RGBColor,
  ) {
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    if (brushSize >= 5)  {
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
      ctx.beginPath();
      ctx.arc(start.x, start.y, arcSize, 0, 2 * Math.PI);
      ctx.fill();
    }

  }

  const onColorChange = (newColor: ColorResult) => {
    setColor(newColor.rgb);
  }

  const onUseSmallBrush = (size: string) => {
    if (size === "small") {
      setBrushSize(() => 3);
      seArcSize(() => 0.07);
      console.log(`small clicked ${arcSize} ${brushSize}`)
    } else if (size === "medium") {
      setBrushSize(() => 5);
      seArcSize(() => 2);
    } else if (size === "large") {
      setBrushSize(() => 8);
      seArcSize(() => 4);
    }

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
        onBrushSizeChange={onUseSmallBrush}
        onFillClicked={onFillClick}
      />
    </>

  );

}