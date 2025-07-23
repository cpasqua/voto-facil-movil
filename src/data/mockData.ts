export interface Fiscal {
  id: string;
  username: string;
  password: string;
  name: string;
  school: string;
  table: string;
}

export interface Vote {
  id: string;
  fiscalId: string;
  orderNumber: number;
  timestamp: Date;
  school: string;
  table: string;
}

export const mockFiscals: Fiscal[] = [
  {
    id: "1",
    username: "fiscal001",
    password: "pass123",
    name: "María García",
    school: "Escuela Primaria San Martín",
    table: "Mesa 001"
  },
  {
    id: "2", 
    username: "fiscal002",
    password: "pass123",
    name: "Carlos López",
    school: "Colegio Nacional Belgrano",
    table: "Mesa 002"
  },
  {
    id: "3",
    username: "fiscal003", 
    password: "pass123",
    name: "Ana Rodríguez",
    school: "Instituto Técnico Industrial",
    table: "Mesa 003"
  },
  {
    id: "4",
    username: "fiscal004",
    password: "pass123", 
    name: "Roberto Silva",
    school: "Escuela Secundaria Moreno",
    table: "Mesa 004"
  }
];

export const mockVotes: Vote[] = [];

export const loginUser = (username: string, password: string): Fiscal | null => {
  return mockFiscals.find(
    fiscal => fiscal.username === username && fiscal.password === password
  ) || null;
};

export const registerVote = (fiscalId: string, orderNumber: number, school: string, table: string): Vote => {
  const vote: Vote = {
    id: `vote_${Date.now()}_${Math.random()}`,
    fiscalId,
    orderNumber,
    timestamp: new Date(),
    school,
    table
  };
  
  mockVotes.push(vote);
  return vote;
};

export const getVotesByFiscal = (fiscalId: string): Vote[] => {
  return mockVotes.filter(vote => vote.fiscalId === fiscalId);
};