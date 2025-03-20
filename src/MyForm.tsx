import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, Tab, Tabs, Typography } from "@material-ui/core";
import * as React from "react";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import { TabContext, TabPanel, ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Thingy } from "./Thingy";

export type ExperienceInfo = {
    id: string;
    name: string;
}

export type TableInfo = {
    id: string;
    name: string;
    experiences: ExperienceInfo[]
    room: string;
}

type EffectiveHours = number;
type TableId = string;

type OwnProps = {
    effectiveHoursToTableInfo: Map<EffectiveHours, TableInfo[]>;
    initialTableSelection: TableId[];
}

type OptimizationType = 'experiences' | 'table sizing' | 'online availability';
type TabType = 'by experience' | 'by room'
type FormikProps = {
    optimizationType: OptimizationType,
    selectedTab: TabType,
    selectedTables: TableId[],
    experienceAccordions: ExperienceInfo[]
    tablesForSelection: TableInfo[],
}

export const MyForm: React.FC<OwnProps> = ({ initialTableSelection, effectiveHoursToTableInfo }) => {
    const tablesForSelection: TableInfo[] = [];
    const experienceAccordions: ExperienceInfo[] = [];
    [...effectiveHoursToTableInfo.entries()].forEach(([effectiveHoursKey, tableInfos]) => {
        tableInfos.forEach((tableInfo) => {
            tablesForSelection.push(tableInfo);
            tableInfo.experiences.forEach((experience) => experienceAccordions.push(experience));
        })
    })

    return (
        <Formik<FormikProps> initialValues={{ optimizationType: 'experiences', selectedTab: 'by experience', experienceAccordions, selectedTables: initialTableSelection, tablesForSelection }} onSubmit={() => Promise.resolve()}>
            {({ values, setFieldValue }) => {
                const handleOptimizationChange = (event: any, optimizationType: string) => {
                    // manually update formik
                    setFieldValue('optimizationType', optimizationType);
                };

                const handleTabChange = (event: any, tabType: string) => {
                    // manually update formik
                    setFieldValue('selectedTab', tabType);
                };
                const optimizationToggleButtons = <ToggleButtonGroup
                    exclusive
                    id="optimizationType"
                    value={values.optimizationType}
                    onChange={handleOptimizationChange}
                >
                    <ToggleButton value='experiences'>
                        experiences
                    </ToggleButton>
                    <ToggleButton value='table sizing'>
                        table sizing
                    </ToggleButton>
                    <ToggleButton value='online availability'>
                        online availability
                    </ToggleButton>
                </ToggleButtonGroup>
                return <Form>
                    <Typography>hi world</Typography>
                    {optimizationToggleButtons}

                    <Thingy />
                </Form>
            }}
        </Formik>);
}