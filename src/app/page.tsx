"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Canvas from "@/app/canvas";
import { ToolBar } from "@/app/toolBar";
import { ColorResult, GithubPicker } from 'react-color';
import { ToolBarItems } from "@/app/toolBarItems";
import { useState } from "react";

const canvasStyle = {
  border: "1px solid black"
}

export default function Home() {


  return (
    <main className={styles.main}>
      <p>Hello world</p>
      <Canvas width={500}
              height={500}
              canvasStyle={canvasStyle}
      />
    </main>
  )
}
