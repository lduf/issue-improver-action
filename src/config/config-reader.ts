import fs from 'fs';
import * as core from '@actions/core';
import { IConfig } from '../interfaces/config.interface';

const defaultConfig: IConfig = {
    sections: {
        custom: [
            {
                title: '[JOKE]',
                prompt: 'make a joke about this: {{issueTitle}}',
            },
        ],
        relatedIssues: {
            title: '[Related Issues]',
            prompt: 'Find very similar related issue titles for " title: {{issueTitle}} "  from thies issues: {{openIssues}} . If none of them very similar just respond with a "none". Make a list of issue title what is related in this format [title](link) - [the similarity]',
        },
        summary: { title: '[Summary]', prompt: 'Summarize this github issue: {{issueTitle}} {{issueBody}}' },
        labelSuggestion: {
            title: '[Label Suggestion]',
            prompt: 'Please make a label suggestion form this labels {{allLabels}} for this github issue: {{issueTitle}} {{issueBody}}.',
        },
        commentSummary: {
            title: '[Comment summary]',
            prompt: 'Summarize thies comments {{issueComments}} for this issue {{issueTitle}} {{issueBody}}',
        },
    },
};
export function getConfig(path?: string): Partial<IConfig> {
    const fileName = path || 'issue-improver-config.json';
    if (!fs.existsSync(fileName)) {
        core.notice(`Config file '${fileName}' not found.`);
        core.notice(`Loading default config.`);
        core.notice(`Config loaded: ${JSON.stringify(defaultConfig)}`);
        return defaultConfig;
    }
    const fileContents = fs.readFileSync(fileName, 'utf8');
    const config = JSON.parse(fileContents);
    config.sections = { ...defaultConfig.sections, ...config.sections };
    core.notice(`Config loaded: ${JSON.stringify(config)}`);
    return config;
}
