import { Kafka } from "kafkajs";
import config from ".";

const kafka = new Kafka({
  clientId: config.kafka.clientid,
  brokers: [config.kafka.broker],
});

export const producer = kafka.producer({
  maxInFlightRequests: 1,
  idempotent: true,
  transactionalId: "ekoot-shoot-producer",
});

export const consumer = kafka.consumer({ groupId: "ekoot-shoot-group" });
