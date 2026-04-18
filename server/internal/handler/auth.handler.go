package handler

import (
	"invoice-backend/internal/repository"
	"invoice-backend/internal/utils"

	"github.com/gofiber/fiber/v3"
)

type LoginInput struct {
	Email    string `json:"email" form:"email" validate:"required,email"`
	Password string `json:"password" form:"password" validate:"required"`
}

func (h *Handler) Login(c fiber.Ctx) error {
	var input LoginInput

	if err := c.Bind().Body(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"code":    fiber.StatusBadRequest,
			"message": "Invalid request body",
		})
	}

	user, err := repository.FindUserByEmail(h.DB, input.Email)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"code":    fiber.StatusUnauthorized,
			"message": "Invalid email or password",
		})
	}

	if !utils.CheckPassword(user.Password, input.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"code":    fiber.StatusUnauthorized,
			"message": "Invalid email or password",
		})
	}

	token, err := utils.CreateToken(user.ID, user.Role)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"code":    fiber.StatusInternalServerError,
			"message": "Failed to generate token",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"code":    fiber.StatusOK,
		"message": "Login successful",
		"data": fiber.Map{
			"token": token,
			"role":  user.Role,
		},
	})
}
