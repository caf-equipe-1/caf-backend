export const appResponseDto = {
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
};

export const appResponseDtoArray = {
  type: 'array',
  items: appResponseDto,
};
