import { consumer } from "../config/kafka";
import { handleShoot } from "./shoot.utils";

const shootConsumer = async () => {
  await consumer.subscribe({ topic: "voice-shooter-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("Received: ", {
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });
      const param = JSON.parse(message.value?.toString() ?? "");
      handleShoot(param);
    },
  });
};

export default shootConsumer;
