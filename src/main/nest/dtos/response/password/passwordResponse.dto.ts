export const passwordResponseDto = {
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    password: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
};

export const passwordResponseDtoArray = {
  type: 'array',
  items: passwordResponseDto,
};
