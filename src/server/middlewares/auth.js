const PROTECTED_URLS_RE = /\/admin\/.*/i;

const authMiddleware = async (ctx, next) => {
    if (PROTECTED_URLS_RE.test(ctx.request.url)) {
        console.log('protected route');
    }
    await next();
};

export { authMiddleware };
