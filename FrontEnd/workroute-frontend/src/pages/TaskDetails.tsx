// import { lazy, Suspense } from 'react';
// import { useParams } from 'react-router-dom';

// const LiveMap = lazy(() => import('../components/LiveMap'));

// export default function TaskDetails() {
//   const { id } = useParams();

//   return (
//     <div>
//       <h2>Task Details</h2>

//       <Suspense fallback={<p>Loading map...</p>}>
//         <LiveMap taskId={id!} />
//       </Suspense>
//     </div>
//   );
// }
