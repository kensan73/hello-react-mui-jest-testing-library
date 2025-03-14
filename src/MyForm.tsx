import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, Tab, Tabs, Typography } from "@material-ui/core";
import * as React from "react";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import { TabContext, TabPanel, ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
                    <TabContext value={values.selectedTab}>
                        <Tabs
                            value={values.selectedTab}
                            onChange={handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="by experience" value="by experience" />
                            <Tab label="by room" value="by room" />
                        </Tabs>
                        <TabPanel value="by experience">
                            {experienceAccordions.map((experienceAccordion, index) => (
                                <Accordion key={`experience-accordion-${index}`}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-label="Expand"
                                        aria-controls="additional-actions1-content"
                                        id="additional-actions1-header"
                                    >
                                        <FormControlLabel
                                            aria-label={experienceAccordion.name}
                                            onClick={(event) => event.stopPropagation()}
                                            onFocus={(event) => event.stopPropagation()}
                                            control={<Checkbox />}
                                            label={experienceAccordion.name}
                                        />
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography color="textSecondary">
                                            INSERT TABLES AND CHECKBOXES HERE
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </TabPanel>
                        <TabPanel value="by room">By room</TabPanel>
                    </TabContext>
                    {values.tablesForSelection.map((tableInfo) => (
                        <div key={`checkbox-${tableInfo.id}`}>
                            <Field type="checkbox" name="selectedTables" value={`${tableInfo.id}`} id={`${tableInfo.id}`} />
                            <label htmlFor={`${tableInfo.id}`}>{tableInfo.name}</label>
                        </div>))}
                </Form>
            }}
        </Formik>);
}