import express from "express"

import morgan from "morgan";
const prefix = "/socialbudget"

/**
 * Initializes the routes for the application.
 * @param app - The express application instance.
 */
function initRoutes(app) {
    app.use(morgan("dev")) // Log requests to the console
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    /**
     * The authenticator object is used to authenticate users.
     * It is used to protect the routes by requiring users to be logged in.
     * It is also used to protect routes by requiring users to have the correct role.
     * All routes must have the authenticator object in order to work properly.
     */
    // const authenticator = new Authenticator(app)
    // const userRoutes = new UserRoutes(authenticator)
    // const authRoutes = new AuthRoutes(authenticator)
    // const productRoutes = new ProductRoutes(authenticator)
    // const cartRoutes = new CartRoutes(authenticator)
    // const reviewRoutes = new ReviewRoutes(authenticator)

    /**
     * The routes for the user, authentication, product, proposal, and cart resources are defined here.
     */
    app.use(`${prefix}/users`, userRoutes.getRouter())
    app.use(`${prefix}/sessions`, authRoutes.getRouter())
    app.use(`${prefix}/products`, productRoutes.getRouter())
    app.use(`${prefix}/carts`, cartRoutes.getRouter())
    app.use(`${prefix}/reviews`, reviewRoutes.getRouter())

    // ErrorHandler.registerErrorHandler(app)
}

export default initRoutes