export interface IRouter {
  id: number;
  path: string;
  component: React.FC;
  layout?: React.FC<{ children: React.ReactNode }>;
  isPrivate?: boolean;
}
