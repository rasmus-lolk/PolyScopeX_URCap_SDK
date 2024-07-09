import { registerSmartSkillBehavior, ScriptBuilder, SmartSkillBehaviors } from '@universal-robots/contribution-api';

const behaviors: SmartSkillBehaviors = {
    // factory is required
    factory: () => {
        return {
            type: 'universal-robots-contribution-samples-sample-smart-skill',
            name: 'Sample Smart Skill',
            parameters: {
            },
        };
    },

    // startExecution is required
    startExecution: (instance) => {
        return new ScriptBuilder('popup("Hello World from Sample Smart Skill")');
    },

    // stopExecution is optional
    stopExecution: (instance) => {
        return new ScriptBuilder();
    },
};

registerSmartSkillBehavior(behaviors);