import styles from "@/app/page.module.css";

export type ToolBarButtonProps = {
  buttonText: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function ToolBarButton(props: ToolBarButtonProps) {
  return (
    <button className={styles.toolBarButton} onClick={props.onClick}>{props.buttonText}</button>
  )
}