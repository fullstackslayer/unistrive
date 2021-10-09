import { UserEntity } from "../../entities/UserEntity";
import { usersCollection } from "../collections";

export const createUser = async (data: UserEntity) => {
  const doc = usersCollection.doc(data.id).set(data);
  console.log(doc);

  return doc;
};
