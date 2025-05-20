import { useContext } from "react"
import { useNotificationMessage } from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  const notification = useNotificationMessage()

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
