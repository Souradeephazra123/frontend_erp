import { toast } from "sonner";

import { ProgressActivityIcon } from "./icons/progress-activity.tsx";

export function toastLoading(message) {
  return toast.info(message, {
    icon: <ProgressActivityIcon className="animate-spin" />,
    duration: Infinity,
  });
}

function SuccessIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"
      />
    </svg>
  );
}

export function toastSuccess(message, id) {
  return toast.success(message, {
    id,
    icon: <SuccessIcon />,
  });
}

function ErrorIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm0 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-9q.425 0 .713-.288T13 12V8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8v4q0 .425.288.713T12 13Z"
      />
    </svg>
  );
}

export function toastError(message, id) {
  console.log("Toast Error:", message, id); // Debugging
  return toast.error(message, {
    id,
    icon: <ErrorIcon />,
  });
}

// interface TPromiseStateMessages {
//   loading: string;
//   success: string;
//   error: string;
// }

// export function toastPromise(
//   promise,
//   { error, loading, success },
// ) {
//   return toast.promise(promise, {
//     loading: (
//       <>
//         <ProgressActivityIcon className="animate-spin" />
//         {loading}
//       </>
//     ),

//     success: (
//       <>
//         <SuccessIcon />
//         {success}
//       </>
//     ),

//     error: (
//       <>
//         <ErrorIcon />
//         {error}
//       </>
//     ),
//   });
// }
