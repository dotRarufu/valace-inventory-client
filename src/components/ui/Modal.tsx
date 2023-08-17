import { ReactNode } from 'react';

type Props = {
  id: string;
  content: ReactNode;
};

const Modal = ({ id, content }: Props) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box p-0 rounded-[5px]">{content}</div>
        {/* <label className="modal-backdrop" htmlFor="my_modal_7"></label> */}
      </div>
    </>
    // <dialog id={id} className="modal">
    //   {/* <form method="dialog" className="modal-box">
    //     <h3 className="font-bold text-lg">Hello!</h3>
    //     <p className="py-4">Press ESC key or click outside to close</p>
    //   </form>
    //   <form method="dialog" className="modal-backdrop">
    //     <button>close</button>
    //   </form> */}
    //   {content}
    // </dialog>
  );
};

export default Modal;
