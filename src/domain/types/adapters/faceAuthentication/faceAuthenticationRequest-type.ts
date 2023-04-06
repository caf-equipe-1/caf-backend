export type FaceAuthenticationRequestType = {
  peopleId: 'string';
  imageUrl: 'string';
  imageBase64: 'string';
  device: {
    operatingSystem: 'string';
    fingerprint: 'string';
    manufacturer: 'string';
    model: 'string';
  };
};
