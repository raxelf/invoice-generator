package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type InvoiceDetail struct {
	ID        string `gorm:"primaryKey;type:varchar(36)"`
	InvoiceID string `gorm:"type:varchar(36);not null"`
	ItemID   string `gorm:"type:varchar(36);not null"`
	Quantity  int    `gorm:"not null"`
	Price     int64  `gorm:"not null"`
	Subtotal  int64  `gorm:"not null"`

	// relation
	Invoice Invoice `gorm:"foreignKey:InvoiceID"`
	Item    Item    `gorm:"foreignKey:ItemID"`
}

// hooks
func (id *InvoiceDetail) BeforeCreate(tx *gorm.DB) error {
	id.ID = uuid.New().String()
	return nil
}