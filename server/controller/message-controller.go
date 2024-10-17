package controller

import (
	"context"

	"github.com/brianmstricker/cmdtalk/model"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type Message struct {
	collection *mongo.Collection
	client     *mongo.Client
}

func NewMessageController(collection *mongo.Collection, client *mongo.Client) *Message {
	return &Message{collection: collection, client: client}
}

func (m *Message) GetMessages(c *fiber.Ctx) error {
	cursor, err := m.collection.Find(context.Background(), bson.M{})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	var messages []model.Message
	err = cursor.All(context.Background(), &messages)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return c.JSON(messages)
}
