import { createBrowserRouter, Navigate } from 'react-router';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { InterviewSetup } from './pages/InterviewSetup';
import { InterviewRoom } from './pages/InterviewRoom';
import { InterviewResults } from './pages/InterviewResults';
import { InterviewFeedback } from './pages/InterviewFeedback';
import { Badges } from './pages/Badges';
import { Practice } from './pages/Practice';
import { History } from './pages/History';
import { Profile } from './pages/Profile';
import { Leaderboard } from './pages/Leaderboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/interview-setup',
    element: <InterviewSetup />,
  },
  {
    path: '/interview-room',
    element: <InterviewRoom />,
  },
  {
    path: '/interview-results',
    element: <InterviewResults />,
  },
  {
    path: '/interview-feedback',
    element: <InterviewFeedback />,
  },
  {
    path: '/badges',
    element: <Badges />,
  },
  {
    path: '/practice',
    element: <Practice />,
  },
  {
    path: '/history',
    element: <History />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />,
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);
