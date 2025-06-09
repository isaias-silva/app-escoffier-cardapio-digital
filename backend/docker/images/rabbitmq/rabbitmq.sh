#!/bin/bash

echo "[!] START RABBITMQ"
rabbitmq-server &


sleep 10
echo "[!] CONFIG RABBITMQ"

USER=$RABBITMQ_DEFAULT_USER
PASS=$RABBITMQ_DEFAULT_PASS
HOST=localhost
PORT=15672

rabbitmqadmin -u "$USER" -p "$PASS" -H "$HOST" -P "$PORT" declare exchange name=services.exchange type=topic durable=true

rabbitmqadmin -u "$USER" -p "$PASS" -H "$HOST" -P "$PORT" declare queue name=mail durable=true
rabbitmqadmin -u "$USER" -p "$PASS" -H "$HOST" -P "$PORT" declare queue name=files durable=true
rabbitmqadmin -u "$USER" -p "$PASS" -H "$HOST" -P "$PORT" declare queue name=logs durable=true

rabbitmqadmin -u "$USER" -p "$PASS" -H "$HOST" -P "$PORT" declare binding source=services.exchange destination=mail routing_key=action.mail
rabbitmqadmin -u "$USER" -p "$PASS" -H "$HOST" -P "$PORT" declare binding source=services.exchange destination=files routing_key=action.file
rabbitmqadmin -u "$USER" -p "$PASS" -H "$HOST" -P "$PORT" declare binding source=services.exchange destination=logs routing_key=action.*

rabbitmqadmin -u "$USER" -p "$PASS" -H "$HOST" -P "$PORT" declare exchange name=updates.exchange type=fanout durable=true

rabbitmqadmin -u "$USER" -p "$PASS" -H "$HOST" -P "$PORT" declare queue name=updates-menus durable=true

rabbitmqadmin -u "$USER" -p "$PASS" -H "$HOST" -P "$PORT" declare binding source=updates.exchange destination=updates-menus




echo "[!] END CONFIG"
tail -f /dev/null