package controller

import "github.com/gofiber/fiber/v2"

func CreateUser(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"message": "Get all messages",
	})
}
