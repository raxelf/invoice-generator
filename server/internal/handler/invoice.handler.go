package handler

import (
	"invoice-backend/internal/service"
	"invoice-backend/internal/utils"

	"github.com/gofiber/fiber/v3"
)

func (h *Handler) CreateInvoice(c fiber.Ctx) error {
	var input service.CreateInvoiceInput

	if err := c.Bind().Body(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"code":    fiber.StatusBadRequest,
			"message": "Invalid request body",
		})
	}

	// validation
	if err := utils.ValidateStruct(input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"code":    fiber.StatusBadRequest,
			"message": err.Error(),
		})
	}

	userID, ok := c.Locals("user_id").(string)
	if !ok || userID == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"code":    fiber.StatusUnauthorized,
			"message": "Unauthorized",
		})
	}

	invoice, err := service.CreateInvoice(h.DB, input, userID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"code":    fiber.StatusInternalServerError,
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"code":    fiber.StatusCreated,
		"message": "Invoice created",
		"data": fiber.Map{
			"invoice_number": invoice.InvoiceNumber,
			"total_amount":   invoice.TotalAmount,
		},
	})
}
