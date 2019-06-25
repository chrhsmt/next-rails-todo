// @flow
import Router from "next/router";

export const redirect = (ctx, target, code = 303) => {
  if (ctx.res) {
    // server
    // 303: "See other"
    ctx.res.writeHead(code, { Location: target });
    ctx.res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(target);
  }
}
