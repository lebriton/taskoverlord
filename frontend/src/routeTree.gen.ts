/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as FavoritesImport } from './routes/favorites'
import { Route as CreateTasksImport } from './routes/create-tasks'

// Create Virtual Routes

const TagsLazyImport = createFileRoute('/tags')()
const SearchLazyImport = createFileRoute('/search')()
const ProjectsLazyImport = createFileRoute('/projects')()
const NextLazyImport = createFileRoute('/next')()
const CompletedLazyImport = createFileRoute('/completed')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const TagsLazyRoute = TagsLazyImport.update({
  id: '/tags',
  path: '/tags',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/tags.lazy').then((d) => d.Route))

const SearchLazyRoute = SearchLazyImport.update({
  id: '/search',
  path: '/search',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/search.lazy').then((d) => d.Route))

const ProjectsLazyRoute = ProjectsLazyImport.update({
  id: '/projects',
  path: '/projects',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/projects.lazy').then((d) => d.Route))

const NextLazyRoute = NextLazyImport.update({
  id: '/next',
  path: '/next',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/next.lazy').then((d) => d.Route))

const CompletedLazyRoute = CompletedLazyImport.update({
  id: '/completed',
  path: '/completed',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/completed.lazy').then((d) => d.Route))

const FavoritesRoute = FavoritesImport.update({
  id: '/favorites',
  path: '/favorites',
  getParentRoute: () => rootRoute,
} as any)

const CreateTasksRoute = CreateTasksImport.update({
  id: '/create-tasks',
  path: '/create-tasks',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/create-tasks': {
      id: '/create-tasks'
      path: '/create-tasks'
      fullPath: '/create-tasks'
      preLoaderRoute: typeof CreateTasksImport
      parentRoute: typeof rootRoute
    }
    '/favorites': {
      id: '/favorites'
      path: '/favorites'
      fullPath: '/favorites'
      preLoaderRoute: typeof FavoritesImport
      parentRoute: typeof rootRoute
    }
    '/completed': {
      id: '/completed'
      path: '/completed'
      fullPath: '/completed'
      preLoaderRoute: typeof CompletedLazyImport
      parentRoute: typeof rootRoute
    }
    '/next': {
      id: '/next'
      path: '/next'
      fullPath: '/next'
      preLoaderRoute: typeof NextLazyImport
      parentRoute: typeof rootRoute
    }
    '/projects': {
      id: '/projects'
      path: '/projects'
      fullPath: '/projects'
      preLoaderRoute: typeof ProjectsLazyImport
      parentRoute: typeof rootRoute
    }
    '/search': {
      id: '/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof SearchLazyImport
      parentRoute: typeof rootRoute
    }
    '/tags': {
      id: '/tags'
      path: '/tags'
      fullPath: '/tags'
      preLoaderRoute: typeof TagsLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/create-tasks': typeof CreateTasksRoute
  '/favorites': typeof FavoritesRoute
  '/completed': typeof CompletedLazyRoute
  '/next': typeof NextLazyRoute
  '/projects': typeof ProjectsLazyRoute
  '/search': typeof SearchLazyRoute
  '/tags': typeof TagsLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/create-tasks': typeof CreateTasksRoute
  '/favorites': typeof FavoritesRoute
  '/completed': typeof CompletedLazyRoute
  '/next': typeof NextLazyRoute
  '/projects': typeof ProjectsLazyRoute
  '/search': typeof SearchLazyRoute
  '/tags': typeof TagsLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/create-tasks': typeof CreateTasksRoute
  '/favorites': typeof FavoritesRoute
  '/completed': typeof CompletedLazyRoute
  '/next': typeof NextLazyRoute
  '/projects': typeof ProjectsLazyRoute
  '/search': typeof SearchLazyRoute
  '/tags': typeof TagsLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/create-tasks'
    | '/favorites'
    | '/completed'
    | '/next'
    | '/projects'
    | '/search'
    | '/tags'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/create-tasks'
    | '/favorites'
    | '/completed'
    | '/next'
    | '/projects'
    | '/search'
    | '/tags'
  id:
    | '__root__'
    | '/'
    | '/create-tasks'
    | '/favorites'
    | '/completed'
    | '/next'
    | '/projects'
    | '/search'
    | '/tags'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  CreateTasksRoute: typeof CreateTasksRoute
  FavoritesRoute: typeof FavoritesRoute
  CompletedLazyRoute: typeof CompletedLazyRoute
  NextLazyRoute: typeof NextLazyRoute
  ProjectsLazyRoute: typeof ProjectsLazyRoute
  SearchLazyRoute: typeof SearchLazyRoute
  TagsLazyRoute: typeof TagsLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  CreateTasksRoute: CreateTasksRoute,
  FavoritesRoute: FavoritesRoute,
  CompletedLazyRoute: CompletedLazyRoute,
  NextLazyRoute: NextLazyRoute,
  ProjectsLazyRoute: ProjectsLazyRoute,
  SearchLazyRoute: SearchLazyRoute,
  TagsLazyRoute: TagsLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/create-tasks",
        "/favorites",
        "/completed",
        "/next",
        "/projects",
        "/search",
        "/tags"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/create-tasks": {
      "filePath": "create-tasks.tsx"
    },
    "/favorites": {
      "filePath": "favorites.tsx"
    },
    "/completed": {
      "filePath": "completed.lazy.tsx"
    },
    "/next": {
      "filePath": "next.lazy.tsx"
    },
    "/projects": {
      "filePath": "projects.lazy.tsx"
    },
    "/search": {
      "filePath": "search.lazy.tsx"
    },
    "/tags": {
      "filePath": "tags.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
