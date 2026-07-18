import { HttpInterceptorFn } from '@angular/common/http';

const LS_KEY = 'quantify_session';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const session = JSON.parse(raw);
      const token = session.userToken ?? session.token;
      if (token) {
        const cloned = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        return next(cloned);
      }
    }
  } catch { /* ignore */ }
  return next(req);
};
