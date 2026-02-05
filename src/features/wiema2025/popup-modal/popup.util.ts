import { popUpStore } from '@/features/wiema2025/popup-modal/popup.store';

export function triggerV1Popup() {
  popUpStore
    .getState()
    .setPopup(
      'Bạn thắc mắc tại sao IEM Alumni có website mới mà đăng ký lại qua Google Form? Đúng rồi, vì chúng tôi mới build web này chưa được 1 tuần 👌🏻.'
    );
}
