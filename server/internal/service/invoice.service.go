package service

import (
	"errors"
	"fmt"
	"invoice-backend/internal/model"
	"invoice-backend/internal/repository"
	"time"

	"gorm.io/gorm"
)

type InvoiceItemInput struct {
	ItemCode string `json:"item_code" validate:"required"`
	Quantity int    `json:"quantity" validate:"required,min=1"`
}

type CreateInvoiceInput struct {
	SenderName      string             `json:"sender_name" validate:"required"`
	SenderAddress   string             `json:"sender_address" validate:"required"`
	ReceiverName    string             `json:"receiver_name" validate:"required"`
	ReceiverAddress string             `json:"receiver_address" validate:"required"`
	Items           []InvoiceItemInput `json:"items" validate:"required,min=1,dive"`
}

func CreateInvoice(db *gorm.DB, input CreateInvoiceInput, createdBy string) error {
	return db.Transaction(func(tx *gorm.DB) error {
		var details []model.InvoiceDetail
		var grandTotal int64

		// zero trust
		// check every item price by db
		for _, i := range input.Items {
			item, err := repository.FindItemByCode(tx, i.ItemCode)
			if err != nil {
				return errors.New("item not found: " + i.ItemCode)
			}

			subtotal := item.Price * int64(i.Quantity)
			grandTotal += subtotal

			details = append(details, model.InvoiceDetail{
				ItemID:   item.ID,
				Quantity: i.Quantity,
				Price:    item.Price,
				Subtotal: subtotal,
			})
		}

		invoice := model.Invoice{
			// generate invoice number by millisecond
			InvoiceNumber:   fmt.Sprintf("INV-%d", time.Now().UnixMilli()),
			SenderName:      input.SenderName,
			SenderAddress:   input.SenderAddress,
			ReceiverName:    input.ReceiverName,
			ReceiverAddress: input.ReceiverAddress,
			TotalAmount:     grandTotal,
			CreatedBy:       createdBy,
		}

		if err := repository.CreateInvoiceHeader(tx, &invoice); err != nil {
			return err
		}

		for idx := range details {
			details[idx].InvoiceID = invoice.ID
		}

		if err := repository.CreateInvoiceDetails(tx, details); err != nil {
			return err
		}

		return nil
	})
}
