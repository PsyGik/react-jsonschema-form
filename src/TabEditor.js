import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useFormStore from "./store";
import { debounce } from "./utils";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ value, onChange }) => (
  <Editor
    height="calc(90vh - 64px)"
    defaultLanguage="json"
    value={JSON.stringify(value || {}, null, 2)}
    onChange={onChange}
    options={{
      fontSize: "16px",
    }}
  />
);

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const toObject = (fn) => (data) => debounce(fn(JSON.parse(data)));

const JSONEditor = () => {
  const [value, setValue] = useState(0);
  const schema = useFormStore((state) => state.schema);
  const uiSchema = useFormStore((state) => state.uiSchema);
  const data = useFormStore((state) => state.data);
  console.log("Editor Update", data);

  const saveSchema = useFormStore((state) => state.saveSchema);
  const saveUISchema = useFormStore((state) => state.saveUISchema);
  const saveData = useFormStore((state) => state.saveData);

  const handleChange = (_, newValue) => setValue(newValue);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Form Schema" {...a11yProps(0)} />
          <Tab label="UI Schema" {...a11yProps(1)} />
          <Tab label="Default Data" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CodeEditor value={schema} onChange={toObject(saveSchema)} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CodeEditor value={uiSchema} onChange={toObject(saveUISchema)} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CodeEditor value={data} onChange={toObject(saveData)} />
      </TabPanel>
    </Box>
  );
};

export default JSONEditor;
