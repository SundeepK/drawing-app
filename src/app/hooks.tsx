"use client"
import { MutableRefObject, useEffect, useRef } from "react";
import { OnCanvasClear, OnClickCallback, OnDrawCallback, OnFillCallback, Point } from "@/app/types";
import { func } from "prop-types";

type MousePosition = {
  clientX: number;
  clientY: number;
}

interface MouseMoveListener {
  (e: MousePosition): void;
}

interface MouseUpListener {
  (e: MousePosition): void;
}

interface MouseClickListener {
  (e: MousePosition): void;
}


export function useOnDraw(onDraw: OnDrawCallback, onclick: OnClickCallback, onCanvasClear: OnCanvasClear, onFill: OnFillCallback) {

  const canvasRef: MutableRefObject<HTMLCanvasElement> | MutableRefObject<null> = useRef(null);
  const isDrawingRef = useRef(false);
  const isClick = useRef(false);
  const isFill = useRef(false);
  const prevPointRef: MutableRefObject<Point> | MutableRefObject<null> = useRef(null);

  const mouseMoveListenerRef: MutableRefObject<MouseMoveListener> | MutableRefObject<null> = useRef(null);
  const mouseUpListenerRef: MutableRefObject<MouseUpListener> | MutableRefObject<null> = useRef(null);
  const mouseClickListenerRef: MutableRefObject<MouseClickListener> | MutableRefObject<null> = useRef(null);

  function setCanvasRef(ref: any) {
    canvasRef.current = ref;
  }

  function onCanvasMouseDown() {
    isDrawingRef.current = true;
  }

  function onClearCanvas() {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        onCanvasClear(ctx);
      }
    }
  }

  function onCanvasClick() {
    isClick.current = true;
  }


  function onFillClick() {
    isFill.current = true;
  }

  useEffect(() => {
    function computePointInCanvas(clientX: number, clientY: number): Point | null {
      if (canvasRef.current) {
        const boundingRect = canvasRef.current.getBoundingClientRect();
        return {
          x: clientX - boundingRect.left,
          y: clientY - boundingRect.top
        }
      } else {
        return null;
      }

    }

    function initMouseMoveListener() {
      const mouseMoveListener = (e: { clientX: number; clientY: number; }) => {
        if (isDrawingRef.current && canvasRef.current) {
          const point = computePointInCanvas(e.clientX, e.clientY);
          const ctx = canvasRef.current.getContext('2d');
          if (onDraw && ctx && point) onDraw(ctx, point, prevPointRef.current!);
          prevPointRef.current = point;
        }
      }
      mouseMoveListenerRef.current = mouseMoveListener;
      window.addEventListener("mousemove", mouseMoveListener);
    }

    function initMouseUpListener() {
      const listener = () => {
        isDrawingRef.current = false;
        prevPointRef.current = null;
      }
      mouseUpListenerRef.current = listener;
      window.addEventListener("mouseup", listener);
    }

    function initMouseOnClickListener() {
      const mouseClickListener = (e: { clientX: number; clientY: number; }) => {
        if (canvasRef.current) {
          if (isClick.current) {
            const point = computePointInCanvas(e.clientX, e.clientY);
            const ctx = canvasRef.current.getContext('2d');
            if (isFill.current && ctx && point) {
              onFill(ctx, point, prevPointRef.current!)
              isFill.current = false;
            } else if (onclick && ctx && point) {
              onclick(ctx, point, prevPointRef.current!);
            }
            prevPointRef.current = point;
          }
        }

      }
      mouseClickListenerRef.current = mouseClickListener;
      window.addEventListener("mousedown", mouseClickListener);
    }

    function cleanup() {
      if (mouseMoveListenerRef.current) {
        window.removeEventListener("mousemove", mouseMoveListenerRef.current);
      }
      if (mouseUpListenerRef.current) {
        window.removeEventListener("mouseup", mouseUpListenerRef.current);
      }
      if (mouseUpListenerRef.current) {
        window.removeEventListener("mousedown", mouseUpListenerRef.current);
      }
    }

    initMouseMoveListener();
    initMouseUpListener();
    initMouseOnClickListener();
    return () => cleanup();

  }, [onDraw, onclick]);

  return {
    setCanvasRef,
    onCanvasMouseDown,
    onCanvasClick,
    onFillClick,
    onClearCanvas
  }
}
