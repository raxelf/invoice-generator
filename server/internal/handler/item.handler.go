package handler

import (
	"invoice-backend/internal/repository"

	"github.com/gofiber/fiber/v3"
)

func (h *Handler) GetItem(c fiber.Ctx) error {
	code := c.Query("code")

	items, err := repository.FindItems(h.DB, code)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"code":    fiber.StatusInternalServerError,
			"message": "Failed to fetch items",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"code":    fiber.StatusOK,
		"message": "Items fetched successfully",
		"data":    items,
	})
}
