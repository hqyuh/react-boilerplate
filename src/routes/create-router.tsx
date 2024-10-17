// import ProtectedRoute from '@/routes/protectedRoute';
// import { Suspense } from 'react';
// import { Navigate, type IndexRouteObject, type RouteObject } from 'react-router-dom';
// import TopBarProgress from 'react-topbar-progress-indicator';

// export type TRouter = {
//   path?: string;
//   index?: true;
//   component?: JSX.Element;
//   element?: React.LazyExoticComponent<(props: TA) => JSX.Element>;
//   errorElement?: React.LazyExoticComponent<(props: TA) => JSX.Element>;
//   redirectTo?: string;
//   role?: string[];
//   children?: TRouter[];
// };

// const createRouter = (routes: TRouter[]) =>
//   routes.map((item) => {
//     const itemResult: RouteObject = {};

//     if (item.path) {
//       itemResult.path = item.path;
//     }

//     if (item.index) {
//       (itemResult as unknown as IndexRouteObject).index = true;
//     }

//     if (item.component) {
//       itemResult.element = item.component;
//     }

//     if (item.element) {
//       const ElementComponent = (
//         <Suspense fallback={<TopBarProgress />}>
//           {item.role ? (
//             <ProtectedRoute role={item.role ?? []}>
//               <item.element />
//             </ProtectedRoute>
//           ) : (
//             <item.element />
//           )}
//         </Suspense>
//       );

//       itemResult.element = ElementComponent;
//     }

//     if (item.errorElement) {
//       itemResult.errorElement = (
//         <Suspense fallback={null}>
//           <item.errorElement />
//         </Suspense>
//       );
//     }

//     if (item.redirectTo) {
//       itemResult.element = <Navigate to={item.redirectTo} replace />;

//       return itemResult;
//     }

//     if (item.children) {
//       itemResult.children = createRouter(item.children);
//     }

//     return itemResult;
//   });

// export default createRouter;
