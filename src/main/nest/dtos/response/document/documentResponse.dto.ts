export const documentResponseDto = {
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    document: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
};

export const documentResponseDtoArray = {
  type: 'array',
  items: documentResponseDto,
};
