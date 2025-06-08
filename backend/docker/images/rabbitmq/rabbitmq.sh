#!/bin/bash

echo "[!] START RABBITMQ AND CONFIG..."
rabbitmq-server &


sleep 10
USER=$RABBITMQ_DEFAULT_USER
PASS=$RABBITMQ_DEFAULT_PASS
HOST=localhost
PORT=15672

rabbitmqadmin -u "$USER" -p "$PASS" -H "$HOST" -P "$PORT" declare exchange name=exchange type=topic durable=true

rabbitmqadmin -u "$USER" -p "$PASS" -H "$HOST" -P "$PORT" declare queue name=mail durable=true
rabbitmqadmin -u "$USER" -p "$PASS" -H "$HOST" -P "$PORT" declare queue name=files durable=true
rabbitmqadmin -u "$USER" -p "$PASS" -H "$HOST" -P "$PORT" declare queue name=logs durable=true

rabbitmqadmin -u "$USER" -p "$PASS" -H "$HOST" -P "$PORT" declare binding source=exchange destination=mail routing_key=action.mail
rabbitmqadmin -u "$USER" -p "$PASS" -H "$HOST" -P "$PORT" declare binding source=exchange destination=files routing_key=action.file
rabbitmqadmin -u "$USER" -p "$PASS" -H "$HOST" -P "$PORT" declare binding source=exchange destination=logs routing_key=action.*

echo "[!] END CONFIG"
tail -f /dev/null