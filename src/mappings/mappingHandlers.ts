import {
  SubstrateExtrinsic,
  SubstrateEvent,
  SubstrateBlock,
} from "@subql/types";
import { Stem, StemRecord } from "../types";

// export async function handleBlock(block: SubstrateBlock): Promise<void> {
//     //Create a new starterEntity with ID using block hash
//     let record = new StarterEntity(block.block.header.hash.toString());
//     //Record block number
//     record.field1 = block.block.header.number.toNumber();
//     await record.save();
// }

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account, id],
    },
  } = event;
  //Retrieve the record by its ID
  const stem = new Stem(
    `${event.block.block.header.number.toNumber()} - ${event.idx}`
  );
  stem.sender = account.toString();
  stem.musicId = id.toString();
  await stem.save();
}

export async function handleCall(callData: SubstrateExtrinsic): Promise<void> {
  const [musicId, cid, name, type] = callData.extrinsic.args;
  //Retrieve the record by its ID
  const stemRecord = new StemRecord(musicId.toHuman().toString());
  stemRecord.musicId = musicId.toHuman().toString();
  stemRecord.cid = cid.toHuman().toString();
  stemRecord.name = name.toHuman().toString();
  stemRecord.type = type.toHuman().toString();
  await stemRecord.save();
}
