"use client"
import styles from './page.module.css'
import ToolBarButton from "@/app/toolBarButton";

export type ToolBarButtonProps = {
  onClearButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function ToolBarItems(props: ToolBarButtonProps) {
  return (
    <div className={styles.toolbar}>
      <ToolBarButton buttonText="clear" onClick={props.onClearButtonClick} ></ToolBarButton>
      <ToolBarButton buttonText="brush1"></ToolBarButton>
      <ToolBarButton buttonText="brush1"></ToolBarButton>
      <ToolBarButton buttonText="brush1"></ToolBarButton>
      <ToolBarButton buttonText="brush1"></ToolBarButton>
      <ToolBarButton buttonText="brush1"></ToolBarButton>
    </div>
  )
}