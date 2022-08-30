export const channelExist = (nameChannel, ids, entities) => {
  const namesChannels = ids.map((id) => entities[id].name);
  const isExistName = namesChannels.includes(nameChannel);
  return isExistName;
};
