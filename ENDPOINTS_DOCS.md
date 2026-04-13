# API Endpoints Documentation

## Table of Contents

### Sales Page

1. [Writer Statistics Endpoint](#writer-statistics-endpoint)
2. [Detailed Tickets Endpoint](#detailed-tickets-endpoint)
3. [Game Types Endpoint](#game-types-endpoint)
4. [Today's Sales Endpoint](#todays-sales-endpoint)
5. [Today's Top Ups Endpoint](#todays-top-ups-endpoint)

### Analytics

6. [Writer Activity Endpoint](#writer-activity-endpoint)
7. [Top-Up Statistics Endpoint](#top-up-statistics-endpoint)
8. [Winning Statistics Endpoint](#winning-statistics-endpoint)
9. [Best & Worst Performance Endpoint](#best--worst-performance-endpoint)
10. [YTD Retention Rate Endpoint](#ytd-retention-rate-endpoint)
11. [Retention Rate Trend Endpoint](#retention-rate-trend-endpoint)
12. [Top 10 Writers Endpoint](#top-10-writers-endpoint)

### LMCs

13. [Available LMC Owners Endpoint](#available-lmc-owners-endpoint)
14. [Register LMC Endpoint](#register-lmc-endpoint)
15. [Get All LMC Owners Endpoint](#get-all-lmc-owners-endpoint)
16. [Edit LMC Endpoint](#edit-lmc-endpoint)
17. [LMC Detail Cards Endpoint](#lmc-detail-cards-endpoint)
18. [LMC Summary Endpoint](#lmc-summary-endpoint)
19. [LMC Writers Overview Endpoint](#lmc-writers-overview-endpoint)
20. [LMC Transactions Endpoint](#lmc-transactions-endpoint)

### Writers Registration

21. [Register Writer Endpoint](#register-writer-endpoint)

### Draws & Winnings

22. [Draws & Winnings Endpoint](#draws--winnings-endpoint)
23. [Draws & Winnings Table Endpoint](#draws--winnings-table-endpoint)
24. [Draw Event Tickets Endpoint](#draw-event-tickets-endpoint)

### Admin Users

25. [List Admin Users Endpoint](#list-admin-users-endpoint)
26. [Create Admin User Endpoint](#create-admin-user-endpoint)
27. [Edit Admin User Endpoint](#edit-admin-user-endpoint)
28. [Activity Logs Endpoint](#activity-logs-endpoint)

### Writer Dashboard

29. [All Writers List Endpoint](#all-writers-list-endpoint)
30. [Writer Profile Endpoint](#writer-profile-endpoint)
31. [Writer Sales Endpoint](#writer-sales-endpoint)
32. [Writer Winnings Endpoint](#writer-winnings-endpoint)
33. [Writer Top-Ups Endpoint](#writer-top-ups-endpoint)
34. [Writer Cashouts Endpoint](#writer-cashouts-endpoint)

### Analytics continuation

35. [Sales Card Endpoint](#sales-card-endpoint)
36. [Net Top-Ups Card Endpoint](#net-top-ups-card-endpoint)
37. [Writers@Work Card Endpoint](#writerswork-card-endpoint)
38. [Wins Card Endpoint](#wins-card-endpoint)
39. [Liquidation Card Endpoint](#liquidation-card-endpoint)
40. [Settlements Card Endpoint](#settlements-card-endpoint)

### Sales Continuation

41. [Today's Claims Endpoint](#todays-claims-endpoint)
42. [Today's Wins Endpoint](#todays-wins-endpoint)
43. [Winning Events Endpoint](#winning-events-endpoint)
44. [Winners List Endpoint](#winners-list-endpoint)

### Reports

45. [List Reports Endpoint](#list-reports-endpoint)
46. [Execute Report Endpoint](#execute-report-endpoint)

---

## Writer Statistics Endpoint

### Overview

Returns comprehensive writer statistics including total sales, stake counts, and topup information. Perfect for creating leaderboards and performance dashboards.

### Request

**Method:** `GET`

**Route:** `/api/v1/writers/statistics/`

**Base URL:** `https://onassismystrocore-production.up.railway.app/api/v1/writers/statistics/`

**Authentication:** Required (Bearer Token)

**Headers:**

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Response Format

**Status Code:** `200 OK`

```json
{
  "data": {
    "totalwriterFloat": "GHS 128,198.03",
    "totalwriters": "1547",
    "writers": [
      {
        "sales": "GHS 558.00",
        "total_stakes": "520",
        "topup": "GHS 324.00",
        "writer": {
          "id": "21",
          "name": "Gloria Aballa",
          "profileImage": null,
          "online": true,
          "lastSeen": "2026-04-02 11:24:15",
          "contact": {
            "email": null,
            "phone": "0549698956"
          }
        }
      }
    ]
  }
}
```

### Response Field Descriptions

| Field                            | Type        | Description                                                        |
| -------------------------------- | ----------- | ------------------------------------------------------------------ |
| `data.totalwriterFloat`          | string      | Total sales across all writers (formatted with currency)           |
| `data.totalwriters`              | string      | Count of writers in the system                                     |
| `data.writers`                   | array       | Array of individual writer statistics (sorted by sales descending) |
| `writers[].sales`                | string      | Writer's total sales (formatted with GHS currency)                 |
| `writers[].total_stakes`         | string      | Count of stakes/lines created by writer                            |
| `writers[].topup`                | string      | Total topup amount received (formatted with GHS currency)          |
| `writers[].writer.id`            | string      | Writer's unique ID (human-readable)                                |
| `writers[].writer.name`          | string      | Writer's full name                                                 |
| `writers[].writer.profileImage`  | null/string | URL to writer's profile photo (null if not set)                    |
| `writers[].writer.online`        | boolean     | Current online status                                              |
| `writers[].writer.lastSeen`      | string      | Last activity timestamp (YYYY-MM-DD HH:MM:SS)                      |
| `writers[].writer.contact.email` | string/null | Writer's email address                                             |
| `writers[].writer.contact.phone` | string      | Writer's phone number in E.164 format                              |

### cURL Example

```bash
# Get access token
TOKEN=$(curl -X POST https://onassismystrocore-production.up.railway.app/api/v1/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass"}' \
  | jq -r '.access')

# Get writer statistics
curl -X GET https://onassismystrocore-production.up.railway.app/api/v1/writers/statistics/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

---

## Detailed Tickets Endpoint

### Overview

Returns comprehensive ticket and stake information with all related data (game type, play type, writer details). Ideal for detailed transaction reporting and analysis.

### Request

**Method:** `GET`

**Route:** `/api/v1/sales/tickets/detailed_list/`

**Base URL:** `https://onassismystrocore-production.up.railway.app/api/v1/sales/tickets/detailed_list/`

**Authentication:** Required (Bearer Token)

**Headers:**

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Response Format

**Status Code:** `200 OK`

```json
{
  "data": [
    {
      "ticket_no": "108003562026040210493962241",
      "time": "10:52:27",
      "total_stake_amount": "1.00",
      "total_stake": 2,
      "play_group": "Direct, Perm",
      "writer_name": "John Doe",
      "stakes": [
        {
          "stake_id": "550e8400-e29b-41d4-a716-446655440000",
          "created_at": "2026-04-02 10:52:27",
          "game": {
            "id": "1",
            "name": "Morning VAG",
            "code": "MORNING_VAG"
          },
          "event_id": 1,
          "event": "Morning VAG - April 02, 2026",
          "play_group": "Direct",
          "play": "Direct 2 (2 Sure)",
          "numbers": "5,10,15,20",
          "stake_amount": "0.50",
          "original_numbers": "5,10,15,20",
          "player_phone": "+233501234567",
          "stake_status": "ACTIVE",
          "writer": {
            "id": "1",
            "name": "John Doe",
            "phone": "+233501234567"
          }
        }
      ]
    }
  ]
}
```

### Response Field Descriptions

#### Ticket Level

| Field              | Type   | Description                           |
| ------------------ | ------ | ------------------------------------- |
| `data[].ticket_no` | string | Unique system-generated ticket number |
| `data[].stakes`    | array  | Array of all stakes on this ticket    |

#### Stake Level

| Field                       | Type    | Description                                                     |
| --------------------------- | ------- | --------------------------------------------------------------- |
| `stakes[].stake_id`         | UUID    | Unique identifier for the stake                                 |
| `stakes[].created_at`       | string  | When stake was created (YYYY-MM-DD HH:MM:SS)                    |
| `stakes[].game.id`          | string  | Game type UUID                                                  |
| `stakes[].game.name`        | string  | Game type name (e.g., "Morning VAG", "Noon Rush")               |
| `stakes[].game.code`        | string  | Game type code (e.g., "MORNING_VAG")                            |
| `stakes[].event_id`         | integer | Draw event ID                                                   |
| `stakes[].event`            | string  | Draw event name and date                                        |
| `stakes[].play_group`       | string  | Play group: "Direct", "Perm", "Banker to All", "Banker Against" |
| `stakes[].play`             | string  | Play type name (e.g., "Direct 2 (2 Sure)")                      |
| `stakes[].numbers`          | string  | Comma-separated selected numbers                                |
| `stakes[].stake_amount`     | string  | Per-line/unit stake amount (GHS)                                |
| `stakes[].original_numbers` | string  | Original numbers in display format                              |
| `stakes[].player_phone`     | string  | Player phone (E.164 format)                                     |
| `stakes[].stake_status`     | string  | Status: ACTIVE, WON, LOST, CLAIMED, CANCELLED, EXPIRED          |
| `stakes[].writer.id`        | string  | Writer's human-readable ID                                      |
| `stakes[].writer.name`      | string  | Writer's full name                                              |
| `stakes[].writer.phone`     | string  | Writer's contact phone                                          |

### Query Parameters

```
GET /api/v1/sales/tickets/detailed_list/?status=active
GET /api/v1/sales/tickets/detailed_list/?ticket_no=108003562026040210493962241
GET /api/v1/sales/tickets/detailed_list/?player_phone=%2B233501234567
```

---

## Game Types Endpoint

### Overview

Returns a list of all available game types with their configuration details.

### Request

**Method:** `GET`

**Route:** `/api/v1/games/types/`

**Base URL:** `https://onassismystrocore-production.up.railway.app/api/v1/games/types/`

**Authentication:** Required (Bearer Token)

### Response Format

**Status Code:** `200 OK`

```json
[
  {
    "id": "1",
    "name": "Morning VAG",
    "code": "MORNING_VAG",
    "description": "Morning Variation Game",
    "number_pool": "1-90",
    "numbers_drawn": "5",
    "allow_sunday_stake": true,
    "sales_open_time": "06:00:00",
    "sales_close_time": "09:45:00",
    "is_active": true,
    "created_at": "2026-04-02 08:00:00"
  }
]
```

### Response Field Descriptions

| Field                   | Type    | Description                                     |
| ----------------------- | ------- | ----------------------------------------------- |
| `[].id`                 | string  | Unique identifier for the game type             |
| `[].name`               | string  | Display name of the game                        |
| `[].code`               | string  | System code for the game                        |
| `[].description`        | string  | Human-readable description                      |
| `[].number_pool`        | string  | Range of numbers available (e.g., "1-90")       |
| `[].numbers_drawn`      | string  | Number of winning numbers drawn                 |
| `[].allow_sunday_stake` | boolean | Whether stakes are allowed on Sundays           |
| `[].sales_open_time`    | string  | Time when sales window opens (HH:MM:SS)         |
| `[].sales_close_time`   | string  | Time when sales window closes (HH:MM:SS)        |
| `[].is_active`          | boolean | Whether the game is currently active            |
| `[].created_at`         | string  | When the game was created (YYYY-MM-DD HH:MM:SS) |

### Query Parameters

| Parameter   | Type    | Description                          |
| ----------- | ------- | ------------------------------------ |
| `is_active` | boolean | Filter by active status (true/false) |
| `code`      | string  | Filter by game code                  |

---

## Today's Sales Endpoint

### Endpoint: Get Today's Total Sales

**Route:** `GET /api/v1/sales/tickets/today_sales/`

**Description:** Returns the total sales amount and ticket count for the current day.

**Authentication:** Required (Bearer Token)

**Permissions:** `IsOperatorOrAbove` (operators and admins only)

### Response Format

**Status Code:** `200 OK`

```json
{
  "date": "2026-04-02",
  "total_sales": 20322.1,
  "ticket_count": 200,
  "currency": "GHS"
}
```

### Response Fields

| Field          | Type              | Description                                                 |
| -------------- | ----------------- | ----------------------------------------------------------- |
| `date`         | string (ISO 8601) | The date for which sales are reported (always today's date) |
| `total_sales`  | float             | Sum of all ticket amounts sold today in GHS                 |
| `ticket_count` | integer           | Number of tickets sold today                                |
| `currency`     | string            | Currency code (always "GHS")                                |

---

## Today's Top Ups Endpoint

### Endpoint: Get Today's Total Top Ups

**Route:** `GET /api/v1/writers/today-topup/`

**Description:** Returns the total top up amount and count of top up transactions for the current day.

**Authentication:** Required (Bearer Token)

**Permissions:** `IsWriterOrAbove` (writers and above can access)

### Response Format

**Status Code:** `200 OK`

```json
{
  "date": "2026-04-02",
  "total_topup": "GHS 12,345.60",
  "total_topup_amount": 12345.6,
  "topup_count": 15,
  "currency": "GHS"
}
```

### Response Fields

| Field                | Type              | Description                                                            |
| -------------------- | ----------------- | ---------------------------------------------------------------------- |
| `date`               | string (ISO 8601) | The date for which top ups are reported (always today's date)          |
| `total_topup`        | string            | Sum of all top up amounts formatted with currency and comma separators |
| `total_topup_amount` | float             | Total top up amount as a numeric value for calculations                |
| `topup_count`        | integer           | Number of top up transactions recorded today                           |
| `currency`           | string            | Currency code (always "GHS")                                           |

---

## Writer Activity Endpoint

### Endpoint: Get Writer Activity Statistics

**Route:** `GET /api/v1/writers/active-writer-daily-stats/`

**Description:** Returns historical writer activity data including total writers and active writers for each day in the specified period.

**Authentication:** Required (Bearer Token)

**Permissions:** `IsOperatorOrAbove`

### Query Parameters

| Parameter | Type    | Default | Range | Description                             |
| --------- | ------- | ------- | ----- | --------------------------------------- |
| `days`    | integer | 30      | 1-365 | Number of days to include in the report |

### Response Format

**Status Code:** `200 OK`

```json
{
  "totals": {
    "total_writers": 1549,
    "active_writers": 1357
  },
  "period": {
    "start_date": "2026-03-05",
    "end_date": "2026-04-03",
    "days": 30
  },
  "days": [
    {
      "day": "2026-03-05",
      "total_writers": 1511,
      "active_writers": 697
    }
  ]
}
```

### Response Field Descriptions

| Field                   | Type    | Description                                                             |
| ----------------------- | ------- | ----------------------------------------------------------------------- |
| `totals.total_writers`  | integer | Total count of all writers in the system                                |
| `totals.active_writers` | integer | Count of unique writers with at least one ticket sold during the period |
| `period.start_date`     | string  | Start date of the report (ISO 8601)                                     |
| `period.end_date`       | string  | End date of the report (ISO 8601)                                       |
| `period.days`           | integer | Number of days in the report                                            |
| `days[].day`            | string  | Date of the record (ISO 8601)                                           |
| `days[].total_writers`  | integer | Total writers in the system on this date                                |
| `days[].active_writers` | integer | Unique writers with at least one ticket sold on this date               |

---

## Top-Up Statistics Endpoint

### Endpoint: Get Historical Top-Up Statistics

**Route:** `GET /api/v1/financials/dashboard/topup-statistics/`

**Description:** Returns aggregated top-up amounts for various time periods (YTD, Last Week, Last Month, Last 3 Months).

**Authentication:** Required (Bearer Token)

**Permissions:** `IsOperatorOrAbove`

### Response Format

**Status Code:** `200 OK`

```json
{
  "ytd": { "label": "YTD", "total": "GHS 250.00", "total_amount": 250.0 },
  "last_week": {
    "label": "Last Week",
    "total": "GHS 0.00",
    "total_amount": 0.0
  },
  "last_month": {
    "label": "Last Month",
    "total": "GHS 0.00",
    "total_amount": 0.0
  },
  "last_3_months": {
    "label": "Last 3 Months",
    "total": "GHS 250.00",
    "total_amount": 250.0
  }
}
```

### Response Field Descriptions

| Field                   | Type   | Description                          |
| ----------------------- | ------ | ------------------------------------ |
| `{period}.label`        | string | Human-readable period name           |
| `{period}.total`        | string | Total amount formatted with currency |
| `{period}.total_amount` | float  | Numeric total for calculations       |

---

## Winning Statistics Endpoint

### Endpoint: Get Historical Winning Statistics

**Route:** `GET /api/v1/financials/dashboard/winning-statistics/`

**Description:** Returns aggregated winning amounts for various time periods (YTD, Last Week, Last Month, Last 3 Months).

**Authentication:** Required (Bearer Token)

**Permissions:** `IsOperatorOrAbove`

### Response Format

**Status Code:** `200 OK`

```json
{
  "ytd": {
    "label": "YTD",
    "total": "GHS 20,244,198.80",
    "total_amount": 20244198.8
  },
  "last_week": {
    "label": "Last Week",
    "total": "GHS 2,197,324.80",
    "total_amount": 2197324.8
  },
  "last_month": {
    "label": "Last Month",
    "total": "GHS 7,762,432.80",
    "total_amount": 7762432.8
  },
  "last_3_months": {
    "label": "Last 3 Months",
    "total": "GHS 20,041,399.60",
    "total_amount": 20041399.6
  }
}
```

### Response Field Descriptions

| Field                   | Type   | Description                                  |
| ----------------------- | ------ | -------------------------------------------- |
| `{period}.label`        | string | Human-readable period name                   |
| `{period}.total`        | string | Total winning amount formatted with currency |
| `{period}.total_amount` | float  | Numeric total for calculations               |

---

## Best & Worst Performance Endpoint

### Endpoint: Get Best & Worst Performing Months

**Route:** `GET /api/v1/financials/dashboard/best-worst-performance/`

**Description:** Returns the best and worst performing months for the current year based on net profit (winnings - top-ups).

**Authentication:** Required (Bearer Token)

**Permissions:** `IsOperatorOrAbove`

### Response Format

**Status Code:** `200 OK`

```json
{
  "best_month": {
    "month": "Mar '26",
    "performance": "+ GHS 1,102,384.74",
    "net_profit": 1102384.74,
    "topups": 0.0,
    "wins": 1102384.74
  },
  "worst_month": {
    "month": "Jan '26",
    "performance": "- GHS 673,816.38",
    "net_profit": -673816.38,
    "topups": 673816.38,
    "wins": 0.0
  }
}
```

### Response Field Descriptions

| Field                 | Type        | Description                                     |
| --------------------- | ----------- | ----------------------------------------------- |
| `best_month`          | object/null | Month with highest net profit; null if no data  |
| `worst_month`         | object/null | Month with lowest net profit; null if no data   |
| `{month}.month`       | string      | Month and year abbreviation (e.g., "Mar '26")   |
| `{month}.performance` | string      | Formatted net profit with +/- sign and currency |
| `{month}.net_profit`  | float       | Net profit amount (wins - topups)               |
| `{month}.topups`      | float       | Total top-ups for the month                     |
| `{month}.wins`        | float       | Total winnings for the month                    |

---

## YTD Retention Rate Endpoint

### Endpoint: Get YTD Retention Rate

**Route:** `GET /api/v1/financials/dashboard/retention-rate/`

**Description:** Returns YTD retention rate metrics including gross sales, net income (payouts), retention amount, and retention rate percentage.

**Authentication:** Required (Bearer Token)

**Permissions:** `IsOperatorOrAbove`

### Response Format

**Status Code:** `200 OK`

```json
{
  "gross_sales": 21790804.42,
  "net_income": 20244198.8,
  "retention_amount": 1546605.62,
  "retention_rate": "7.09%"
}
```

### Response Field Descriptions

| Field              | Type   | Description                                            |
| ------------------ | ------ | ------------------------------------------------------ |
| `gross_sales`      | float  | Total winnings for YTD (all wins regardless of status) |
| `net_income`       | float  | Winnings claimed by players (payouts)                  |
| `retention_amount` | float  | Amount retained = gross_sales - net_income             |
| `retention_rate`   | string | Retention percentage formatted as "X.XX%"              |

### Calculation Method

```
Gross Sales      = Sum of all wins (CLAIMED + PENDING + EXPIRED + VOIDED)
Net Income       = Sum of CLAIMED wins only (money paid to players)
Retention Amount = Gross Sales - Net Income
Retention Rate   = (Retention Amount / Gross Sales) × 100, formatted as "X.XX%"
```

---

## Retention Rate Trend Endpoint

### Overview

Returns the Retention Rate trend data for the bar chart. Supports a **30-day daily** breakdown and a **12-month monthly** breakdown, controlled by the `days` query param — matching the **30 days** / **1 year** toggle in the UI. Also returns the YTD RR headline figure shown above the chart.

### Request

**Method:** `GET`

**Route:** `/api/v1/financials/dashboard/retention-rate-trend/`

**Base URL:** `https://onassismystrocore-production.up.railway.app/api/v1/financials/dashboard/retention-rate-trend/`

**Authentication:** Required (Bearer Token)

**Permissions:** Operator or above

### Query Parameters

| Parameter | Type    | Default | Description                                                                                                              |
| --------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `days`    | integer | `30`    | `30` = daily breakdown for last 30 days. `365` = monthly breakdown for last 12 months. Any other value defaults to `30`. |

### UI Toggle Mapping

| UI Button   | Query                  |
| ----------- | ---------------------- |
| **30 days** | `?days=30` or no param |
| **1 year**  | `?days=365`            |

### Sample Requests

```bash
# 30-day daily view (default)
GET /api/v1/financials/dashboard/retention-rate-trend/

# 30-day explicitly
GET /api/v1/financials/dashboard/retention-rate-trend/?days=30

# 1-year monthly view
GET /api/v1/financials/dashboard/retention-rate-trend/?days=365
```

### Response — 30 days (`days=30`)

```json
{
  "ytd_retention_rate": 7.59,
  "period": {
    "start_date": "2026-03-13",
    "end_date": "2026-04-12",
    "days": 30
  },
  "days": [
    { "day": "2026-03-13", "retention_rate": -17 },
    { "day": "2026-03-14", "retention_rate": -5 },
    { "day": "2026-03-15", "retention_rate": -44 },
    { "day": "2026-03-16", "retention_rate": 13 },
    { "day": "2026-03-17", "retention_rate": 21 },
    { "day": "2026-03-20", "retention_rate": 100 },
    { "day": "2026-03-22", "retention_rate": -12 },
    { "day": "2026-03-23", "retention_rate": -31 },
    { "day": "2026-03-24", "retention_rate": -62 },
    { "day": "2026-04-12", "retention_rate": 0 }
  ]
}
```

### Response — 1 year (`days=365`)

```json
{
  "ytd_retention_rate": 7.59,
  "period": {
    "start_date": "2025-05-01",
    "end_date": "2026-04-12",
    "days": 365
  },
  "months": [
    { "month": "May '25", "retention_rate": 13 },
    { "month": "Jun '25", "retention_rate": -44 },
    { "month": "Jul '25", "retention_rate": 21 },
    { "month": "Aug '25", "retention_rate": 24 },
    { "month": "Sep '25", "retention_rate": 100 },
    { "month": "Oct '25", "retention_rate": 28 },
    { "month": "Nov '25", "retention_rate": 41 },
    { "month": "Dec '25", "retention_rate": 100 },
    { "month": "Jan '26", "retention_rate": -31 },
    { "month": "Feb '26", "retention_rate": 85 },
    { "month": "Mar '26", "retention_rate": 28 },
    { "month": "Apr '26", "retention_rate": 0 }
  ]
}
```

### Response Field Descriptions

#### Top-level

| Field                | Type    | Description                                                                        |
| -------------------- | ------- | ---------------------------------------------------------------------------------- |
| `ytd_retention_rate` | float   | YTD Retention Rate percentage — the headline "YTD RR: X.XX%" shown above the chart |
| `period.start_date`  | string  | First date in the data range `YYYY-MM-DD`                                          |
| `period.end_date`    | string  | Today's date `YYYY-MM-DD`                                                          |
| `period.days`        | integer | The `days` param used (`30` or `365`)                                              |
| `days`               | array   | Present when `days=30`. Daily entries.                                             |
| `months`             | array   | Present when `days=365`. Monthly entries.                                          |

#### Daily entry (`days` array)

| Field            | Type    | Description                                                                                                                                                   |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `day`            | string  | Date `YYYY-MM-DD`                                                                                                                                             |
| `retention_rate` | integer | Signed retention rate for that day. Positive = retained more than paid out (blue/green bar). Negative = paid out more (red bar). `0` if no data for that day. |

#### Monthly entry (`months` array)

| Field            | Type    | Description                                                            |
| ---------------- | ------- | ---------------------------------------------------------------------- |
| `month`          | string  | Month label e.g. `"Apr '26"`                                           |
| `retention_rate` | integer | Signed retention rate for that month, aggregated from daily snapshots. |

### Calculation

```
Daily RR   = (net_topups - total_wins_paid) / net_topups × 100   (per DailyRetentionRate row)
Monthly RR = (SUM(net_topups) - SUM(total_wins_paid)) / SUM(net_topups) × 100
YTD RR     = read directly from YTDSummary.ytd_retention_rate (pre-computed nightly)
```

> **Data source:** `DailyRetentionRate` table (updated nightly by Celery beat). Days with no snapshot entry return `retention_rate: 0`.

---

## Top 10 Writers Endpoint

### Endpoint: Get Top 10 Writers Year-to-Date

**Route:** `GET /api/v1/writers/top-10-writers/`

**Description:** Returns the top 10 writers for the current year ranked by net profit (winnings - top-ups).

**Authentication:** Required (Bearer Token)

**Permissions:** `IsOperatorOrAbove`

### Response Format

**Status Code:** `200 OK`

```json
[
  {
    "rank": 1,
    "writer_id": 42,
    "writer_name": "Kwesi Mensah",
    "photo_url": null,
    "total_wins": { "formatted": "GHS 25,000,000.00", "amount": 25000000.0 },
    "total_topups": { "formatted": "GHS 3,000,000.00", "amount": 3000000.0 },
    "net_profit": { "formatted": "+ GHS 22,000,000.00", "amount": 22000000.0 },
    "ticket_count": 1250
  }
]
```

### Response Field Descriptions

| Field                    | Type        | Description                                                  |
| ------------------------ | ----------- | ------------------------------------------------------------ |
| `rank`                   | integer     | Position in leaderboard (1-10)                               |
| `writer_id`              | integer     | Unique writer identifier                                     |
| `writer_name`            | string      | Writer's full name                                           |
| `photo_url`              | string/null | Full URL to writer's profile picture (null if not available) |
| `total_wins.formatted`   | string      | Formatted amount (e.g., "GHS 25,000,000.00")                 |
| `total_wins.amount`      | float       | Numeric value for calculations                               |
| `total_topups.formatted` | string      | Formatted amount with GHS and commas                         |
| `total_topups.amount`    | float       | Numeric value for calculations                               |
| `net_profit.formatted`   | string      | Formatted with sign indicator                                |
| `net_profit.amount`      | float       | Numeric value (positive or negative)                         |
| `ticket_count`           | integer     | Number of tickets sold YTD                                   |

### Calculation Method

```
Net Profit = Total Wins - Total Top-Ups
Ranking    = Sorted by Net Profit descending
Period     = January 1 to present (current year only)
Included   = Writers with at least one win OR one top-up in YTD
```

---

## Available LMC Owners Endpoint

### Overview

Returns a list of users with the `lmc_owner` role who are not yet assigned to an LMC. Useful for populating the owner dropdown when registering a new LMC.

### Request

**Method:** `GET`

**Route:** `/api/v1/auth/users/available-lmc-owners/`

**Authentication:** Required (Bearer Token)

**Permissions:** Operator or above

### Response Format

**Status Code:** `200 OK`

```json
[
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "email": "owner@example.com",
    "first_name": "Kwame",
    "last_name": "Mensah",
    "full_name": "Kwame Mensah",
    "phone": "+233501234567",
    "role": "lmc_owner",
    "is_active": true,
    "photo": null
  }
]
```

### Response Field Descriptions

| Field        | Type        | Description                  |
| ------------ | ----------- | ---------------------------- |
| `id`         | UUID        | User's unique identifier     |
| `email`      | string      | User's email address         |
| `first_name` | string      | User's first name            |
| `last_name`  | string      | User's last name             |
| `full_name`  | string      | Computed full name           |
| `phone`      | string      | User's phone number          |
| `role`       | string      | Always `lmc_owner`           |
| `is_active`  | boolean     | Account active status        |
| `photo`      | string/null | URL to profile photo or null |

> Only returns users with `role=lmc_owner` who do not already have an LMC assigned. Returns an empty list `[]` if all LMC owners are already assigned.

---

## Register LMC Endpoint

### Overview

Registers a new LMC with its owner in a single operation. Creates both:

- A new User with role `lmc_owner`
- A new LMC linked to that user
- An LMC airtime wallet (automatic)

This endpoint allows onboarding new LMC companies without pre-creating the owner user separately.

### Request

**Method:** `POST`

**Route:** `/api/v1/lmc/register/`

**Authentication:** Not required (public endpoint)

**Permissions:** None (AllowAny)

### Request Body

```json
{
  "email": "owner@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+233501234567",
  "password": "securepassword123",
  "address": "123 Main Street, Accra",
  "photo": null
}
```

**Note:** For photo uploads, use `multipart/form-data` instead of JSON. See [Photo Upload Example](#photo-upload-example) below.

### Request Field Descriptions

| Field        | Type   | Required | Description                                              |
| ------------ | ------ | -------- | -------------------------------------------------------- |
| `email`      | string | Yes      | Unique email address for the LMC owner account           |
| `first_name` | string | Yes      | Owner's first name (max 150 chars)                       |
| `last_name`  | string | Yes      | Owner's last name (max 150 chars)                        |
| `phone`      | string | Yes      | Unique phone number in E.164 format (e.g. +233501234567) |
| `password`   | string | Yes      | Password for the owner account (minimum 8 characters)    |
| `address`    | string | No       | Physical address of the LMC (max 500 chars)              |
| `photo`      | file   | No       | Profile photo (image file, optional)                     |

### Photo Upload Example

When uploading a photo, use `multipart/form-data` instead of JSON:

```bash
curl -X POST http://127.0.0.1:8000/api/v1/lmc/register/ \
  -F "email=owner@example.com" \
  -F "first_name=John" \
  -F "last_name=Doe" \
  -F "phone=+233501234567" \
  -F "password=securepassword123" \
  -F "address=123 Main Street, Accra" \
  -F "photo=@/path/to/photo.jpg"
```

### Response Format

**Status Code:** `201 Created`

```json
{
  "user": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "email": "owner@example.com",
    "full_name": "John Doe",
    "role": "lmc_owner",
    "phone": "+233501234567"
  },
  "lmc": {
    "id": "f9e8d7c6-b5a4-3210-fedc-ba9876543210",
    "code": "LMC-0025",
    "name": "John Doe",
    "phone": "+233501234567",
    "address": "123 Main Street, Accra",
    "owner": {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "email": "owner@example.com",
      "full_name": "John Doe",
      "role": "lmc_owner",
      "phone": "+233501234567"
    },
    "is_active": true,
    "created_at": "2026-04-10T12:00:00Z",
    "updated_at": "2026-04-10T12:00:00Z"
  },
  "message": "LMC registration successful"
}
```

### Response Field Descriptions

| Field            | Type     | Description                                      |
| ---------------- | -------- | ------------------------------------------------ |
| `user`           | object   | Created LMC owner user summary                   |
| `user.id`        | UUID     | User's unique identifier                         |
| `user.email`     | string   | Owner's email address                            |
| `user.full_name` | string   | Owner's full name                                |
| `user.role`      | string   | Always `"lmc_owner"`                             |
| `user.phone`     | string   | Owner's phone number                             |
| `lmc`            | object   | Created LMC details                              |
| `lmc.id`         | UUID     | LMC's unique identifier                          |
| `lmc.code`       | string   | Auto-generated sequential code (e.g. `LMC-0025`) |
| `lmc.name`       | string   | Owner's full name                                |
| `lmc.phone`      | string   | Owner's phone number                             |
| `lmc.address`    | string   | LMC physical address                             |
| `lmc.owner`      | object   | Owner user summary                               |
| `lmc.is_active`  | boolean  | Always `true` for newly created LMCs             |
| `lmc.created_at` | datetime | LMC creation timestamp                           |
| `lmc.updated_at` | datetime | LMC last update timestamp                        |
| `message`        | string   | Success confirmation message                     |

### Error Responses

**Status Code:** `400 Bad Request`

```json
{
  "email": ["A user with this email address already exists."],
  "phone": ["A user with this phone number already exists."]
}
```

---

## Get All LMC Owners Endpoint

### Overview

Returns a list of all LMC owners with their associated LMC information. Useful for displaying all LMC companies, creating dropdowns, or managing LMC data.

### Request

**Method:** `GET`

**Route:** `/api/v1/lmc/owners/`

**Authentication:** Not required (public endpoint)

**Permissions:** None (AllowAny)

### Response Format

**Status Code:** `200 OK`

```json
[
  {
    "id": "f9e8d7c6-b5a4-3210-fedc-ba9876543210",
    "code": "LMC-0025",
    "address": "123 Main Street, Accra",
    "is_active": true,
    "owner_email": "owner@example.com",
    "owner_phone": "+233501234567",
    "owner_full_name": "John Doe",
    "created_at": "2026-04-10T12:00:00Z"
  },
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "code": "LMC-0026",
    "address": "456 Oak Avenue, Kumasi",
    "is_active": true,
    "owner_email": "owner2@example.com",
    "owner_phone": "+233509876543",
    "owner_full_name": "Jane Smith",
    "created_at": "2026-04-09T10:30:00Z"
  }
]
```

### Response Field Descriptions

| Field             | Type     | Description                                      |
| ----------------- | -------- | ------------------------------------------------ |
| `id`              | UUID     | LMC's unique identifier                          |
| `code`            | string   | Auto-generated sequential code (e.g. `LMC-0025`) |
| `address`         | string   | LMC physical address                             |
| `is_active`       | boolean  | Whether the LMC is active                        |
| `owner_email`     | string   | Owner's email address                            |
| `owner_phone`     | string   | Owner's phone number                             |
| `owner_full_name` | string   | Owner's full name                                |
| `created_at`      | datetime | LMC creation timestamp                           |

---

## Register Writer Endpoint

### Overview

Registers a new writer with both user and writer information in a single operation. Creates:

- A new User with role `writer`
- A new Writer linked to the specified LMC
- Writer wallets (airtime & claims) - automatic via service

This endpoint allows complete writer onboarding without pre-creating the user separately.

### Request

**Method:** `POST`

**Route:** `/api/v1/writers/register/`

**Authentication:** Not required (public endpoint)

**Permissions:** None (AllowAny)

**Content-Type:** `multipart/form-data` (for photo upload) or `application/json`

### Request Body

**JSON (without photo):**

```json
{
  "email": "writer@example.com",
  "first_name": "Jane",
  "last_name": "Smith",
  "phone": "+233501234567",
  "password": "securepassword123",
  "lmc_id": "f9e8d7c6-b5a4-3210-fedc-ba9876543210",
  "date_of_birth": "1990-05-15",
  "location_address": "Accra, Ghana",
  "photo=@/path/to/photo.jpg"

}
```

**Multipart/Form-Data (with photo):**

- `email`: writer@example.com
- `first_name`: Jane
- `last_name`: Smith
- `phone`: +233501234567
- `password`: securepassword123
- `lmc_id`: f9e8d7c6-b5a4-3210-fedc-ba9876543210
- `date_of_birth`: 1990-05-15
- `location_address`: Accra, Ghana
- `photo`: <binary image file>

### Request Field Descriptions

| Field              | Type   | Required | Description                                              |
| ------------------ | ------ | -------- | -------------------------------------------------------- |
| `email`            | string | Yes      | Unique email address for the writer account              |
| `first_name`       | string | Yes      | Writer's first name (max 150 chars)                      |
| `last_name`        | string | Yes      | Writer's last name (max 150 chars)                       |
| `phone`            | string | Yes      | Unique phone number in E.164 format (e.g. +233501234567) |
| `password`         | string | Yes      | Password for the writer account (minimum 8 characters)   |
| `lmc_id`           | UUID   | Yes      | UUID of the LMC this writer belongs to                   |
| `date_of_birth`    | date   | Yes      | Writer's date of birth (YYYY-MM-DD, for KYC)             |
| `location_address` | string | No       | Writer's operating location address (max 255 chars)      |
| `photo`            | file   | No       | Profile photo (multipart/form-data only)                 |

### Response Format

**Status Code:** `201 Created`

```json
{
  "user": {
    "id": "b5c4d3e2-f1a0-0987-6543-21cba0987654",
    "email": "writer@example.com",
    "full_name": "Jane Smith",
    "role": "writer",
    "phone": "+233501234567"
  },
  "writer": {
    "id": "c6d5e4f3-a0b1-1234-7890-32dcb1a98765",
    "user": {
      "id": "b5c4d3e2-f1a0-0987-6543-21cba0987654",
      "email": "writer@example.com",
      "full_name": "Jane Smith",
      "role": "writer",
      "phone": "+233501234567"
    },
    "lmc": "f9e8d7c6-b5a4-3210-fedc-ba9876543210",
    "photo": null,
    "status": "active",
    "writer_id": 42,
    "date_of_birth": "1990-05-15",
    "location_address": "Accra, Ghana",
    "bound_device": null,
    "has_bound_device": false,
    "created_at": "2026-04-10T13:15:00Z",
    "updated_at": "2026-04-10T13:15:00Z"
  },
  "message": "Writer registration successful"
}
```

### Response Field Descriptions

| Field                     | Type        | Description                                                          |
| ------------------------- | ----------- | -------------------------------------------------------------------- |
| `user`                    | object      | Created writer user summary                                          |
| `user.id`                 | UUID        | User's unique identifier                                             |
| `user.email`              | string      | Writer's email address                                               |
| `user.full_name`          | string      | Writer's full name                                                   |
| `user.role`               | string      | Always `"writer"`                                                    |
| `user.phone`              | string      | Writer's phone number                                                |
| `writer`                  | object      | Created writer details                                               |
| `writer.id`               | UUID        | Writer's unique identifier                                           |
| `writer.user`             | object      | User summary (full user object)                                      |
| `writer.lmc`              | UUID        | LMC UUID this writer belongs to                                      |
| `writer.photo`            | string/null | URL to profile photo or null                                         |
| `writer.status`           | string      | Writer status (`active`, `passive`, `inactive`, `recover`, `no_use`) |
| `writer.writer_id`        | integer     | Human-readable writer ID shown in UI                                 |
| `writer.date_of_birth`    | date        | Writer's date of birth                                               |
| `writer.location_address` | string      | Writer's operating location                                          |
| `writer.bound_device`     | UUID/null   | Bound POS device or null                                             |
| `writer.has_bound_device` | boolean     | Whether writer has a bound device                                    |
| `writer.created_at`       | datetime    | Writer creation timestamp                                            |
| `writer.updated_at`       | datetime    | Last update timestamp                                                |
| `message`                 | string      | Success confirmation message                                         |

### Error Responses

**Status Code:** `400 Bad Request`

```json
{
  "email": ["A user with this email address already exists."],
  "phone": ["A user with this phone number already exists."],
  "lmc_id": ["LMC not found."],
  "date_of_birth": ["Invalid date format or age validation failed."]
}
```

---

## Edit LMC Endpoint

### Overview

Partially updates an existing LMC's editable fields. Use `PATCH` to update only the fields you want to change. Only `address`, `owner` (reassign to a different user), and `is_active` (enable/disable the LMC) can be updated. The `code` is auto-generated and cannot be changed.

### Request

**Method:** `PATCH`

**Route:** `/api/v1/lmc/{id}/`

**Base URL:** `https://onassismystrocore-production.up.railway.app/api/v1/lmc/{id}/`

**Authentication:** Required (Bearer Token)

**Permissions:** Operator or above

### Request Body

All fields are optional for `PATCH` — send only the fields you want to change.

| Field       | Type    | Required | Description                                             |
| ----------- | ------- | -------- | ------------------------------------------------------- |
| `address`   | string  | No       | LMC physical address                                    |
| `owner`     | UUID    | No       | UUID of the new owner user (must have role `lmc_owner`) |
| `is_active` | boolean | No       | Enable (`true`) or disable (`false`) the LMC            |

### Sample Requests

**Update address only:**

```bash
PATCH /api/v1/lmc/1a0dadec-9498-4a66-a51f-8345ae433c32/
Authorization: Bearer <token>
Content-Type: application/json

{
  "address": "45 Liberation Road, Accra"
}
```

**Deactivate an LMC:**

```bash
PATCH /api/v1/lmc/1a0dadec-9498-4a66-a51f-8345ae433c32/
Authorization: Bearer <token>
Content-Type: application/json

{
  "is_active": false
}
```

**Update both address and reactivate:**

```bash
PATCH /api/v1/lmc/1a0dadec-9498-4a66-a51f-8345ae433c32/
Authorization: Bearer <token>
Content-Type: application/json

{
  "address": "12 Ring Road Central, Accra",
  "is_active": true
}
```

### Response

**Status Code:** `200 OK`

```json
{
  "id": "1a0dadec-9498-4a66-a51f-8345ae433c32",
  "code": "LMC-0004",
  "owner": "a3f12c90-1234-4abc-8def-000000000001",
  "address": "45 Liberation Road, Accra",
  "is_active": true,
  "created_at": "2026-03-01T10:00:00Z"
}
```

### Error Response

**Status Code:** `400 Bad Request` — if `owner` UUID does not exist or does not have `lmc_owner` role:

```json
{
  "owner": ["Invalid pk \"<uuid>\" - object does not exist."]
}
```

**Status Code:** `403 Forbidden` — if caller is not Operator or above:

```json
{
  "detail": "You do not have permission to perform this action."
}
```

---

## LMC Detail Cards Endpoint

### Overview

Returns all LMCs with an operational snapshot (live writer counts + POS data) and financial aggregates for the current month.

### Request

**Method:** `GET`

**Route:** `/api/v1/lmc/detail-cards/`

**Authentication:** Required (Bearer Token)

**Permissions:** Operator or above sees all LMCs; LMC owner sees only their own

### Response Format

**Status Code:** `200 OK`

```json
[
  {
    "id": "1a0dadec-9498-4a66-a51f-8345ae433c32",
    "code": "LMC-0004",
    "name": "Sallyrich Blessed Enterprise",
    "phone": "+233501234567",
    "address": "P.O. Box 123, Accra",
    "photo_url": null,
    "is_active": true,
    "operational": {
      "snapshot_date": "2026-03-01",
      "active": 10,
      "passive": 0,
      "inactive": 0,
      "recover": 0,
      "no_use": 0,
      "writers_total": 10,
      "pos_issued": 20,
      "pos_trading": 15,
      "pos_recovery": 5
    },
    "financial": {
      "wallet_balance": "1500.00",
      "monthly_topups": "5000.00",
      "monthly_sales": "12000.00",
      "monthly_commissions": "350.00"
    }
  }
]
```

### Response Field Descriptions

| Field                           | Type        | Description                                   |
| ------------------------------- | ----------- | --------------------------------------------- |
| `id`                            | UUID        | LMC unique identifier                         |
| `code`                          | string      | LMC code (e.g. `LMC-0004`)                    |
| `name`                          | string      | Owner's full name                             |
| `phone`                         | string      | Owner's phone number                          |
| `address`                       | string      | LMC physical address                          |
| `photo_url`                     | string/null | Owner's profile photo URL or null             |
| `is_active`                     | boolean     | Whether the LMC is active                     |
| `operational.snapshot_date`     | string/null | Date of latest snapshot (null if none exists) |
| `operational.active`            | integer     | Live count of writers with status `active`    |
| `operational.passive`           | integer     | Live count of writers with status `passive`   |
| `operational.inactive`          | integer     | Live count of writers with status `inactive`  |
| `operational.recover`           | integer     | Live count of writers with status `recover`   |
| `operational.no_use`            | integer     | Live count of writers with status `no_use`    |
| `operational.writers_total`     | integer     | Live total writer count                       |
| `operational.pos_issued`        | integer     | POS devices issued (from snapshot)            |
| `operational.pos_trading`       | integer     | POS devices trading (from snapshot)           |
| `operational.pos_recovery`      | integer     | POS devices in recovery (from snapshot)       |
| `financial.wallet_balance`      | decimal     | Current airtime wallet balance                |
| `financial.monthly_topups`      | decimal     | Total top-ups given to writers this month     |
| `financial.monthly_sales`       | decimal     | Total ticket sales this month                 |
| `financial.monthly_commissions` | decimal     | Total commissions earned this month           |

---

## LMC Summary Endpoint

### Overview

Returns the LMC info header and YTD summary cards (with contribution ratios) for a single LMC. Use this to populate the top section of the LMC detail page: the four stat cards and the wallet balance card.

### Request

**Method:** `GET`

**Route:** `/api/v1/lmc/{id}/summary/`

**Base URL:** `https://onassismystrocore-production.up.railway.app/api/v1/lmc/{id}/summary/`

**Authentication:** Required (Bearer Token)

**Permissions:** Operator or above; LMC owner for their own LMC

### Sample Request

```bash
GET /api/v1/lmc/1a0dadec-9498-4a66-a51f-8345ae433c32/summary/
Authorization: Bearer <token>
```

### Response

```json
{
  "lmc_info": {
    "name": "Sallyrich Blessed Enterprise",
    "address": "",
    "phone": "+233205595253",
    "pos_issued": 0,
    "pos_trading": 0,
    "wallet_balance": 634.02
  },
  "summary": {
    "ytd_sales": 2623.5,
    "ytd_topups": 8979.0,
    "ytd_winnings": 63000.0,
    "writers_count": 11,
    "ytd_sales_ratio": 73,
    "ytd_topups_ratio": 61,
    "ytd_winnings_ratio": 94,
    "writers_ratio": 32,
    "wallet_balance": 634.02,
    "today_deposits": 971.88
  }
}
```

### Response Field Descriptions

#### `lmc_info`

| Field            | Type    | Description                                          |
| ---------------- | ------- | ---------------------------------------------------- |
| `name`           | string  | LMC owner's full name                                |
| `address`        | string  | LMC physical address                                 |
| `phone`          | string  | Owner's phone number                                 |
| `pos_issued`     | integer | POS devices issued (from latest snapshot)            |
| `pos_trading`    | integer | POS devices currently trading (from latest snapshot) |
| `wallet_balance` | decimal | Current airtime wallet balance                       |

#### `summary`

| Field                | Type    | Description                                         |
| -------------------- | ------- | --------------------------------------------------- |
| `ytd_sales`          | decimal | Year-to-date total ticket sales for this LMC        |
| `ytd_topups`         | decimal | Year-to-date total top-ups paid out to writers      |
| `ytd_winnings`       | decimal | Year-to-date total winnings for this LMC's writers  |
| `writers_count`      | integer | Live count of writers in this LMC                   |
| `ytd_sales_ratio`    | integer | This LMC's YTD sales as % of all LMCs (0–100)       |
| `ytd_topups_ratio`   | integer | This LMC's YTD top-ups as % of all LMCs (0–100)     |
| `ytd_winnings_ratio` | integer | This LMC's YTD winnings as % of all LMCs (0–100)    |
| `writers_ratio`      | integer | This LMC's writer count as % of all writers (0–100) |
| `wallet_balance`     | decimal | Current airtime wallet balance (mirrors `lmc_info`) |
| `today_deposits`     | decimal | Total successful deposits into the wallet today     |

> **UI Mapping:** `wallet_balance` → the large GHS figure on the wallet card. `today_deposits` → the "Today GHS X.XX" label beneath it.

---

## LMC Writers Overview Endpoint

### Overview

Returns a paginated, filterable writers table for a single LMC. Use this to populate the writers tab below the summary cards. Each tab click sends a single `status` filter — do **not** combine multiple status values.

### Request

**Method:** `GET`

**Route:** `/api/v1/lmc/{id}/writers-overview/`

**Base URL:** `https://onassismystrocore-production.up.railway.app/api/v1/lmc/{id}/writers-overview/`

**Authentication:** Required (Bearer Token)

**Permissions:** Operator or above; LMC owner for their own LMC

### Query Parameters

| Parameter   | Type    | Description                                             |
| ----------- | ------- | ------------------------------------------------------- |
| `status`    | string  | Filter by **one** status tab. See UI Tab Mapping below. |
| `search`    | string  | Search writers by name                                  |
| `page`      | integer | Page number (default: 1)                                |
| `page_size` | integer | Results per page (default: 10)                          |

### UI Tab Mapping

| UI Tab       | Query                 |
| ------------ | --------------------- |
| **View All** | No `status` parameter |
| **Active**   | `?status=active`      |
| **Passive**  | `?status=passive`     |
| **Inactive** | `?status=inactive`    |
| **Recover**  | `?status=recover`     |
| **No Use**   | `?status=no_use`      |

### Sample Requests

```bash
# View All writers (no filter)
GET /api/v1/lmc/1a0dadec-9498-4a66-a51f-8345ae433c32/writers-overview/

# Active tab
GET /api/v1/lmc/1a0dadec-9498-4a66-a51f-8345ae433c32/writers-overview/?status=active

# Page 2
GET /api/v1/lmc/1a0dadec-9498-4a66-a51f-8345ae433c32/writers-overview/?status=active&page=2
```

### Response

```json
{
  "count": 11,
  "next": "https://onassismystrocore-production.up.railway.app/api/v1/lmc/1a0dadec-9498-4a66-a51f-8345ae433c32/writers-overview/?page=2",
  "previous": null,
  "results": [
    {
      "id": "9cc70f47-b97e-4af5-8c99-de3bfecd9017",
      "name": "Akwasi Ofori",
      "contact": "+233552950898",
      "sign_up_date": "2026-03-01T17:57:25.638000Z",
      "dop": 41,
      "dot": 17,
      "ytd_sales": "178398.00",
      "ytd_topups": "996669.00",
      "status": "recover"
    },
    {
      "id": "78f9e5c2-1f65-44a4-8843-6485d59f56e6",
      "name": "Bemah Rose",
      "contact": "+233598195262",
      "sign_up_date": "2026-03-01T17:57:25.640000Z",
      "dop": 41,
      "dot": 0,
      "ytd_sales": "0.00",
      "ytd_topups": "0.00",
      "status": "no_use"
    }
  ]
}
```

### Response Field Descriptions

| Field          | Type     | Description                                    |
| -------------- | -------- | ---------------------------------------------- |
| `id`           | UUID     | Writer's unique identifier                     |
| `name`         | string   | Writer's full name                             |
| `contact`      | string   | Writer's phone number                          |
| `sign_up_date` | datetime | When the writer was registered                 |
| `dop`          | integer  | Days on platform (days since sign-up)          |
| `dot`          | integer  | Days of trading (distinct days with sales YTD) |
| `ytd_sales`    | decimal  | Writer's year-to-date ticket sales             |
| `ytd_topups`   | decimal  | Writer's year-to-date top-ups received         |
| `status`       | string   | Writer's current status                        |

---

## LMC Transactions Endpoint

### Overview

Returns a unified, paginated transaction ledger for a single LMC. Merges commissions, top-ups (to writers), and deposits (into LMC wallet) into one chronological list with a running balance column. Each tab click sends a single `type` filter — do **not** combine multiple type values.

### Request

**Method:** `GET`

**Route:** `/api/v1/lmc/{id}/transactions/`

**Base URL:** `https://onassismystrocore-production.up.railway.app/api/v1/lmc/{id}/transactions/`

**Authentication:** Required (Bearer Token)

**Permissions:** Operator or above; LMC owner for their own LMC

### Query Parameters

| Parameter   | Type    | Description                                                       |
| ----------- | ------- | ----------------------------------------------------------------- |
| `type`      | string  | Filter by **one** transaction type tab. See UI Tab Mapping below. |
| `search`    | string  | Search by source name or phone number                             |
| `date_from` | string  | Start date filter `YYYY-MM-DD`                                    |
| `date_to`   | string  | End date filter `YYYY-MM-DD`                                      |
| `page`      | integer | Page number (default: 1)                                          |
| `page_size` | integer | Results per page (default: 30)                                    |

### UI Tab Mapping

| UI Tab          | Query               |
| --------------- | ------------------- |
| **View All**    | No `type` parameter |
| **Commissions** | `?type=commission`  |
| **Top-ups**     | `?type=topup`       |
| **Transfers**   | `?type=transfer`    |

### Sample Requests

```bash
# View All transactions (no filter)
GET /api/v1/lmc/1a0dadec-9498-4a66-a51f-8345ae433c32/transactions/

# Commissions tab
GET /api/v1/lmc/1a0dadec-9498-4a66-a51f-8345ae433c32/transactions/?type=commission

# View All, page 2
GET /api/v1/lmc/1a0dadec-9498-4a66-a51f-8345ae433c32/transactions/?page=2
```

### Response

```json
{
  "count": 45,
  "next": "https://onassismystrocore-production.up.railway.app/api/v1/lmc/1a0dadec-9498-4a66-a51f-8345ae433c32/transactions/?page=2",
  "previous": null,
  "results": [
    {
      "date": "Sun, 05 April 2026",
      "time": "03:56 PM",
      "type": "commission",
      "source_name": "Akwasi Ofori",
      "source_phone": "+233552950898",
      "reference": null,
      "amount": "125.50",
      "balance": "634.02"
    },
    {
      "date": "Sat, 04 April 2026",
      "time": "10:22 AM",
      "type": "topup",
      "source_name": "Bemah Rose",
      "source_phone": "+233598195262",
      "reference": "TRF-00123",
      "amount": "500.00",
      "balance": "508.52"
    },
    {
      "date": "Fri, 03 April 2026",
      "time": "08:15 AM",
      "type": "transfer",
      "source_name": null,
      "source_phone": "+233205595253",
      "reference": "DEP-98765",
      "amount": "1000.00",
      "balance": "1008.52"
    }
  ]
}
```

### Response Field Descriptions

| Field          | Type        | Description                                       |
| -------------- | ----------- | ------------------------------------------------- |
| `date`         | string      | Formatted date e.g. `"Sun, 05 April 2026"`        |
| `time`         | string      | Formatted time e.g. `"03:56 PM"`                  |
| `type`         | string      | `commission`, `topup`, or `transfer`              |
| `source_name`  | string/null | Writer's full name; `null` for deposit transfers  |
| `source_phone` | string/null | Writer's phone or mobile money number used        |
| `reference`    | string/null | Payment reference; `null` for commissions         |
| `amount`       | decimal     | Transaction amount in GHS                         |
| `balance`      | decimal     | Running LMC wallet balance after this transaction |

### Transaction Types

| Type         | Direction | Description                                                   |
| ------------ | --------- | ------------------------------------------------------------- |
| `commission` | IN (+)    | Commission earned from a writer's top-up (% of top-up amount) |
| `topup`      | OUT (−)   | Airtime transferred from LMC wallet to a writer               |
| `transfer`   | IN (+)    | Deposit into LMC wallet via mobile money                      |

---

## Draws & Winnings Endpoint

### Endpoint: Get YTD Draws & Winnings

**Route:** `GET /api/v1/financials/dashboard/draws-and-winnings/`

**Description:** Returns year-to-date Draws & Winnings dashboard data in three card groups: YTD Sales, YTD Winnings (with claimed/unclaimed breakdown), and YTD Gross Gaming Revenue.

**Authentication:** Required (Bearer Token)

**Permissions:** `IsOperatorOrAbove`

### Response Format

**Status Code:** `200 OK`

```json
{
  "ytd_sales": {
    "total_sales": "GHS 34,806,983.08",
    "total_sales_amount": 34806983.08,
    "unique_players": 56189,
    "total_coupons": 741002,
    "total_stakes": 20562983
  },
  "ytd_winnings": {
    "total_winnings": "GHS 20,687,915.60",
    "total_winnings_amount": 20687915.6,
    "claimed": "GHS 20,553,513.20",
    "claimed_amount": 20553513.2,
    "unclaimed": "GHS 134,402.40",
    "unclaimed_amount": 134402.4
  },
  "ytd_ggr": {
    "gross_gaming_revenue": "GHS 14,119,067.48",
    "gross_gaming_revenue_amount": 14119067.48,
    "retention_rate": "4.49%",
    "retention_rate_value": 4.49,
    "retention_value": "GHS 1,564,033.54",
    "retention_value_amount": 1564033.54
  }
}
```

### Response Field Descriptions

#### YTD Sales Card

| Field                | Type    | Description                                                        |
| -------------------- | ------- | ------------------------------------------------------------------ |
| `total_sales`        | string  | Formatted YTD total ticket sales                                   |
| `total_sales_amount` | float   | Raw numeric value of total sales                                   |
| `unique_players`     | integer | Count of distinct `player_phone` values on valid tickets this year |
| `total_coupons`      | integer | Total ticket count YTD                                             |
| `total_stakes`       | integer | Total individual stake/line count across all tickets YTD           |

#### YTD Winnings Card

| Field                   | Type   | Description                                                      |
| ----------------------- | ------ | ---------------------------------------------------------------- |
| `total_winnings`        | string | Formatted total win amount YTD                                   |
| `total_winnings_amount` | float  | Raw numeric value of total winnings                              |
| `claimed`               | string | Formatted amount of winnings already claimed by players          |
| `claimed_amount`        | float  | Raw numeric value of claimed winnings                            |
| `unclaimed`             | string | Formatted amount of winnings not yet claimed (pending + expired) |
| `unclaimed_amount`      | float  | Raw numeric value of unclaimed winnings                          |

#### YTD Gross Gaming Revenue Card

| Field                         | Type   | Description                                  |
| ----------------------------- | ------ | -------------------------------------------- |
| `gross_gaming_revenue`        | string | Formatted GGR = total_sales − total_winnings |
| `gross_gaming_revenue_amount` | float  | Raw numeric value of GGR                     |
| `retention_rate`              | string | YTD retention rate formatted as "X.XX%"      |
| `retention_rate_value`        | float  | Raw numeric retention rate percentage        |
| `retention_value`             | string | Formatted monetary value of retention        |
| `retention_value_amount`      | float  | Raw numeric retention monetary value         |

---

## Draws & Winnings Table Endpoint

**Route:** `GET /api/v1/games/events/draws-and-winnings/`

**Description:** Returns a paginated list of drawn events with result data. Only events with status `DRAWN` and an attached `DrawResult` are returned, ordered newest-first.

**Authentication:** Required (Bearer Token)

**Permissions:** `IsWriterOrAbove`

### Query Parameters

| Parameter        | Type   | Required | Description                            |
| ---------------- | ------ | -------- | -------------------------------------- |
| `game_type`      | UUID   | No       | Filter by game type ID                 |
| `status`         | string | No       | Filter by event status                 |
| `draw_date`      | date   | No       | Filter by exact draw date (YYYY-MM-DD) |
| `draw_date__gte` | date   | No       | Draw date greater than or equal        |
| `draw_date__lte` | date   | No       | Draw date less than or equal           |
| `page`           | int    | No       | Page number (default: 1)               |
| `page_size`      | int    | No       | Results per page (default: 20)         |

### Response Row Fields

| Field                   | Type    | Description                              |
| ----------------------- | ------- | ---------------------------------------- |
| `event_id`              | UUID    | DrawEvent primary key                    |
| `event_no`              | integer | Sequential event number                  |
| `draw_date`             | string  | Formatted date (e.g. "Sat, 05 Apr 2026") |
| `event_name`            | string  | Event/game name                          |
| `draw_time`             | string  | Draw time in HH:MM:SS format             |
| `pre_draw`              | string  | Pre-draw sales formatted as GHS          |
| `pre_draw_amount`       | float   | Raw pre-draw sales value                 |
| `draw_numbers`          | array   | Drawn numbers (e.g. [5, 14, 29, 56, 51]) |
| `machine_numbers`       | array   | Machine-generated numbers                |
| `post_draw_1`           | string  | Post-draw I sales formatted as GHS       |
| `post_draw_1_amount`    | float   | Raw post-draw I value                    |
| `post_draw_2`           | string  | Post-draw II sales formatted as GHS      |
| `post_draw_2_amount`    | float   | Raw post-draw II value                   |
| `payout_ratio`          | string  | Payout ratio formatted as percentage     |
| `payout_ratio_value`    | float   | Raw payout ratio value                   |
| `total_winnings`        | string  | Total winnings formatted as GHS          |
| `total_winnings_amount` | float   | Raw total winnings value                 |

---

## Draw Event Tickets Endpoint

**Route:** `GET /api/v1/games/events/{id}/tickets/`

**Description:** Returns the paginated ticket list for a specific draw event (the "Pre Draw Tickets" modal). Each ticket includes its nested stakes with full detail, plus the event's draw date and time.

**Authentication:** Required (Bearer Token)

**Permissions:** `IsWriterOrAbove`

### Path Parameters

| Parameter | Type | Required | Description    |
| --------- | ---- | -------- | -------------- |
| `id`      | UUID | Yes      | DrawEvent UUID |

### Query Parameters

| Parameter   | Type   | Required | Description                                           |
| ----------- | ------ | -------- | ----------------------------------------------------- |
| `search`    | string | No       | Filter by ticket number, writer name, or player phone |
| `page`      | int    | No       | Page number (default: 1)                              |
| `page_size` | int    | No       | Results per page (default: 20)                        |

### Event Info Fields (top-level response)

| Field        | Type   | Description                                          |
| ------------ | ------ | ---------------------------------------------------- |
| `event_date` | string | Event draw date (formatted, e.g. "Sat, 05 Apr 2026") |
| `event_time` | string | Event draw time (HH:MM:SS format)                    |

### Ticket Row Fields

| Field                | Type    | Description                             |
| -------------------- | ------- | --------------------------------------- |
| `ticket_id`          | UUID    | Ticket primary key                      |
| `ticket_no`          | string  | Unique ticket number                    |
| `stake_count`        | integer | Number of stakes on the ticket          |
| `stake_value`        | string  | Total stake value formatted as GHS      |
| `stake_value_amount` | float   | Raw total stake value                   |
| `datetime`           | string  | Formatted sold-at date                  |
| `staked_by`          | string  | Writer's full name                      |
| `phone_number`       | string  | Player phone number                     |
| `status`             | string  | Ticket status (active/won/lost/claimed) |
| `stakes`             | array   | Nested list of stakes                   |

### Nested Stake Fields

| Field              | Type        | Description                                                      |
| ------------------ | ----------- | ---------------------------------------------------------------- |
| `stake_id`         | UUID        | Stake primary key                                                |
| `created_at`       | string      | Stake creation timestamp (YYYY-MM-DD HH:MM:SS)                   |
| `game`             | object      | Game type `{id, name, code}`                                     |
| `event_id`         | UUID        | Draw event ID                                                    |
| `play_group`       | string      | Play group ("Direct", "Perm", "Banker to All", "Banker Against") |
| `play`             | string      | Play type name (e.g. "Direct 2 (2 Sure)")                        |
| `numbers`          | string      | Staked numbers as comma-separated string                         |
| `stake_amount`     | string      | Stake amount as decimal string                                   |
| `original_numbers` | string      | Original numbers in display format                               |
| `player_phone`     | string      | Player phone number                                              |
| `stake_status`     | string      | Status in uppercase (e.g. "ACTIVE", "LOST", "WON")               |
| `writer`           | object/null | Writer info `{id, name, phone}` or null                          |

---

## List Admin Users Endpoint

**Route:** `GET /api/v1/auth/users/admins/`

**Description:** Returns a paginated list of all admin users. Supports search by name or phone number.

**Authentication:** Required (Bearer Token)

**Permissions:** Admin only (`IsAdmin`)

### Query Parameters

| Parameter   | Type   | Required | Description                                      |
| ----------- | ------ | -------- | ------------------------------------------------ |
| `search`    | string | No       | Search by first name, last name, or phone number |
| `page`      | int    | No       | Page number (default: 1)                         |
| `page_size` | int    | No       | Results per page (default: 30)                   |

### Response Fields

| Field         | Type        | Description                |
| ------------- | ----------- | -------------------------- |
| `id`          | UUID        | User primary key           |
| `email`       | string      | User's email address       |
| `first_name`  | string      | First name                 |
| `last_name`   | string      | Last name                  |
| `full_name`   | string      | Computed full name         |
| `phone`       | string      | Phone number               |
| `role`        | string      | Always `admin`             |
| `is_active`   | boolean     | Account active status      |
| `photo`       | string/null | Profile photo URL or null  |
| `date_joined` | datetime    | Account creation timestamp |

---

## Create Admin User Endpoint

**Route:** `POST /api/v1/auth/users/admins/`

**Description:** Creates a new user with the `admin` role. The role is automatically set and cannot be overridden.

**Authentication:** Required (Bearer Token)

**Permissions:** Admin only (`IsAdmin`)

### Request Fields

| Field        | Type   | Required | Description            |
| ------------ | ------ | -------- | ---------------------- |
| `email`      | string | Yes      | Unique email address   |
| `first_name` | string | Yes      | First name             |
| `last_name`  | string | Yes      | Last name              |
| `phone`      | string | Yes      | Unique phone number    |
| `password`   | string | Yes      | Password (min 8 chars) |
| `photo`      | file   | No       | Profile photo          |

**Response:** `201 Created` — same shape as List Admin Users row fields.

---

## Edit Admin User Endpoint

**Route:** `PATCH /api/v1/auth/users/{id}/admin-edit/`

**Description:** Partially updates an existing admin user. Only admin-role users can be edited via this endpoint.

**Authentication:** Required (Bearer Token)

**Permissions:** Admin only (`IsAdmin`)

### Editable Fields

| Field        | Type    | Description              |
| ------------ | ------- | ------------------------ |
| `email`      | string  | Email address            |
| `first_name` | string  | First name               |
| `last_name`  | string  | Last name                |
| `phone`      | string  | Phone number             |
| `is_active`  | boolean | Activate/deactivate user |
| `photo`      | file    | Profile photo            |

### Error Responses

| Status             | Condition                       |
| ------------------ | ------------------------------- |
| `400 Bad Request`  | Target user is not an admin     |
| `401 Unauthorized` | Missing or invalid token        |
| `403 Forbidden`    | Requesting user is not an admin |
| `404 Not Found`    | User UUID does not exist        |

---

## Activity Logs Endpoint

**Route:** `GET /api/v1/auth/users/activity-logs/`

**Description:** Returns a paginated list of recent admin dashboard activity (logins, admin user creation, admin user edits).

**Authentication:** Required (Bearer Token)

**Permissions:** Admin only (`IsAdmin`)

### Query Parameters

| Parameter   | Type | Required | Description                    |
| ----------- | ---- | -------- | ------------------------------ |
| `page`      | int  | No       | Page number (default: 1)       |
| `page_size` | int  | No       | Results per page (default: 30) |

### Response Fields

| Field         | Type     | Description                                           |
| ------------- | -------- | ----------------------------------------------------- |
| `id`          | integer  | Auto-incremented primary key                          |
| `actor_name`  | string   | Full name of the user who performed the action        |
| `action`      | string   | Action type: `login`, `create_admin`, or `edit_admin` |
| `description` | string   | Human-readable description of the action              |
| `created_at`  | datetime | When the action occurred                              |

### Actions Logged

| Action         | Trigger                                       |
| -------------- | --------------------------------------------- |
| `login`        | Successful login by an admin or operator user |
| `create_admin` | New admin user created via POST /admins/      |
| `edit_admin`   | Admin user edited via PATCH /admin-edit/      |

---

## All Writers List Endpoint

**Route:** `GET /api/v1/writers/all/`

**Description:** Returns a paginated list of all writers for the admin dashboard.

**Authentication:** Required (Bearer Token)

**Permissions:** LMC Owner or above (`lmc_owner`, `operator`, `admin`)

### Query Parameters

| Parameter | Type   | Required | Description                                      |
| --------- | ------ | -------- | ------------------------------------------------ |
| `search`  | string | No       | Filter by first name, last name, or phone number |
| `status`  | string | No       | Filter by writer status                          |
| `page`    | int    | No       | Page number (default: 1)                         |

### Query Examples

```
GET /api/v1/writers/all/?search=Kwesi
GET /api/v1/writers/all/?search=Mensah
GET /api/v1/writers/all/?search=0501234567
GET /api/v1/writers/all/?search=Kwesi&status=active
GET /api/v1/writers/all/?status=inactive&page=2
```

### Response Fields

| Field                   | Type     | Description                           |
| ----------------------- | -------- | ------------------------------------- |
| `id`                    | UUID     | Writer primary key                    |
| `writer_id_display`     | string   | Zero-padded writer ID (e.g. "000042") |
| `name`                  | string   | Writer full name                      |
| `contact`               | string   | Writer phone number                   |
| `sign_up_date`          | datetime | Writer creation date                  |
| `days_on_platform`      | integer  | Days since sign-up                    |
| `days_of_tickets`       | integer  | Distinct days with ticket sales       |
| `ytd_sales`             | decimal  | Year-to-date ticket sales total       |
| `ytd_topups`            | decimal  | Year-to-date top-up total             |
| `last_transaction_date` | datetime | Date of most recent ticket sale       |
| `status`                | string   | Writer status                         |

---

## Writer Profile Endpoint

**Route:** `GET /api/v1/writers/{id}/profile/`

**Description:** Returns the full profile for a single writer, including summary cards, wallet balances, device info, and tier ranking.

**Authentication:** Required (Bearer Token)

**Permissions:** LMC Owner or above

### Tier Thresholds

| Tier     | YTD Top-Ups Threshold |
| -------- | --------------------- |
| Tier I   | ≥ GHS 50,000          |
| Tier II  | ≥ GHS 20,000          |
| Tier III | ≥ GHS 5,000           |
| Tier IV  | < GHS 5,000           |

### Response Fields

| Field                   | Type     | Description                                   |
| ----------------------- | -------- | --------------------------------------------- |
| `id`                    | UUID     | Writer primary key                            |
| `writer_id_display`     | string   | Zero-padded writer ID                         |
| `name`                  | string   | Writer full name                              |
| `gender`                | string   | Gender (N/A if not set)                       |
| `date_of_birth`         | date     | Date of birth                                 |
| `mobile`                | string   | Phone number                                  |
| `email`                 | string   | Email address                                 |
| `status`                | string   | Writer status                                 |
| `serial_number`         | string   | Bound POS device serial number                |
| `terminal_number`       | string   | Terminal ID (truncated device UUID)           |
| `device_state`          | string   | Bound device status (trading/issued/recovery) |
| `days_on_platform`      | integer  | Days since sign-up                            |
| `days_of_tickets`       | integer  | Distinct days with ticket sales               |
| `lt_avg_sale`           | decimal  | Lifetime average ticket sale amount           |
| `sign_up_date`          | datetime | Writer creation date                          |
| `sales_wallet_balance`  | string   | Airtime wallet balance                        |
| `sales_wallet_id`       | string   | Airtime wallet ID (truncated)                 |
| `claims_wallet_balance` | string   | Claims wallet balance                         |
| `claims_wallet_id`      | string   | Claims wallet ID (truncated)                  |
| `ytd_sales`             | decimal  | Year-to-date ticket sales                     |
| `this_month_sales`      | decimal  | Current month ticket sales                    |
| `ytd_topups`            | decimal  | Year-to-date top-ups                          |
| `this_month_topups`     | decimal  | Current month top-ups                         |
| `ytd_winnings`          | decimal  | Year-to-date winnings                         |
| `this_month_winnings`   | decimal  | Current month winnings                        |
| `ranking_tier`          | string   | Tier based on YTD top-ups (Tier I–IV)         |
| `avg_topup`             | decimal  | Average top-up amount                         |

---

## Writer Sales Endpoint

**Route:** `GET /api/v1/writers/{id}/writer-sales/`

**Description:** Returns a paginated list of ticket sales for a specific writer. Powers the "Sales" tab on the writer detail page.

**Authentication:** Required (Bearer Token)

**Permissions:** LMC Owner or above

### Response Fields

| Field          | Type    | Description                           |
| -------------- | ------- | ------------------------------------- |
| `ticket_no`    | string  | Ticket number                         |
| `date`         | string  | Sale date (e.g. "Mon, 06 April 2026") |
| `time`         | string  | Sale time (e.g. "02:31:52 PM")        |
| `event_number` | integer | Draw event number                     |
| `game`         | string  | Game type name                        |
| `play`         | string  | Primary play type name (first stake)  |
| `amount_paid`  | decimal | Total ticket amount                   |
| `stakes`       | integer | Number of stakes on the ticket        |

---

## Writer Winnings Endpoint

**Route:** `GET /api/v1/writers/{id}/writer-winnings/`

**Description:** Returns a paginated list of winnings for a specific writer. Powers the "Winnings" tab on the writer detail page.

**Authentication:** Required (Bearer Token)

**Permissions:** LMC Owner or above

### Response Fields

| Field           | Type    | Description                              |
| --------------- | ------- | ---------------------------------------- |
| `ticket_id`     | string  | Truncated ticket UUID                    |
| `ticket_number` | string  | Ticket number                            |
| `event_number`  | integer | Draw event number                        |
| `game`          | string  | Game type name                           |
| `play`          | string  | Primary play type name (first stake)     |
| `datetime`      | string  | Win computed datetime (dd/mm/yyyy HH:MM) |
| `stake_amount`  | decimal | Total ticket amount (stake)              |
| `amount_won`    | decimal | Win amount                               |

---

## Writer Top-Ups Endpoint

**Route:** `GET /api/v1/writers/{id}/writer-topups/`

**Description:** Returns a paginated list of top-up transactions for a specific writer. Powers the "Top-Ups" tab on the writer detail page.

**Authentication:** Required (Bearer Token)

**Permissions:** LMC Owner or above

### Response Fields

| Field             | Type    | Description                               |
| ----------------- | ------- | ----------------------------------------- |
| `date`            | string  | Top-up date (e.g. "Mon, 06 Apr 2026")     |
| `time`            | string  | Top-up time (e.g. "02:31:52 PM")          |
| `source`          | string  | Source phone/identifier from payment data |
| `network`         | string  | Payment channel/network or top-up method  |
| `bank_batch_ref`  | string  | Payment reference                         |
| `transaction_ref` | string  | Provider transaction ID                   |
| `amount`          | decimal | Top-up amount (GHS)                       |
| `balance`         | string  | Balance after top-up (N/A if unavailable) |

---

## Writer Cashouts Endpoint

**Route:** `GET /api/v1/writers/{id}/writer-cashouts/`

**Description:** Returns a paginated list of successful withdrawal (cashout) transactions for a specific writer. Only withdrawals with status "success" are included. Powers the "Cashout" tab on the writer detail page.

**Authentication:** Required (Bearer Token)

**Permissions:** LMC Owner or above

### Response Fields

| Field             | Type    | Description                                |
| ----------------- | ------- | ------------------------------------------ |
| `date`            | string  | Cashout date (e.g. "Mon, 06 Apr 2026")     |
| `time`            | string  | Cashout time (e.g. "02:31:52 PM")          |
| `source`          | string  | Recipient mobile number                    |
| `network`         | string  | Mobile money provider (MTN, VOD, ATL)      |
| `bank_batch_ref`  | string  | Withdrawal reference                       |
| `transaction_ref` | string  | Provider transaction ID                    |
| `amount`          | decimal | Withdrawal amount (GHS)                    |
| `balance`         | string  | Balance after cashout (N/A if unavailable) |

---

## Dashboard Card Endpoints

These endpoints power the summary cards shown in the admin/operator UI. Each returns a compact object with a formatted currency string (for display) and a raw numeric value (for charting/aggregation).

**Authentication:** Required (Bearer Token)

**Permissions:** Authenticated users with access to financial/analytics data

---

## Sales Card Endpoint

**Route:** `GET /api/v1/financials/dashboard/sales/`

**Description:** Returns year-to-date total sales.

### Response Format

**Status Code:** `200 OK`

```json
{
  "total_sales": "GHS 1,234,567.89",
  "total_sales_amount": 1234567.89,
  "currency": "GHS"
}
```

### Response Fields

| Field                | Type   | Description                               |
| -------------------- | ------ | ----------------------------------------- |
| `total_sales`        | string | Year-to-date total sales formatted as GHS |
| `total_sales_amount` | float  | Raw numeric total sales value             |
| `currency`           | string | Currency code (always "GHS")              |

> Reads from the `YTDSummary` cache for the current year when available; otherwise returns zeros.

---

## Net Top-Ups Card Endpoint

**Route:** `GET /api/v1/financials/dashboard/net-topups/`

**Description:** Returns gross top-ups and net top-ups after refunds/chargebacks.

### Response Format

**Status Code:** `200 OK`

```json
{
  "gross_topups": "GHS 2,000,000.00",
  "gross_topups_amount": 2000000.0,
  "net_topups": "GHS 1,950,000.00",
  "net_topups_amount": 1950000.0,
  "currency": "GHS"
}
```

### Response Fields

| Field                 | Type   | Description                                                   |
| --------------------- | ------ | ------------------------------------------------------------- |
| `gross_topups`        | string | Gross top-ups YTD formatted as GHS                            |
| `gross_topups_amount` | float  | Raw numeric gross top-ups value                               |
| `net_topups`          | string | Net top-ups (gross less refunds/chargebacks) formatted as GHS |
| `net_topups_amount`   | float  | Raw numeric net top-ups value                                 |
| `currency`            | string | Currency code (always "GHS")                                  |

---

## Writers@Work Card Endpoint

**Route:** `GET /api/v1/financials/dashboard/writers-at-work/`

**Description:** Returns the active writer count and total writer count.

### Response Format

**Status Code:** `200 OK`

```json
{
  "active_writers": 128,
  "total_writers": 1547
}
```

### Response Fields

| Field            | Type    | Description                                                              |
| ---------------- | ------- | ------------------------------------------------------------------------ |
| `active_writers` | integer | Count of writers currently active (based on recent heartbeats/last-seen) |
| `total_writers`  | integer | Total count of all writers in the system                                 |

---

## Wins Card Endpoint

**Route:** `GET /api/v1/financials/dashboard/wins/`

**Description:** Returns total wins and number of winning stakes.

### Response Format

**Status Code:** `200 OK`

```json
{
  "total_wins": "GHS 350,000.00",
  "total_wins_amount": 350000.0,
  "winning_stakes": 4321,
  "currency": "GHS"
}
```

### Response Fields

| Field               | Type    | Description                     |
| ------------------- | ------- | ------------------------------- |
| `total_wins`        | string  | Total wins YTD formatted as GHS |
| `total_wins_amount` | float   | Raw numeric total wins value    |
| `winning_stakes`    | integer | Total number of winning stakes  |
| `currency`          | string  | Currency code (always "GHS")    |

---

## Liquidation Card Endpoint

**Route:** `GET /api/v1/financials/dashboard/liquidation/`

**Description:** Returns total liquidation and unclaimed coupons amount.

### Response Format

**Status Code:** `200 OK`

```json
{
  "total_liquidation": "GHS 50,000.00",
  "total_liquidation_amount": 50000.0,
  "unclaimed_coupons": "GHS 12,345.67",
  "unclaimed_coupons_amount": 12345.67,
  "currency": "GHS"
}
```

### Response Fields

| Field                      | Type   | Description                               |
| -------------------------- | ------ | ----------------------------------------- |
| `total_liquidation`        | string | Total liquidation amount formatted as GHS |
| `total_liquidation_amount` | float  | Raw numeric total liquidation value       |
| `unclaimed_coupons`        | string | Unclaimed coupon amount formatted as GHS  |
| `unclaimed_coupons_amount` | float  | Raw numeric unclaimed coupons value       |
| `currency`                 | string | Currency code (always "GHS")              |

---

## Settlements Card Endpoint

**Route:** `GET /api/v1/financials/dashboard/settlements/`

**Description:** Returns total settlements and the claims wallet balance (live aggregate).

### Response Format

**Status Code:** `200 OK`

```json
{
  "total_settlements": "GHS 420,000.00",
  "total_settlements_amount": 420000.0,
  "claim_wallet_balance": "GHS 3,210.50",
  "claim_wallet_balance_amount": 3210.5,
  "currency": "GHS"
}
```

### Response Fields

| Field                         | Type   | Description                                                  |
| ----------------------------- | ------ | ------------------------------------------------------------ |
| `total_settlements`           | string | Total settlements YTD formatted as GHS                       |
| `total_settlements_amount`    | float  | Raw numeric total settlements (read from `YTDSummary` cache) |
| `claim_wallet_balance`        | string | Claims wallet balance formatted as GHS                       |
| `claim_wallet_balance_amount` | float  | Raw numeric balance (live aggregate of `ClaimsWallet`)       |
| `currency`                    | string | Currency code (always "GHS")                                 |

---

## Today's Claims Endpoint

**Route:** `GET /api/v1/sales/wins/today_claims/`

**Description:** Returns today's total claims and claims withdrawn.

**Authentication:** Required (Bearer Token)

### Response Format

**Status Code:** `200 OK`

```json
{
  "date": "2026-04-07",
  "total_claims": 242846.4,
  "claims_withdrawn": 156942.6,
  "currency": "GHS"
}
```

### Response Fields

| Field              | Type              | Description                             |
| ------------------ | ----------------- | --------------------------------------- |
| `date`             | string (ISO 8601) | Today's date                            |
| `total_claims`     | float             | Total claims amount for today in GHS    |
| `claims_withdrawn` | float             | Total claims withdrawn for today in GHS |
| `currency`         | string            | Currency code (always "GHS")            |

---

## Today's Wins Endpoint

**Route:** `GET /api/v1/sales/wins/today_wins/`

**Description:** Returns today's total win amount and number of unique winning players.

**Authentication:** Required (Bearer Token)

### Response Format

**Status Code:** `200 OK`

```json
{
  "date": "2026-04-07",
  "total_win_amount": 287738.4,
  "unique_players": 749,
  "currency": "GHS"
}
```

### Response Fields

| Field              | Type              | Description                            |
| ------------------ | ----------------- | -------------------------------------- |
| `date`             | string (ISO 8601) | Today's date                           |
| `total_win_amount` | float             | Total win amount for today in GHS      |
| `unique_players`   | integer           | Number of unique winning players today |
| `currency`         | string            | Currency code (always "GHS")           |

---

## Winning Events Endpoint

**Route:** `GET /api/v1/sales/wins/winning_events/`

**Description:** Returns a list of winning events/draws for a given date. Defaults to today if no date is specified.

**Authentication:** Required (Bearer Token)

### Query Parameters

| Parameter | Type              | Required | Description                            |
| --------- | ----------------- | -------- | -------------------------------------- |
| `date`    | string (ISO 8601) | No       | Date to filter events (default: today) |

### Response Format

**Status Code:** `200 OK`

```json
{
  "date": "2026-04-07",
  "events": [
    {
      "event_id": 828,
      "event_name": "Morning VAG",
      "event_no": 828,
      "winning_numbers": [43, 5, 90, 56, 70]
    },
    {
      "event_id": 135,
      "event_name": "5/90 Noonrush",
      "event_no": 135,
      "winning_numbers": [78, 55, 41, 4, 8]
    }
  ]
}
```

### Response Fields

| Field                      | Type              | Description                                   |
| -------------------------- | ----------------- | --------------------------------------------- |
| `date`                     | string (ISO 8601) | The date for which events are returned        |
| `events[].event_id`        | integer           | Sequential event identifier                   |
| `events[].event_name`      | string            | Name of the game event (e.g. "Morning VAG")   |
| `events[].event_no`        | integer           | Event number                                  |
| `events[].winning_numbers` | array             | Array of winning numbers drawn for this event |

---

## Winners List Endpoint

**Route:** `GET /api/v1/sales/wins/winners_list/`

**Description:** Returns a list of winners for a given date, with numbers staked, win amount, player contact, and writer name. Defaults to today if no date is provided.

**Authentication:** Required (Bearer Token)

### Query Parameters

| Parameter | Type              | Required | Description                             |
| --------- | ----------------- | -------- | --------------------------------------- |
| `date`    | string (ISO 8601) | No       | Date to filter winners (default: today) |

### Response Format

**Status Code:** `200 OK`

```json
{
  "date": "2026-04-07",
  "winners": [
    {
      "numbers_staked": [[5, 90]],
      "win_amount": 480.0,
      "player_phone": "+2330244259482",
      "writer_name": "Okyei Agyemang",
      "event_name": "Morning VAG",
      "event_no": 828
    },
    {
      "numbers_staked": [[56, 90]],
      "win_amount": 1200.0,
      "player_phone": "+2330244259482",
      "writer_name": "Okyei Agyemang",
      "event_name": "Morning VAG",
      "event_no": 828
    },
    {
      "numbers_staked": [[43, 70]],
      "win_amount": 120.0,
      "player_phone": "+2330548102769",
      "writer_name": "Odifour",
      "event_name": "Morning VAG",
      "event_no": 828
    }
  ]
}
```

### Response Fields

| Field                      | Type              | Description                                    |
| -------------------------- | ----------------- | ---------------------------------------------- |
| `date`                     | string (ISO 8601) | The date for which winners are returned        |
| `winners[].numbers_staked` | array             | Nested arrays of numbers staked by this player |
| `winners[].win_amount`     | float             | Win amount in GHS                              |
| `winners[].player_phone`   | string            | Player's phone number (E.164 format)           |
| `winners[].writer_name`    | string            | Name of the writer who sold the ticket         |
| `winners[].event_name`     | string            | Name of the winning event (e.g. "Morning VAG") |
| `winners[].event_no`       | integer           | Event number                                   |

---

## Common Response Errors

### 401 Unauthorized

```json
{ "detail": "Authentication credentials were not provided." }
```

**Solution:** Ensure the Authorization header includes a valid Bearer token.

### 403 Forbidden

```json
{ "detail": "You do not have permission to perform this action." }
```

**Solution:** User role does not have permission for this endpoint.

### 404 Not Found

```json
{ "detail": "Not found." }
```

**Solution:** Resource does not exist or endpoint path is incorrect.

---

## List Reports Endpoint

### Overview

Returns the full catalogue of available reports, each with its schema — the list of columns (including which are required) and the available filter parameters. Use this to dynamically render the report selection UI.

### Request

**Method:** `GET`

**Route:** `/api/v1/financials/reports/`

**Permissions:** Operator or above

**No parameters required.**

### Response

```json
{
  "status": true,
  "message": "Reports retrieved successfully",
  "data": [
    {
      "reportId": 1,
      "name": "30 Days Sales Tracker",
      "schema": {
        "category": "Operations",
        "columns": [
          { "key": "Writer ID", "label": "Writer ID", "required": true },
          { "key": "Writer Name", "label": "Writer Name", "required": true },
          {
            "key": "30 Days Total",
            "label": "30 Days Total",
            "required": true
          },
          { "key": "Day-1", "label": "Day-1", "required": true },
          "..."
        ],
        "filters": [
          {
            "key": "entity_name",
            "label": "Writer Name",
            "type": "text",
            "required": false
          }
        ]
      }
    },
    {
      "reportId": 7,
      "name": "Daily Sales",
      "schema": {
        "category": "Finance",
        "columns": [
          {
            "key": "Ticket Number",
            "label": "Ticket Number",
            "required": true
          },
          { "key": "Writer Name", "label": "Writer Name", "required": true },
          { "key": "Ticket Amount", "label": "Ticket Amount", "required": true }
        ],
        "filters": [
          { "key": "date", "label": "Date", "type": "date", "required": false }
        ]
      }
    }
  ]
}
```

### Available Reports

| reportId | Name                          | Category   | Required Filters         |
| -------- | ----------------------------- | ---------- | ------------------------ |
| 1        | 30 Days Sales Tracker         | Operations | —                        |
| 2        | Bank Transfer - Batch Details | Finance    | —                        |
| 3        | Bank Transfers                | Finance    | —                        |
| 5        | Commission Payments           | Finance    | `reference_date`         |
| 6        | Ticket Query                  | Finance    | `ticket`                 |
| 7        | Daily Sales                   | Finance    | —                        |
| 8        | Daily Sales & Winnings        | Finance    | `start_date`, `end_date` |
| 9        | Finance - Payout              | Finance    | —                        |
| 14       | Revenue Per Play              | Finance    | `start_date`, `end_date` |
| 17       | Ticket Status                 | General    | `ticket`                 |
| 18       | Active Writers                | General    | —                        |
| 19       | Terminal History              | General    | —                        |
| 20       | Winning Stakes Report         | General    | —                        |
| 21       | All Stakes Report             | Operations | `start_date`, `end_date` |
| 23       | Topup - Claims as Credit      | Finance    | —                        |
| 24       | Topup - LMC Transfers         | Finance    | —                        |
| 25       | Topup - Mobile Money          | Finance    | —                        |
| 26       | Writers - Active Writers      | General    | `interval`, `year`       |

---

## Execute Report Endpoint

### Overview

Executes a report by ID and returns the data rows. Filters are passed as a JSON body (POST) or query parameters (GET). Both methods are supported; body values take precedence over query params on conflict.

### Request

**Method:** `POST` (preferred) or `GET`

**Route:** `/api/v1/financials/reports/{reportId}/execute/`

**Permissions:** Operator or above

**Body (POST):** JSON object of filter key→value pairs (optional unless the report has required filters).

### Response

```json
{
  "status": true,
  "message": "Report executed successfully",
  "report_name": "30 Days Sales Tracker",
  "data": [
    {
      "Writer ID": "10000009",
      "Writer Name": "Test Writer",
      "Writer Phone": "010000000",
      "LMC": "Onassis LMC",
      "Device": "PHONE",
      "Serial": null,
      "State": "active",
      "Days on Platform": 205,
      "Days-to-Start": 0,
      "Operation Days": 0,
      "Lifetime Sales": "0.00",
      "Avg Lifetime Sales": "0.00",
      "30 Days Total": "0.00",
      "30 Day Average": "0.00",
      "Date Onboarded": "2025-09-19 13:21:11",
      "First Transaction Datetime": null,
      "Last Transaction Datetime": null,
      "Day-1": "0.00",
      "Day-2": "0.00",
      "Day-30": "0.00"
    }
  ]
}
```

### Error Response (missing required filter)

```json
{
  "status": false,
  "message": "ticket is required."
}
```

### Error Response (unknown report)

```json
{
  "status": false,
  "message": "Report 99 not found."
}
```

---

### Report-by-Report Reference

#### Report 1 — 30 Days Sales Tracker

**Endpoint:** `POST /api/v1/financials/reports/1/execute/`

**Filters:**

| Key           | Type | Required | Description                           |
| ------------- | ---- | -------- | ------------------------------------- |
| `entity_name` | text | No       | Filter by writer name (partial match) |

**Sample:**

```bash
POST /api/v1/financials/reports/1/execute/
{}
```

**Columns returned:** `Writer ID`, `Writer Name`, `Writer Phone`, `LMC`, `Device`, `Serial`, `State`, `Days on Platform`, `Days-to-Start`, `Operation Days`, `Lifetime Sales`, `Avg Lifetime Sales`, `30 Days Total`, `30 Day Average`, `Date Onboarded`, `First Transaction Datetime`, `Last Transaction Datetime`, `Day-1` … `Day-30`

---

#### Report 2 — Bank Transfer - Batch Details

**Endpoint:** `POST /api/v1/financials/reports/2/execute/`

**Filters:**

| Key            | Type | Required | Description                   |
| -------------- | ---- | -------- | ----------------------------- |
| `batch_number` | text | No       | Filter by batch/transfer code |
| `reference`    | text | No       | Filter by payment reference   |

**Columns returned:** `Writer Name`, `Writer Phone`, `LMC Name`, `LMC Phone`, `Phone Number`, `Network`, `Client Reference`, `Amount`, `Description`, `Datetime`, `Updated At`, `Batch Number`, `UUID`

---

#### Report 3 — Bank Transfers

**Endpoint:** `POST /api/v1/financials/reports/3/execute/`

**Filters:**

| Key       | Type | Required | Description                     |
| --------- | ---- | -------- | ------------------------------- |
| `from`    | date | No       | From date (YYYY-MM-DD)          |
| `to`      | date | No       | To date (YYYY-MM-DD)            |
| `account` | text | No       | Filter by account/mobile number |

**Sample:**

```json
{ "from": "2026-04-01", "to": "2026-04-12" }
```

**Columns returned:** `Datetime`, `Account Number`, `Reference`, `Amount`, `Success`, `Reason`, `Batch Number`, `Batch Date`

---

#### Report 5 — Commission Payments

**Endpoint:** `POST /api/v1/financials/reports/5/execute/`

**Filters:**

| Key              | Type | Required | Description                             |
| ---------------- | ---- | -------- | --------------------------------------- |
| `reference_date` | date | **Yes**  | Settlement period end date (YYYY-MM-DD) |

**Sample:**

```json
{ "reference_date": "2026-03-31" }
```

**Columns returned:** `Writer`, `Phone Number`, `LMC`, `LMC Phone Number`, `Sales`, `Commission`

---

#### Report 6 — Ticket Query

**Endpoint:** `POST /api/v1/financials/reports/6/execute/`

**Filters:**

| Key      | Type | Required | Description         |
| -------- | ---- | -------- | ------------------- |
| `ticket` | text | **Yes**  | Exact ticket number |

**Sample:**

```json
{ "ticket": "108004462026022217052416797" }
```

**Columns returned:** `Datetime`, `Ticket No.`, `Play`, `Original Stake`, `Stake`, `Amount`

---

#### Report 7 — Daily Sales

**Endpoint:** `POST /api/v1/financials/reports/7/execute/`

**Filters:**

| Key    | Type | Required | Description                                |
| ------ | ---- | -------- | ------------------------------------------ |
| `date` | date | No       | Sales date (YYYY-MM-DD). Defaults to today |

**Sample:**

```json
{ "date": "2026-04-12" }
```

**Columns returned:** `Ticket Number`, `Game`, `Writer Name`, `Writer Number`, `LMC Name`, `Datetime of Ticket`, `Ticket Amount`

---

#### Report 8 — Daily Sales & Winnings

**Endpoint:** `POST /api/v1/financials/reports/8/execute/`

**Filters:**

| Key          | Type | Required | Description             |
| ------------ | ---- | -------- | ----------------------- |
| `start_date` | date | **Yes**  | Start date (YYYY-MM-DD) |
| `end_date`   | date | **Yes**  | End date (YYYY-MM-DD)   |

**Sample:**

```json
{ "start_date": "2026-04-01", "end_date": "2026-04-12" }
```

**Columns returned:** `Date`, `Total Writers`, `Sales`, `Gross Income`, `Winning`, `Net Income`, `Retention Rate`

---

#### Report 9 — Finance - Payout

**Endpoint:** `POST /api/v1/financials/reports/9/execute/`

**Filters:**

| Key          | Type | Required | Description            |
| ------------ | ---- | -------- | ---------------------- |
| `start_date` | date | No       | From date (YYYY-MM-DD) |
| `end_date`   | date | No       | To date (YYYY-MM-DD)   |

**Columns returned:** `Writer ID`, `Writer Name`, `Writer Phone #`, `Transaction Date`, `Withdrawal`, `Bank Reference`

---

#### Report 14 — Revenue Per Play

**Endpoint:** `POST /api/v1/financials/reports/14/execute/`

**Filters:**

| Key          | Type | Required | Description             |
| ------------ | ---- | -------- | ----------------------- |
| `start_date` | date | **Yes**  | Start date (YYYY-MM-DD) |
| `end_date`   | date | **Yes**  | End date (YYYY-MM-DD)   |

**Sample:**

```json
{ "start_date": "2026-04-01", "end_date": "2026-04-12" }
```

**Columns returned:** `Date`, `Game`, `Play Variety`, `Total Tickets`, `Total Amount`

---

#### Report 17 — Ticket Status

**Endpoint:** `POST /api/v1/financials/reports/17/execute/`

**Filters:**

| Key      | Type | Required | Description         |
| -------- | ---- | -------- | ------------------- |
| `ticket` | text | **Yes**  | Exact ticket number |

**Sample:**

```json
{ "ticket": "108004462026022217052416797" }
```

**Columns returned:** `Ticket`, `Event ID`, `Event Name`, `Event Display`, `Occurrence Date`, `Writer Phone`, `Player Phone`, `Stake No.`, `Stake Amount`, `Payout`, `Status`, `Reason`, `Created At`, `Payout Time`

---

#### Report 18 — Active Writers

**Endpoint:** `POST /api/v1/financials/reports/18/execute/`

**Filters:** None

**Columns returned:** `id`, `name`, `phone_number`, `terminal_number`, `location`, `created_at`

---

#### Report 19 — Terminal History

**Endpoint:** `POST /api/v1/financials/reports/19/execute/`

**Filters:**

| Key               | Type | Required | Description                                 |
| ----------------- | ---- | -------- | ------------------------------------------- |
| `terminal_number` | text | No       | Filter by serial number (partial match)     |
| `mac_address`     | text | No       | Filter by device identifier (partial match) |

> **Note:** `Terminal` and `MAC Address` both map to the device's `serial_number` field — this is the single unique identifier stored per POS/App/Web device.

**Columns returned:** `Terminal`, `MAC Address`, `Writer Name`, `Phone Number`, `First Use`

---

#### Report 20 — Winning Stakes Report

**Endpoint:** `POST /api/v1/financials/reports/20/execute/`

**Filters:**

| Key          | Type | Required | Description                             |
| ------------ | ---- | -------- | --------------------------------------- |
| `start_date` | date | No       | From stake date (YYYY-MM-DD)            |
| `end_date`   | date | No       | To stake date (YYYY-MM-DD)              |
| `ticket`     | text | No       | Filter by ticket number (partial match) |

**Sample:**

```json
{ "start_date": "2026-04-01", "end_date": "2026-04-12" }
```

**Columns returned:** `Writer`, `LMC`, `Ticket`, `Purchase Amount`, `Stake`, `Draw`, `Event`, `Play`, `Variety`, `Payout`, `Date of Stake`, `Date of Winning`

---

#### Report 21 — All Stakes Report

**Endpoint:** `POST /api/v1/financials/reports/21/execute/`

**Filters:**

| Key          | Type | Required | Description             |
| ------------ | ---- | -------- | ----------------------- |
| `start_date` | date | **Yes**  | Start date (YYYY-MM-DD) |
| `end_date`   | date | **Yes**  | End date (YYYY-MM-DD)   |

**Sample:**

```json
{ "start_date": "2026-04-12", "end_date": "2026-04-12" }
```

**Sample Response:**

```json
{
  "status": true,
  "message": "Report executed successfully",
  "report_name": "All Stakes Report",
  "data": [
    {
      "ticket": "108004462026041200001",
      "ticket_number": "108004462026041200001",
      "writer_name": "Kwame Asante",
      "writer_phone_number": "0241234567",
      "lmc_name": "Onassis LMC",
      "lmc_phone_number": "0201234567",
      "game_name": "5/90 Original",
      "event_name": "Sunday Aseda",
      "event_round": 412,
      "play_variety_name": "Direct 2 (2 Sure)",
      "stake_status_name": "active",
      "stake_number": [14, 29],
      "stake_amount": "0.50",
      "payout": null,
      "date": "2026-04-12"
    }
  ]
}
```

**Columns returned:** `ticket`, `ticket_number`, `writer_name`, `writer_phone_number`, `lmc_name`, `lmc_phone_number`, `game_name`, `event_name`, `event_round`, `play_variety_name`, `stake_status_name`, `stake_number`, `stake_amount`, `payout`, `date`

---

#### Report 23 — Topup - Claims as Credit

**Endpoint:** `POST /api/v1/financials/reports/23/execute/`

**Filters:**

| Key    | Type | Required | Description            |
| ------ | ---- | -------- | ---------------------- |
| `from` | date | No       | From date (YYYY-MM-DD) |
| `to`   | date | No       | To date (YYYY-MM-DD)   |

**Columns returned:** `Writer Name`, `Writer Phone`, `LMC Name`, `LMC Phone`, `Phone Number`, `Network`, `Client Reference`, `Amount`, `Description`, `Datetime`, `Updated At`, `Batch Number`, `UUID`

---

#### Report 24 — Topup - LMC Transfers

**Endpoint:** `POST /api/v1/financials/reports/24/execute/`

**Filters:**

| Key    | Type | Required | Description            |
| ------ | ---- | -------- | ---------------------- |
| `from` | date | No       | From date (YYYY-MM-DD) |
| `to`   | date | No       | To date (YYYY-MM-DD)   |

**Columns returned:** `Writer Name`, `Writer Phone`, `LMC Name`, `LMC Phone`, `Phone Number`, `Network`, `Client Reference`, `Amount`, `Description`, `Datetime`, `Updated At`, `Batch Number`, `UUID`

---

#### Report 25 — Topup - Mobile Money

**Endpoint:** `POST /api/v1/financials/reports/25/execute/`

**Filters:**

| Key    | Type | Required | Description            |
| ------ | ---- | -------- | ---------------------- |
| `from` | date | No       | From date (YYYY-MM-DD) |
| `to`   | date | No       | To date (YYYY-MM-DD)   |

**Columns returned:** `Writer Name`, `Writer Phone`, `LMC Name`, `LMC Phone`, `Phone Number`, `Network`, `Client Reference`, `Amount`, `Net Value`, `Description`, `Batch Number`, `UUID`, `Datetime`, `Updated At`

---

#### Report 26 — Writers - Active Writers

**Endpoint:** `POST /api/v1/financials/reports/26/execute/`

**Filters:**

| Key        | Type | Required | Description              |
| ---------- | ---- | -------- | ------------------------ |
| `interval` | text | **Yes**  | `daily` or `monthly`     |
| `year`     | text | **Yes**  | 4-digit year e.g. `2026` |

**Sample (monthly):**

```json
{ "interval": "monthly", "year": "2026" }
```

**Sample Response:**

```json
{
  "status": true,
  "message": "Report executed successfully",
  "report_name": "Writers - Active Writers",
  "data": [
    { "period": "Jan 2026", "active_writers": 1240 },
    { "period": "Feb 2026", "active_writers": 1318 },
    { "period": "Mar 2026", "active_writers": 1402 }
  ]
}
```

**Sample (daily):**

```json
{ "interval": "daily", "year": "2026" }
```

**Columns returned:** `period`, `active_writers`

---

## Authentication

All endpoints require JWT token authentication.

**1. Get Token:**

```
POST /api/v1/auth/login/
Body: {"email": "user@example.com", "password": "password"}
Response: {"access": "token...", "refresh": "token..."}
```

**2. Use Token:**

```
Header: Authorization: Bearer <access_token>
```

**3. Refresh Token (when expired):**

```
POST /api/v1/auth/token/refresh/
Body: {"refresh": "<refresh_token>"}
Response: {"access": "new_token..."}
```

---

## Change Log

| Date       | Change                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| 2026-04-12 | Added Reports endpoints documentation (List Reports, Execute Report — 19 reports)                      |
| 2026-04-07 | Added Dashboard Card Endpoints documentation                                                           |
| 2026-04-07 | Added Sales & Wins Dashboard Endpoints: `today_claims`, `today_wins`, `winning_events`, `winners_list` |
| 2026-04-02 | Initial API documentation published                                                                    |

---

## API Version

v1

## Base URL

`https://onassismystrocore-production.up.railway.app/api/v1/`
