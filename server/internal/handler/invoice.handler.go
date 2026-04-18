package handler

import "github.com/gofiber/fiber/v3"

func (h *Handler) CreateInvoice(c fiber.Ctx) error {
	

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"code":    fiber.StatusOK,
		"message": "Invoice created",
	})
}