package utils

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"time"
)

type InvoiceWebhookPayload struct {
	Event         string    `json:"event"`
	InvoiceNumber string    `json:"invoice_number"`
	TotalAmount   int64     `json:"total_amount"`
	CreatedBy     string    `json:"created_by"`
	SenderName    string    `json:"sender_name"`
	ReceiverName  string    `json:"receiver_name"`
	CreatedAt     time.Time `json:"created_at"`
}

func SendInvoiceWebhook(url string, payload InvoiceWebhookPayload) {
	body, err := json.Marshal(payload)
	if err != nil {
		log.Println("Webhook marshal error: ", err)
		return
	}

	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	req, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(body))
	if err != nil {
		log.Println("Webhook request error: ", err)
		return
	}

	req.Header.Set("Content-Type", "application/json")

	res, err := client.Do(req)
	if err != nil {
		log.Println("Webhook send error: ", err)
		return
	}
	defer res.Body.Close()

	log.Println("Webhook sent successfully, status: ", res.StatusCode)
}
