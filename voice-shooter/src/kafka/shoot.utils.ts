import callr from "../utils/callr";

export async function handleShoot(param: {
  audioFile: string;
  cli: string;
  phone: string;
  triggerId: string;
  userId: string;
}) {
  const { audioFile, cli, phone, triggerId, userId } = param;
  const shootId = await callr.dtv({
    message: audioFile ?? "",
    cli: (cli as string) ?? "",
    targetNumber: phone,
  });

  if (!shootId) {
    return `ERROR :: Unable To Shoot ${phone} With CLI ${cli} For Trigger ${triggerId}`;
  }

  return `Shoot Successfully ${phone} With CLI ${cli} For Trigger ${triggerId} and user ${userId}`;
}
