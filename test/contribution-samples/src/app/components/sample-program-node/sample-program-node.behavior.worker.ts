/// <reference lib="webworker" />
import {
    InsertionContext,
    OptionalPromise,
    ProgramBehaviors,
    ProgramNode,
    registerProgramBehavior,
    ScriptBuilder,
    ValidationContext,
    ValidationResponse
} from '@universal-robots/contribution-api';
import { SampleProgramNodeNode } from './sample-program-node.node';

// programNodeLabel is required
const createProgramNodeLabel = (node: SampleProgramNodeNode): OptionalPromise<string> => 'Sample Program Node';

// factory is required
const createProgramNode = (): OptionalPromise<SampleProgramNodeNode> => ({
    type: 'universal-robots-contribution-samples-sample-program-node',
    version: '1.0.0',
    lockChildren: false,
    allowsChildren: false,
    parameters: {
    },
});

// generateCodeBeforeChildren is optional
const generateScriptCodeBefore = (node: SampleProgramNodeNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// generateCodeAfterChildren is optional
const generateScriptCodeAfter = (node: SampleProgramNodeNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// generateCodePreamble is optional
const generatePreambleScriptCode = (node: SampleProgramNodeNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// validator is optional
const validate = (node: SampleProgramNodeNode, validationContext: ValidationContext): OptionalPromise<ValidationResponse> => ({
    isValid: true
});

// allowsChild is optional
const allowChildInsert = (node: ProgramNode, childType: string): OptionalPromise<boolean> => true;

// allowedInContext is optional
const allowedInsert = (insertionContext: InsertionContext): OptionalPromise<boolean> => true;

// upgradeNode is optional
const nodeUpgrade = (loadedNode: ProgramNode): ProgramNode => loadedNode;

const behaviors: ProgramBehaviors = {
    programNodeLabel: createProgramNodeLabel,
    factory: createProgramNode,
    generateCodeBeforeChildren: generateScriptCodeBefore,
    generateCodeAfterChildren: generateScriptCodeAfter,
    generateCodePreamble: generatePreambleScriptCode,
    validator: validate,
    allowsChild: allowChildInsert,
    allowedInContext: allowedInsert,
    upgradeNode: nodeUpgrade
};

registerProgramBehavior(behaviors);
