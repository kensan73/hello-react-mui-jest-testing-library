import { Tab, Tabs, Typography } from "@material-ui/core";
import * as React from "react";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import { TabContext, TabPanel, ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

type ExperienceInfo = {
    id: string;
    name: string;
}

type TableInfo = {
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
    tablesForSelection: TableInfo[]
}

export const MyForm: React.FC<OwnProps> = ({ initialTableSelection, effectiveHoursToTableInfo }) => {
    const tablesForSelection: TableInfo[] = [];
    [...effectiveHoursToTableInfo.entries()].forEach(([effectiveHoursKey, tableInfos]) => {
        tableInfos.forEach((tableInfo) => tablesForSelection.push(tableInfo))
    })
    return (
        <Formik<FormikProps> initialValues={{ optimizationType: 'experiences', selectedTab: 'by experience', selectedTables: initialTableSelection, tablesForSelection }} onSubmit={() => Promise.resolve()}>
            {({ values, setFieldValue }) => {
                const handleOptimizationChange = (event: any, optimizationType: string) => {
                    // manually update formik
                    setFieldValue('optimizationType', optimizationType);
                };

                const handleTabChange = (event: any, tabType: string) => {
                    // manually update formik
                    setFieldValue('selectedTab', tabType);
                };

                return <Form>
                    <Typography>hi world</Typography>
                    <ToggleButtonGroup
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
                        <TabPanel value="by experience">By experience</TabPanel>
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