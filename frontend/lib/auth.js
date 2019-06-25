// @flow
import { redirect } from './redirect'
import gql from 'graphql-tag'
import cookie from 'cookie'

export const getToken = ctx => {
  const cookies = cookie.parse(process.browser ? document.cookie : (ctx ? ctx.req.headers.cookie || '' : ''));
  return cookies.token;
};

export const setToken = token => {
  document.cookie = cookie.serialize('token', token, {
    maxAge: 30 * 24 * 60 * 60 // 30 days
  });
};

export const afterSignInPath = '/tasks';
export const signInPath = '/sign_in';

export const requireLogin = async (ctx) => {
  const viewer = await getViewer(ctx.apolloClient)

  if (!viewer.loggedIn) {
    redirect(ctx, signInPath);
    return null;
  }

  return viewer;
};

export const getViewer = client =>
  client
    .query({
      query: gql`
        query getViewer {
          viewer{ 
            user {
              id
              name
            }
          }
        }
      `
    })
    .then(({ data }) => {
      const { viewer } = data
      return {
        user: viewer.user,
        loggedIn: viewer.user != null
      }
    })
    .catch(() => {
      // Fail gracefully
      return {
        loggedIn: false
      }
    });

export const redirectToSignInPath = (ctx = null) => {
  redirect(ctx || {}, signInPath);
};

export const redirectToAfterSignInPath = (ctx = null) => {
  redirect(ctx || {}, afterSignInPath);
};

export const logout = () => {
  document.cookie = cookie.serialize('token', '', {
    expires: 'Thu, 01 Jan 1970 00:00:00 GMT'
  });
}
