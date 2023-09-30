package handlers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	database "github.com/patilsuraj767/ros-devtools/internal/db"
)

type RHAccount struct {
	ID      uint   `gorm:"primaryKey;not null;autoIncrement"`
	Account string `gorm:"type:text;unique"`
	OrgId   string `gorm:"type:text;not null;unique"`
}

func GetAccounts(c echo.Context) error {

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

	// Get total number of rh_accounts
	db := database.GetDB()
	query := db.Table("rh_accounts")
	var count int64 = 0
	query.Count(&count)
	if query.Error != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status":  "error",
			"message": fmt.Sprintf("unable to get accounts. Error: %s", query.Error)})
	}

	// Get account details
	type result struct {
		Id              int
		Account         string
		Org_id          string
		Clusters        int `gorm:"column:total_clusters"`
		Workloads       int `gorm:"column:total_workloads"`
		Recommendations int `gorm:"column:total_recommendations"`
	}
	query_result := []result{}
	query = db.Table("recommendation_sets").Select(
		"rh_accounts.id",
		"rh_accounts.account",
		"rh_accounts.org_id",
		"COUNT(DISTINCT clusters) as total_clusters",
		"COUNT(DISTINCT workloads) as total_workloads",
		"COUNT(recommendation_sets) as total_recommendations",
	).Joins(`
			JOIN workloads ON recommendation_sets.workload_id = workloads.id
			JOIN clusters ON workloads.cluster_id = clusters.id
			JOIN rh_accounts ON clusters.tenant_id = rh_accounts.id
		`).Preload("Workload.Cluster.RHAccount").Group("rh_accounts.id").Offset(offset).Limit(limit).Scan(&query_result)
	if query.Error != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"status":  "error",
			"message": fmt.Sprintf("unable to get account details. Error: %s", query.Error)})
	}
	return c.JSON(http.StatusOK, map[string]interface{}{
		"count": count,
		"data":  query_result,
	})
}
