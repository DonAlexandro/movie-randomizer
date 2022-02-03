import { notification } from 'antd';

export const useError = (error) => {
  const status = error?.originalStatus;

  const errors = {
    404: 'Щось пішло не так і ми не змогли знайти жодного кінчеза 😔'
  };

  const triggerError = () => {
    notification.error({
      message: 'Онамаєш, помилка...',
      description: errors[status] || 'Сталося щось непердбачуване'
    });
  };

  return { triggerError };
};
