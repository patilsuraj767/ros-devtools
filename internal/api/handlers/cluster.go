package handlers

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
	database "github.com/patilsuraj767/ros-devtools/internal/db"
)

type Cluster struct {
	ID             uint `gorm:"primaryKey;not null;autoIncrement"`
	TenantID       uint
	RHAccount      RHAccount `gorm:"foreignKey:TenantID"`
	SourceId       string    `gorm:"type:text;unique"`
	ClusterUUID    string    `gorm:"type:text;unique"`
	ClusterAlias   string    `gorm:"type:text;unique"`
	LastReportedAt time.Time
}

func GetClusters(c echo.Context) error {

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
	query := db.Table("clusters")
	var count int64 = 0
	query.Count(&count)
	if query.Error != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status":  "error",
			"message": fmt.Sprintf("unable to get clusters. Error: %s", query.Error)})
	}

	// Get cluster details
	type result struct {
		Id              int
		ClusterName     string    `gorm:"column:cluster_alias"`
		Workloads       int       `gorm:"column:total_workloads"`
		Recommendations int       `gorm:"column:total_recommendations"`
		LastReported    time.Time `gorm:"column:last_reported_at"`
	}
	query_result := []result{}
	query = db.Table("recommendation_sets").Select(
		"clusters.id",
		"clusters.cluster_alias",
		"COUNT(DISTINCT workloads) as total_workloads",
		"COUNT(recommendation_sets) as total_recommendations",
		"clusters.last_reported_at",
	).Joins(`
		JOIN workloads ON recommendation_sets.workload_id = workloads.id
		JOIN clusters ON workloads.cluster_id = clusters.id
	`).Preload("Workload.Cluster").Group("clusters.id").Offset(offset).Limit(limit).Scan(&query_result)
	if query.Error != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status":  "error",
			"message": fmt.Sprintf("unable to get cluster details. Error: %s", query.Error)})
	}
	return c.JSON(http.StatusOK, map[string]interface{}{
		"count": count,
		"data":  query_result,
	})
}
