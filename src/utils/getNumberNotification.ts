import { NotificationType } from "../assets/interfaces";

const getNumberNotification = (notifications:NotificationType[]) => {
    const newNotifications = notifications.filter(notification => notification.read == false);
    return newNotifications.length
}

export default getNumberNotification;