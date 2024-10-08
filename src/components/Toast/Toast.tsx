// import { ToastContainer, toast } from 'react-toastify';

function Toast({
  // closeToast,
  // toastProps,
  title,
  content
}: {
  // closeToast: any;
  // toastProps: any;
  title: string;
  content: string;
}) {
  // console.log(toastProps);
  return (
    <div>
      <h2 className='text-gray-800 font-semibold'>{title}</h2>
      <p>{content}</p>
    </div>
  );
}
export default Toast;
