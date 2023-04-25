export const cardResponseDto = {
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    nickname: { type: 'string' },
    number: { type: 'number' },
    securityCode: { type: 'number' },
    password: { type: 'number' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
};

export const cardResponseDtoArray = {
  type: 'array',
  items: cardResponseDto,
};
