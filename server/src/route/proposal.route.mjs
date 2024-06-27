import express, { Router } from "express"
import { body, param } from "express-validator"
// import CartController from "../controllers/cartController"


/**
 * Represents a class that defines the routes for handling proposals
 */
class CartRoutes {
    private controller
    private router
    // private authenticator: Authenticator

    /**
     * Constructs a new instance of the CartRoutes class.
     * @param {Authenticator} authenticator - The authenticator object used for authentication.
     */
    constructor(authenticator) {
        this.authenticator = authenticator
        this.controller = new CartController()
        this.router = express.Router()
        this.errorHandler = new ErrorHandler()
        this.initRoutes();
    }

    /**
     * Returns the router instance.
     * @returns The router instance.
     */
    getRouter() {
        return this.router;
    }

    /**
     * Initializes the routes for the cart router.
     * 
     * @remarks
     * This method sets up the HTTP routes for creating, retrieving, updating, and deleting cart data.
     * It can (and should!) apply authentication, authorization, and validation middlewares to protect the routes.
     */
    initRoutes() {

        /**
         * Route for getting the cart of the logged in customer.
         * It requires the user to be logged in and to be a customer.
         * It returns the cart of the logged in customer.
         */
        this.router.get(
            "/",
            [
                this.authenticator.isLoggedIn,
                this.authenticator.isCustomer
            ],
            (req: any, res: any, next: any) => this.controller.getCart(req.user)
                .then((cart: Cart) => res.status(200).json(cart))
                .catch((err) => next(err))
        )
    }
}