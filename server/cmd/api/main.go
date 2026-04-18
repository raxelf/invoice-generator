package main

import (
	"github.com/gofiber/fiber/v3"
	"github.com/joho/godotenv"

	"invoice-backend/cmd/migrate"
	"invoice-backend/cmd/seed"
	"invoice-backend/internal/config"
	// "invoice-backend/internal/route"
)

func main() {
	// local env
	_ = godotenv.Load()

	db := config.ConnectDatabase()

	migrate.RunMigration(db)
	seed.RunSeeders(db)

	app := fiber.New()

	app.Get("/", func(c fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "ok"})
	})

	// route.RouteSetup(app)

	app.Listen(":8080")
}
