package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Invoice struct {
	ID string `gorm:"primaryKey;type:varchar(36)"`
	InvoiceNumber string `gorm:"uniqueIndex;not null"`
	SenderName string `gorm:"not null"`
	SenderAddress string `gorm:"not null"`
	ReceiverName string `gorm:"not null"`
	ReceiverAddress string `gorm:"not null"`
	TotalAmount int64 `gorm:"not null"`
	CreatedBy string `gorm:"type:varchar(36);not null"`
	CreatedAt time.Time

	// relation
	User User `gorm:"foreignKey:CreatedBy"`
	Details []InvoiceDetail `gorm:"foreignKey:InvoiceID"`
}

// hooks
func (i *Invoice) BeforeCreate(tx *gorm.DB) error {
	i.ID = uuid.New().String()
	return nil
}