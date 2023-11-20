package api

import (
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/patilsuraj767/ros-devtools/internal/api/handlers"
	"github.com/patilsuraj767/ros-devtools/internal/config"
)

var cfg *config.Config = config.GetConfig()

func StartAPIServer() {
	app := echo.New()
	app.Use(middleware.Logger())
	app.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowMethods: []string{http.MethodGet},
	}))
	app.GET("/status", handlers.GetAppStatus)

	v1 := app.Group("/api/v1")

	v1.GET("/accounts", handlers.GetAccounts)
	v1.GET("/clusters", handlers.GetClusters)
	v1.GET("/workloads", handlers.GetWorkloads)
	s := http.Server{
		Addr:    ":" + cfg.API_PORT, //local dev server
		Handler: app,
	}
	if err := s.ListenAndServe(); err != http.ErrServerClosed {
		log.Fatal(err)
	}
}
