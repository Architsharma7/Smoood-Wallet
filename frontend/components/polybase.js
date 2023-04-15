import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace: "your-namespace",
});

export const createCollection = async (scwAddress) => {
  await db.applySchema(
    `
    @public
collection scw${scwAddress} {

  id: string;

  message: string; 

  amount: number; 

  tags: string;

  timestamp: number;

  constructor (id: string ,message: string,amount: number,tags: string, timestamp: number ) {
    this.id = id;
    this.message = message;
    this.amount = amount;
    this.tags = tags;
    this.timestmap = timestamp;

  }

  function setTag (tags: string) {
    this.tags = tags;
  }

  function setMessage (message: string) {
    this.message = message;
  }
}
    `,
    "smoood"
  );
};

export const addCollectionRecord = async (
  scwAddress,
  txId,
  Amount,
  Message,
  Tag,
  Timestamp
) => {
  const collectionReference = db.collection(`${scwAddress}`);

  const recordData = await collectionReference.create([
    `${txId}`,
    `${Message}`,
    Amount,
    `${Tag}`,
    Timestamp,
  ]);
};

export const getAllRecords = async (scwAddress) => {
  const collectionReference = db.collection(`${scwAddress}`);

  const records = await collectionReference.get();
  console.log(records);
};
