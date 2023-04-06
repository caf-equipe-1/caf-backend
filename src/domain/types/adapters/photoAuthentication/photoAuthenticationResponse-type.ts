export type PhotoAuthenticationResponseType = {
  requestId: string;
  isAlive: boolean;
  attemptId: string;
  person: {
    cpf: string;
    name: string;
  };
  message: string | null;
};
