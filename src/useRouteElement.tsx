import { Navigate, Outlet, type RouteObject, useRoutes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPass from './pages/ForgotPass';
import HomeLayout from './layouts/MainLayout';
import Details from './pages/Details';
import SearchResult from './pages/SearchResult';

import UserProfile from './pages/User/UserProfile';
import Logout from './pages/Logout/Logout';
import DiscussionLayout from './layouts/DiscussionLayout/DiscussionLayout';
import DiscussionDetails from './pages/Discussion/DiscussionDetails';
import { path } from './constant/path';
import NotFound from './pages/NotFound/NotFound';
import DiscussionMovie from './pages/Discussion/DiscussionMovie';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Discussion from './pages/Discussion/Discussion';
import CastPage from './pages/CastPage/CastPage';
import TopRatedMovies from './pages/TopRatedMovies/TopRatedMovies';
import EditProfile from './pages/EditProfile/EditProfile';
import MainLayout from './layouts/MainLayout';
import ChangePass from './pages/EditProfile/ChangePass';
import useUserId from './hooks/useUserId';
import BreadCrumbsMovie from './components/BreadCrumbs/BreadCrumbsMovie';

function ProtectedRoute() {
  const { hasLogin } = useUserId();

  return hasLogin ? <Outlet /> : <Navigate to='/login' />;
}

function RejectedRoute() {
  const { hasLogin } = useUserId();
  return !hasLogin ? <Outlet /> : <Navigate to={`/`} />;
}

const AuthRouteChildren: RouteObject[] = [
  {
    path: path.login,
    element: <Login />
  },
  {
    path: path.register,
    element: <Register />
  },
  {
    path: path.forgot_password,
    element: <ForgotPass />
  }
];
export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          path: path.default,
          element: <HomePage />
        },
        {
          path: path.leaderboard,
          element: <Leaderboard />
        },
        {
          path: path.profiles,
          element: <EditProfile />
        },
        {
          path: path.change_password,
          element: <ChangePass />
        },
        {
          path: path.top_rated,
          element: <TopRatedMovies />
        },
        {
          path: path.search,
          element: <SearchResult />,
          children: [
            {
              path: path.type
            }
          ]
        },
        {
          path: path.user,
          children: [
            {
              path: path.id,
              element: <UserProfile />
            },
            {
              path: path.id,
              children: [
                {
                  path: path.type,
                  element: <UserProfile />
                }
              ]
            }
          ]
        },
        {
          path: path.logout,
          element: <Logout />
        },
        {
          path: path.details,
          children: [
            {
              path: path.default,
              element: <NotFound />
            },
            {
              path: path.id,
              element: <Details />
            },
            {
              path: path.id,
              children: [
                {
                  path: path.cast,
                  element: <CastPage />
                }
              ]
            }
          ]
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    },
    {
      element: <DiscussionLayout />,
      children: [
        {
          path: path.discussions,
          children: [
            {
              path: path.default,
              element: <Discussion />
            },
            {
              path: path.discussion_id,
              element: <DiscussionDetails />
            }
          ]
        },
        {
          path: path.details,
          children: [
            {
              path: path.id,
              children: [
                {
                  path: path.discussions,
                  children: [
                    {
                      path: path.default,
                      element: <DiscussionMovie />
                    },
                    {
                      path: path.discussion_id,
                      element: <DiscussionDetails />
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      element: <RejectedRoute />,
      children: [
        {
          children: AuthRouteChildren
        }
      ]
    }
  ]);
  return routeElement;
}
