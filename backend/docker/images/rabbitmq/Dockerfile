FROM rabbitmq:management
LABEL authors="zack"
COPY ./rabbitmq.sh /usr/local/bin/rabbitmq.sh

RUN chmod +x /usr/local/bin/rabbitmq.sh

ENTRYPOINT ["/usr/local/bin/rabbitmq.sh"]

CMD ["rabbitmq-server"]