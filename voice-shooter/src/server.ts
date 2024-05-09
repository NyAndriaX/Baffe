import app from "./config/app";
import { consumer } from "./config/kafka";
import shootConsumer from "./kafka/shoot.consumer";

const port = process.env.PORT ?? 5002;

const server = app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
  consumer
    .connect()
    .then(() => {
      shootConsumer().then(() => {
          console.log('shooter received')
      });
      console.log("Kafka is running !");
    })
    .catch(() => console.log("Kafka is not running !"));
});

export default server;
