package route

import (
	"invoice-backend/internal/handler"

	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
)

func RouteSetup(app *fiber.App, db *gorm.DB) {
	h := &handler.Handler{DB: db}
	api := app.Group("/api")

	// Public Routes
	api.Post("/login", h.Login)
	// api.Get("/items", nil)

	// // Protected Routes
	// api.Post("/invoice", nil)
}
