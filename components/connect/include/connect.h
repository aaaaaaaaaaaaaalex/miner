#pragma once

#include "lwip/sys.h"
#include <lwip/netdb.h>
#include <arpa/inet.h>

#include "freertos/event_groups.h"

#define WIFI_SSID      CONFIG_ESP_WIFI_SSID
#define WIFI_PASS      CONFIG_ESP_WIFI_PASSWORD

#define WIFI_MAXIMUM_RETRY  CONFIG_ESP_MAXIMUM_RETRY

/* The event group allows multiple bits for each event, but we only care about two events:
 * - we are connected to the AP with an IP
 * - we failed to connect after the maximum amount of retries */
#define WIFI_CONNECTED_BIT BIT0
#define WIFI_FAIL_BIT      BIT1

//enum of wifi statuses
typedef enum {
    WIFI_CONNECTED,
    WIFI_DISCONNECTED,
    WIFI_CONNECTING,
    WIFI_DISCONNECTING,
    WIFI_CONNECT_FAILED,
    WIFI_RETRYING,
} wifi_status_t;

EventBits_t wifi_init_sta(const char * ssid, const char * pass);