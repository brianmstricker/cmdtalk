package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	app := fiber.New()
    app.Use(cors.New(cors.Config{
        AllowCredentials: true,
        AllowOrigins:    []string{"http://localhost:5173"},
    }))
    err := godotenv.Load(".env")
    PORT := os.Getenv("PORT")
    if err != nil {
        log.Fatal("Error loading .env file")
    }
    app.Get("/api", func(c fiber.Ctx) error {
        return c.SendString("Hello, World 👋!!")
    })
    log.Fatal(app.Listen(":" + PORT))
}