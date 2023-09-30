package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetAppStatus(c echo.Context) error {
	status := map[string]string{
		"api-server": "working",
	}
	return c.JSON(http.StatusOK, status)
}
