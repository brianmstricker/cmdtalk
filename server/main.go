package main

import (
	"log"
	"os"
	"strings"
	"time"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cache"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	app := fiber.New()
    app.Use(cors.New(cors.Config{
        AllowCredentials: true,
        AllowOrigins:    "http://localhost:5173",
    }))
    app.Use(cache.New(cache.Config{
		Next: func(c *fiber.Ctx) bool {
			return strings.Contains(c.Route().Path, "/ws")
		},
        CacheControl: true,
        Expiration:   10 * time.Minute,
}))
    app.Use("/ws", func(c *fiber.Ctx) error {
        if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})
    err := godotenv.Load(".env")
    if err != nil {
        log.Fatal("Error loading .env file")
    }
    PORT := os.Getenv("PORT")
    app.Get("/api", func(c *fiber.Ctx) error {
        return c.SendString("Hello, World 👋!!")
    })
    log.Fatal(app.Listen(":" + PORT))
}