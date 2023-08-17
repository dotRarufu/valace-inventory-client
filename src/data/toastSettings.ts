import { Toast } from 'react-hot-toast';

export const toastSettings: Partial<
  Pick<
    Toast,
    | 'id'
    | 'style'
    | 'className'
    | 'icon'
    | 'duration'
    | 'ariaProps'
    | 'position'
    | 'iconTheme'
  >
> = {
  duration: 7000,
  position: 'bottom-center',
  className: 'font-semibold',
};
