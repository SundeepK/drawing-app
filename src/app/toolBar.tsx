"use client"

import { ToolBarItems } from "@/app/toolBarItems";
import { ColorResult, CompactPicker } from 'react-color';
import styles from './page.module.css'

interface OnColorChange {
  (e: ColorResult): void;
}

export type ToolBarProps = {
  onColorChange: OnColorChange;
  onClear: React.MouseEventHandler<HTMLButtonElement>;
  onBrushSizeChange: (size: string) => void;
  onFillClicked: () => void;
}

export function ToolBar(props: ToolBarProps) {

  return (
    <div className={styles.toolOne}>
      <CompactPicker onChangeComplete={props.onColorChange}/>
      <ToolBarItems onClearButtonClick={props.onClear}
                    onFillClicked={props.onFillClicked}
                    onBrushSizeChange={props.onBrushSizeChange}/>
    </div>
  )

}