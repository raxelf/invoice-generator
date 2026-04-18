package middleware

import (
	"invoice-backend/internal/utils"
	"strings"

	"github.com/gofiber/fiber/v3"
)

func Authorization(c fiber.Ctx) error {
	authHeader := c.Get("Authorization")
	if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"code":    fiber.StatusUnauthorized,
			"message": "Unauthorized",
		})
	}

	tokenString := strings.TrimPrefix(authHeader, "Bearer ")

	claims, err := utils.ParseToken(tokenString)
	if err != nil || claims.ID == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"code":    fiber.StatusUnauthorized,
			"message": "Unauthorized",
		})
	}

	c.Locals("user_id", claims.ID)
	c.Locals("user_role", claims.Role)

	return c.Next()
}
