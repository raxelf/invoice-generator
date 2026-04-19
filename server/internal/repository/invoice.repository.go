package repository

import (
	"invoice-backend/internal/model"

	"gorm.io/gorm"
)

func CreateInvoiceHeader(db *gorm.DB, invoice *model.Invoice) error {
	return db.Create(invoice).Error
}

func CreateInvoiceDetails(db *gorm.DB, details []model.InvoiceDetail) error {
	return  db.Create(&details).Error
}
