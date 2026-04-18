package main

import (
	"github.com/gofiber/fiber/v3"
	"github.com/joho/godotenv"

	"invoice-backend/internal/config"
	// "invoice-backend/internal/route"
)

func main() {
	// local env
	_ = godotenv.Load()

	config.ConnectDatabase()

	app := fiber.New()
	
	// route.RouteSetup(app)
	app.Get("/", func(c fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "ok"})
	})

	app.Listen(":8080")
}