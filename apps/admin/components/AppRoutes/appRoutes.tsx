import { Routes, Route, Navigate } from 'react-router-dom'

import AuthRoute from '@/components/AuthRoute'
import LazyComponent from '@/ui/LazyComponent'
import { routes } from '@/routes'

const rotuerViews = (routerItems: any[]) => {
  return routerItems && routerItems.length > 0 ? (
    <>
      {routerItems.map((route) => {
        const { path, component: Component, children, redirect, isPublic } = route
        return children && children.length ? (
          <Route
            path={path}
            key={path}
            element={
              isPublic ? <LazyComponent element={<Component />} /> : <AuthRoute route={route} />
            }>
            {rotuerViews(children)}
            <Route path={path} element={<Navigate to={redirect || children[0].path} />} />
          </Route>
        ) : (
          <Route
            key={path}
            path={path}
            element={
              isPublic ? <LazyComponent element={<Component />} /> : <AuthRoute route={route} />
            }
          />
        )
      })}
    </>
  ) : null
}

const AppRoutes = () => {
  return <Routes>{rotuerViews(routes)}</Routes>
}

export default AppRoutes
