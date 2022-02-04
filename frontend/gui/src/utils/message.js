import { Modal } from "antd"

export const errorMessage = () => {
    let secondsToGo = 3;
    const modal =   Modal.error({
      title: 'Error! Something went wrong',
      content: `This modal will be destroyed after ${secondsToGo} second.`
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `This modal will be destroyed after ${secondsToGo} second.`
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  };
  
  export const successMessage = () => {
    let secondsToGo = 3;
    const modal = Modal.success({
      title: "Successfully",
      content: `This modal will be destroyed after ${secondsToGo} second.`
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `This modal will be destroyed after ${secondsToGo} second.`
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  };