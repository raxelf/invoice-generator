package main

import (
	"github.com/gofiber/fiber/v3"
	"github.com/joho/godotenv"

	"invoice-backend/cmd/migrate"
	"invoice-backend/cmd/seed"
	"invoice-backend/internal/config"
	"invoice-backend/internal/route"
)

func main() {
	// local env
	_ = godotenv.Load()

	db := config.ConnectDatabase()

	migrate.RunMigration(db)
	seed.RunSeeders(db)

	app := fiber.New(fiber.Config{
		ErrorHandler: func(c fiber.Ctx, err error) error {
			code := fiber.StatusInternalServerError
			message := "Internal server error"

			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
				message = e.Message
			}

			return c.Status(code).JSON(fiber.Map{
				"code":    code,
				"message": message,
			})
		},
	})

	// pass app & db to routes
	route.RouteSetup(app, db)

	app.Listen(":8080")
}
