import { ApplicationNode } from '@universal-robots/contribution-api';

export interface RobotArNode extends ApplicationNode {
  type: string;
  version: string;
}
