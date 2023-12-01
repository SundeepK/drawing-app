"use client"
import styles from './page.module.css'
import ToolBarButton from "@/app/toolBarButton";

export type ToolBarButtonProps = {
  onClearButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  onBrushSizeChange: (size: string) => void;
  onFillClicked: () => void;
}

export function ToolBarItems(props: ToolBarButtonProps) {

  return (
    <div className={styles.toolbar}>
      <ToolBarButton buttonText="clear" onClick={props.onClearButtonClick} ></ToolBarButton>
      <ToolBarButton buttonText="small" onClick={() => props.onBrushSizeChange("small")}></ToolBarButton>
      <ToolBarButton buttonText="medium" onClick={() => props.onBrushSizeChange("medium")}></ToolBarButton>
      <ToolBarButton buttonText="large" onClick={() => props.onBrushSizeChange("large")}></ToolBarButton>
      <ToolBarButton buttonText="fill" onClick={props.onFillClicked}></ToolBarButton>
      <ToolBarButton buttonText="brush1"></ToolBarButton>
    </div>
  )
}