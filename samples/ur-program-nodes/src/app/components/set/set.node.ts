import { ProgramNode, SignalValue } from "@universal-robots/contribution-api";

export interface SampleSetNode extends ProgramNode {
  type: "ur-sample-node-set";
  parameters: {
    signalOutput?: {
      sourceID?: string;
      signalID?: string;
      value?: SignalValue;
    };
  };
}
