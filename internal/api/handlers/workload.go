package handlers

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
	database "github.com/patilsuraj767/ros-devtools/internal/db"
)

func GetWorkloads(c echo.Context) error {
	cluster_id := c.QueryParam("cluster-id")
	limitStr := c.QueryParam("limit")
	limit := 10 // default value
	if limitStr != "" {
		limitInt, err := strconv.Atoi(limitStr)
		if err == nil {
			limit = limitInt
		}
	}

	offsetStr := c.QueryParam("offset")
	offset := 0 // default value
	if offsetStr != "" {
		offsetInt, err := strconv.Atoi(offsetStr)
		if err == nil {
			offset = offsetInt
		}
	}

	// Get total number of clusters
	db := database.GetDB()
	query := db.Table("workloads")
	var count int64 = 0
	query.Count(&count)
	if query.Error != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status":  "error",
			"message": fmt.Sprintf("unable to get workloads. Error: %s", query.Error)})
	}

	// Get cluster details
	type result struct {
		Id                int
		Experiment_name   string    `gorm:"column:experiment_name"`
		Namespace         string    `gorm:"column:namespace"`
		Workload_type     string    `gorm:"column:workload_type"`
		Workload_name     string    `gorm:"column:workload_name"`
		Containers        string    `gorm:"column:containers"`
		Metrics_upload_at time.Time `gorm:"column:metrics_upload_at"`
	}
	query_result := []result{}
	query = db.Table("workloads").Select(
		"workloads.id",
		"workloads.experiment_name",
		"workloads.namespace",
		"workloads.workload_type",
		"workloads.workload_name",
		"workloads.containers",
		"workloads.metrics_upload_at",
	).Where("cluster_id = ?", cluster_id).Offset(offset).Limit(limit).Scan(&query_result)
	if query.Error != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status":  "error",
			"message": fmt.Sprintf("unable to get workloads details. Error: %s", query.Error)})
	}
	return c.JSON(http.StatusOK, map[string]interface{}{
		"count": count,
		"data":  query_result,
	})
}
