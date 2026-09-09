import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { clearOauthMessage } from '../redux/authSlice';
import { consumeOAuthPending } from '../utils/googleOAuth';
import { homePathForRole } from '../utils/authHome';
import { toastAuthFeedback } from '../utils/authToasts';

/**
 * After Google OAuth the backend lands on /practice. Once initializeAuth has
 * exchanged the refresh token, send USER / ADMIN to their panel and toast the
 * backend message from the refresh envelope.
 */
export const OAuthReturnHandler: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handled = useRef(false);
  const { initialized, isAuthenticated, user } = useAppSelector((s) => s.auth);
  const oauthMessage = useAppSelector((s) => s.auth.oauthMessage);

  useEffect(() => {
    if (handled.current || !initialized) return;
    if (!consumeOAuthPending()) return;
    handled.current = true;

    if (!isAuthenticated || !user) return;

    if (oauthMessage) {
      toastAuthFeedback({ message: oauthMessage, errors: null }, 'success');
      dispatch(clearOauthMessage());
    }
    navigate(homePathForRole(user.role), { replace: true });
  }, [initialized, isAuthenticated, user, oauthMessage, navigate, dispatch]);

  return null;
};
