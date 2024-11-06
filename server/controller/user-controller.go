package controller

import (
	"context"

	"github.com/brianmstricker/cmdtalk/model"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type UserCon struct {
	collection *mongo.Collection
	client     *mongo.Client
}

func NewUserController(collection *mongo.Collection, client *mongo.Client) *UserCon {
	return &UserCon{collection: collection, client: client}
}

func (u *UserCon) GetUsers(c *fiber.Ctx) error {
	cursor, err := u.collection.Find(context.Background(), bson.M{})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	var users []model.User
	err = cursor.All(context.Background(), &users)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return c.JSON(users)
}

func (u *UserCon) CreateUser(c *fiber.Ctx) error {
	user := new(model.User)
	if err := c.BodyParser(user); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	_, err := u.collection.InsertOne(context.Background(), user)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return c.JSON(user)
}
