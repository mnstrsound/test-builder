const routeBuilder = (router, route, Model, additionalRoutes = []) => {
    additionalRoutes.forEach((additionRoute) => {
        router[additionRoute.method](`/${route}/${additionRoute.route}`, additionRoute.handler);
    });

    router
        .get(`/${route}`, async (ctx) => {
            ctx.body = await Model.find({});
        })
        .get(`/${route}/:id`, async (ctx) => {
            const { id: _id } = ctx.params;
            ctx.body = await Model.find({ _id });
        })
        .post(`/${route}`, async (ctx) => {
            ctx.body = await new Model(ctx.request.body).save();
        })
        .put(`/${route}/:id`, async (ctx) => {
            const { id } = ctx.params;
            const { body } = ctx.request;
            const model = await Model.findById(id);
            model.set(body);
            ctx.body = await model.save();
        })
        .del(`/${route}/:id`, async (ctx) => {
            const { id } = ctx.params;
            ctx.body = await Model.delete({ where: { id } });
        });
};

export { routeBuilder };
