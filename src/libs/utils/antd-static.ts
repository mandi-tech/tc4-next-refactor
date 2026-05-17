import { App } from "antd";

type MessageInstance = ReturnType<typeof App.useApp>["message"];
type NotificationInstance = ReturnType<typeof App.useApp>["notification"];
type ModalInstance = ReturnType<typeof App.useApp>["modal"];

let message: MessageInstance;
let notification: NotificationInstance;
let modal: ModalInstance;

export default {
  get message() {
    return message;
  },
  get notification() {
    return notification;
  },
  get modal() {
    return modal;
  },
};

export const setStatic = (
  _message: MessageInstance,
  _notification: NotificationInstance,
  _modal: ModalInstance,
) => {
  message = _message;
  notification = _notification;
  modal = _modal;
};
