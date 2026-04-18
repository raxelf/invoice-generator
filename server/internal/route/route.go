package route

import "github.com/gofiber/fiber/v3"

func RouteSetup(app *fiber.App) {
	api := app.Group("/api")

	// Public Routes
	api.Post("/login", nil)
	api.Get("/items", nil)

	// Protected Routes
	api.Post("/invoice", nil)
}