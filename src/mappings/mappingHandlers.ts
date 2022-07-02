import {
  SubstrateExtrinsic,
  SubstrateEvent,
  SubstrateBlock,
} from "@subql/types";
import { Stem, StemRecord, SectionRecord, FullTrackRecord } from "../types";

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

export async function handleStemCall(callData: SubstrateExtrinsic): Promise<void> {
  const [musicId, cid, name, type] = callData.extrinsic.args;
  //Retrieve the record by its ID
  const stemRecord = new StemRecord(musicId.toHuman().toString());
  stemRecord.musicId = musicId.toHuman().toString();
  stemRecord.cid = cid.toHuman().toString();
  stemRecord.name = name.toHuman().toString();
  stemRecord.type = type.toHuman().toString();
  await stemRecord.save();
}

export async function handleSectionCall(callData: SubstrateExtrinsic): Promise<void> {
  const [musicId, sectionName, startTimeMs, endTimeMs, beats, bars] = callData.extrinsic.args;
  //Retrieve the record by its ID
  const sectionRecord = new SectionRecord(musicId.toHuman().toString());
  sectionRecord.musicId = musicId.toHuman().toString();
  sectionRecord.name = sectionName.toHuman().toString();
  sectionRecord.startTimeMs = startTimeMs.toHuman().toString();
  sectionRecord.endTimeMs = endTimeMs.toHuman().toString();
  sectionRecord.beats = beats.toHuman().toString();
  sectionRecord.bars = bars.toHuman().toString();
  await sectionRecord.save();
}
export async function handleFullTrackCall(callData: SubstrateExtrinsic): Promise<void> {
  const [musicId, cid, artistName, trackTitle, albumName, genre, bpm, key, timeSignature, bars, beats, duration, startBeatOffsetMs, sectionsCount, stemsCount] = callData.extrinsic.args;
  //Retrieve the record by its ID
  const fullTrackRecord = new FullTrackRecord(musicId.toHuman().toString());
  fullTrackRecord.musicId = musicId.toHuman().toString();
  fullTrackRecord.cid = cid.toHuman().toString();
  fullTrackRecord.artistName = artistName.toHuman().toString();
  fullTrackRecord.trackTitle = trackTitle.toHuman().toString();
  fullTrackRecord.albumName = albumName.toHuman().toString();
  fullTrackRecord.genre = genre.toHuman().toString();
  fullTrackRecord.bpm = bpm.toHuman().toString();
  fullTrackRecord.key = key.toHuman().toString();
  fullTrackRecord.timeSignature = timeSignature.toHuman().toString();
  fullTrackRecord.bars = bars.toHuman().toString();
  fullTrackRecord.beats = beats.toHuman().toString();
  fullTrackRecord.duration = duration.toHuman().toString();
  fullTrackRecord.startBeatOffsetMs = startBeatOffsetMs.toHuman().toString();
  fullTrackRecord.sectionsCount = sectionsCount.toHuman().toString();
  fullTrackRecord.stemsCount = stemsCount.toHuman().toString();
  await fullTrackRecord.save();
}