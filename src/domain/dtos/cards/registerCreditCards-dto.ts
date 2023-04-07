export type RegisterCardsDto = {
  creditCardInfo: {
    name: string;
    nickname: string;
    number: number;
    securityCode: number;
  }[];
};
